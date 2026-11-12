import { createContext, useContext, type ReactNode } from 'react';
import type { Person } from '@/types';
import type { IconName } from '@/icons';
import { Text, TextSkeleton } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const SOCIAL: { icon: IconName; label: string }[] = [
  { icon: 'chat', label: '채팅' },
  { icon: 'github', label: 'GitHub' },
  { icon: 'link', label: '링크' },
];

type ProfileHeaderContextValue = { p: Person };
const ProfileHeaderContext = createContext<ProfileHeaderContextValue | null>(
  null,
);

function useProfileHeader(part: string) {
  const ctx = useContext(ProfileHeaderContext);
  if (!ctx)
    throw new Error(`ProfileHeader.${part}는 <ProfileHeader> 안에서 쓴다`);
  return ctx;
}

/** 프로필 사진(없으면 첫 글자) */
function ProfileHeaderAvatar({ className }: { className?: string }) {
  const { p } = useProfileHeader('Avatar');
  return <Avatar size="lg" fallback={p.initial} className={className} />;
}

/** 이름 · 핸들 · 직업 */
function Name({ className }: { className?: string }) {
  const { p } = useProfileHeader('Name');
  return (
    <div className={className}>
      <Text as="h2" variant="title">
        {p.name}
      </Text>
      <Text as="small" variant="caption" tone="muted">
        @{p.handle}
      </Text>
      <Text variant="body">{p.job}</Text>
    </div>
  );
}

/** 소개(있을 때만) */
function Bio({ className }: { className?: string }) {
  const { p } = useProfileHeader('Bio');
  return p.bio ? (
    <Text variant="body" className={cn('mt-3.5', className)}>
      {p.bio}
    </Text>
  ) : null;
}

/** 가입 시기 */
function Joined({ className }: { className?: string }) {
  const { p } = useProfileHeader('Joined');
  return (
    <Text
      as="p"
      variant="caption"
      tone="muted"
      className={cn(
        'mt-2 flex items-center gap-1.5 [&_svg]:size-[15px]',
        className,
      )}
    >
      <Icon name="joined" />
      {p.joined}에 가입
    </Text>
  );
}

/** 소셜 버튼(ButtonGroup + Tooltip) */
function Social({ className }: { className?: string }) {
  return (
    <ButtonGroup className={cn('mt-3', className)}>
      {SOCIAL.map((s) => (
        <Tooltip key={s.icon}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label={s.label}
              className="size-9 shadow-none [&_svg]:size-[18px]"
              icon={s.icon}
            />
          </TooltipTrigger>
          <TooltipContent>{s.label}</TooltipContent>
        </Tooltip>
      ))}
    </ButtonGroup>
  );
}

function ProfileHeaderRoot({
  p,
  children,
}: {
  p: Person;
  children?: ReactNode;
}) {
  return (
    <ProfileHeaderContext.Provider value={{ p }}>
      <header>
        {children ?? (
          <>
            <div className="flex items-center gap-4">
              <ProfileHeaderAvatar />
              <Name />
            </div>
            <Bio />
            <Joined />
            <Social />
          </>
        )}
      </header>
    </ProfileHeaderContext.Provider>
  );
}

/**
 * 프로필 머리(컴파운드): Avatar + Name(이름 · 핸들 · 직업), Bio(소개) · Joined(가입) · Social(ButtonGroup + Tooltip).
 * 기본 조립은 `<ProfileHeader p={person} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<ProfileHeader p={person}><div className="flex items-center gap-4"><ProfileHeader.Avatar /><ProfileHeader.Name /></div><ProfileHeader.Social /></ProfileHeader>`
 */
export const ProfileHeader = Object.assign(ProfileHeaderRoot, {
  Avatar: ProfileHeaderAvatar,
  Name,
  Bio,
  Joined,
  Social,
});

/** 불러오는 동안의 사진 자리(Avatar lg 80 원) */
function AvatarSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn('size-20 rounded-full', className)} />;
}

/** 불러오는 동안의 이름 · 핸들 · 직업 줄 */
function NameSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('w-40', className)}>
      <TextSkeleton variant="title" className="w-3/4" />
      <TextSkeleton variant="caption" className="w-1/2" />
      <TextSkeleton variant="body" />
    </div>
  );
}

/** 불러오는 동안의 가입 줄 */
function JoinedSkeleton({ className }: { className?: string }) {
  return (
    <TextSkeleton variant="caption" className={cn('mt-2 w-28', className)} />
  );
}

/** 불러오는 동안의 소셜 버튼(36 원 세 개) */
function SocialSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('mt-3 flex gap-2', className)}>
      {SOCIAL.map((s) => (
        <Skeleton key={s.icon} className="size-9 rounded-full" />
      ))}
    </div>
  );
}

function ProfileHeaderSkeletonRoot({ children }: { children?: ReactNode }) {
  return (
    <div aria-hidden>
      {children ?? (
        <>
          <div className="flex items-center gap-4">
            <AvatarSkeleton />
            <NameSkeleton />
          </div>
          <JoinedSkeleton />
          <SocialSkeleton />
        </>
      )}
    </div>
  );
}

/**
 * 불러오는 동안의 프로필 머리(컴파운드, ProfileHeader와 같은 크기 · 간격): Avatar · Name · Joined · Social. 소개(Bio)는 있을 때만이라 뺀다.
 * 기본 조립은 `<ProfileHeaderSkeleton />`. 원래 부품을 바꿔 조립했다면 같은 모양으로 놓는다:
 * `<ProfileHeaderSkeleton><div className="flex items-center gap-4"><ProfileHeaderSkeleton.Avatar /><ProfileHeaderSkeleton.Name /></div><SocialLinksSkeleton className="mt-3" /></ProfileHeaderSkeleton>`
 */
export const ProfileHeaderSkeleton = Object.assign(ProfileHeaderSkeletonRoot, {
  Avatar: AvatarSkeleton,
  Name: NameSkeleton,
  Joined: JoinedSkeleton,
  Social: SocialSkeleton,
});
