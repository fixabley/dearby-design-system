import type { Person } from '@/types';
import type { IconName } from '@/icons';
import { Icon } from '@/components/foundations/Icon';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const SOCIAL: { icon: IconName; label: string }[] = [{ icon: 'chat', label: '채팅' }, { icon: 'githubMark', label: 'GitHub' }, { icon: 'link', label: '링크' }];

/** 프로필 머리: shadcn Avatar + 이름·핸들·직업, 소개 · 가입 · 소셜(ButtonGroup + Tooltip) */
export function ProfileHeader({ p }: { p: Person }) {
  return (
    <header>
      <div className="flex items-center gap-4">
        <Avatar size="lg" fallback={p.initial} />
        <div><h2 className="text-title leading-tight">{p.name}</h2><small className="text-caption text-muted-foreground">@{p.handle}</small><p className="text-body">{p.job}</p></div>
      </div>
      {p.bio && <p className="mt-3.5 text-body leading-relaxed">{p.bio}</p>}
      <p className="mt-2 flex items-center gap-1.5 text-caption text-muted-foreground [&_svg]:size-[15px]"><Icon name="joined" />{p.joined}에 가입</p>
      <ButtonGroup className="mt-3">
        {SOCIAL.map((s) => (
          <Tooltip key={s.icon}>
            <TooltipTrigger asChild><Button variant="outline" size="icon" aria-label={s.label} className="size-9 bg-muted shadow-none [&_svg]:size-[18px]" icon={s.icon} /></TooltipTrigger>
            <TooltipContent>{s.label}</TooltipContent>
          </Tooltip>
        ))}
      </ButtonGroup>
    </header>
  );
}
