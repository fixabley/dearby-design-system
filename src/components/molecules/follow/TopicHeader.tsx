import { createContext, useContext, type ReactNode } from 'react';
import { Text, TextSkeleton } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import {
  FOLLOW_KINDS,
  FOLLOW_LEVELS,
  type FollowLevel,
  type IconName,
  type TopicKind,
} from '@/icons';

/** 배너 · 아바타 · 버튼 줄의 시안 수치(배너 높이 170, 타일 76, 겹침 36 + 버튼 줄 위 52) */
const BANNER = 'h-[170px] rounded-xl';
const TILE = 'size-19 rounded-xl';

type TopicHeaderContextValue = {
  kind: TopicKind;
  name: string;
  icon?: IconName;
  programs: number;
  open: number;
  level?: FollowLevel;
  onFollow?: () => void;
  onLevelChange?: (level: FollowLevel) => void;
  onUnfollow?: () => void;
  map?: ReactNode;
};
const TopicHeaderContext = createContext<TopicHeaderContextValue | null>(null);

function useTopicHeader(part: string) {
  const ctx = useContext(TopicHeaderContext);
  if (!ctx) throw new Error(`TopicHeader.${part}는 <TopicHeader> 안에서 쓴다`);
  return ctx;
}

/** 배너: 청록 그러데이션 위 왼쪽 아래 큰 이름(이름은 제목이 읽으니 화면 읽기에서는 숨김) */
function Banner({ className }: { className?: string }) {
  const { name } = useTopicHeader('Banner');
  return (
    <div
      aria-hidden
      className={cn(
        BANNER,
        'flex items-end bg-[linear-gradient(140deg,#007F80,#2FB3B4)] px-5 py-[18px] text-white/92',
        className,
      )}
    >
      <Text variant="display" tone="inherit" truncate>
        {name}
      </Text>
    </div>
  );
}

/** 종류 아이콘 타일 76(배너에 20쯤 걸친다) */
function Tile({ className }: { className?: string }) {
  const { kind, icon } = useTopicHeader('Tile');
  return (
    <span
      aria-hidden
      className={cn(
        TILE,
        'grid shrink-0 place-items-center border-[3px] border-background bg-card text-accent-foreground shadow-[0_4px_14px_rgba(0,0,0,.14)] dark:border-border dark:shadow-control [&_svg]:size-9',
        className,
      )}
    >
      <Icon name={icon ?? FOLLOW_KINDS[kind].icon} />
    </span>
  );
}

/** 팔로우 버튼 모양: 시안 높이 40 · 옆 18 */
const FOLLOW_BUTTON = 'h-10 px-4.5';

/** 팔로우 전은 `팔로우` 버튼, 팔로우 중은 `팔로우 중 ⌄` 메뉴(알림 수준 고르기 · 팔로우 해제). `level`이 있으면 팔로우 중이다 */
function Follow({ className }: { className?: string }) {
  const { name, level, onFollow, onLevelChange, onUnfollow } =
    useTopicHeader('Follow');
  if (!level)
    return (
      <Button
        type="button"
        variant="mint"
        size="sm"
        icon="add"
        className={cn(FOLLOW_BUTTON, className)}
        onClick={onFollow}
      >
        팔로우
      </Button>
    );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="mint"
          size="sm"
          className={cn(FOLLOW_BUTTON, className)}
        >
          팔로우 중
          <Icon name="chevronDown" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <Text
          aria-hidden
          as="div"
          variant="caption"
          weight="semibold"
          tone="muted"
          className="px-4 pb-1 pt-2"
        >
          알림
        </Text>
        <DropdownMenuRadioGroup
          aria-label={`${name} 알림 수준`}
          value={level}
          onValueChange={(v) => onLevelChange?.(v as FollowLevel)}
        >
          {(Object.keys(FOLLOW_LEVELS) as FollowLevel[]).map((k) => (
            <DropdownMenuRadioItem key={k} value={k}>
              {FOLLOW_LEVELS[k].label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" onSelect={onUnfollow}>
          <Icon name="close" />
          팔로우 해제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** 버튼 줄(타일 오른쪽, 타일 아래선에 맞춤): 팔로우 + 쓰는 쪽이 넣는 지도 버튼 자리 */
function Actions({ className }: { className?: string }) {
  const { map } = useTopicHeader('Actions');
  return (
    <div className={cn('mt-13 flex items-center gap-2', className)}>
      <Follow />
      {map}
    </div>
  );
}

/** 이름(h2) */
function Title({ className }: { className?: string }) {
  const { name } = useTopicHeader('Title');
  return (
    <Text as="h2" variant="title" className={cn('mt-3.5', className)}>
      {name}
    </Text>
  );
}

/** 개수 줄: `4 프로그램 · 3 모집 중`(숫자만 굵게) */
function Counts({ className }: { className?: string }) {
  const { programs, open } = useTopicHeader('Counts');
  return (
    <Text
      as="p"
      variant="caption"
      tone="muted"
      className={cn('mt-3 flex gap-3.5', className)}
    >
      {(
        [
          [programs, '프로그램'],
          [open, '모집 중'],
        ] as const
      ).map(([n, label]) => (
        <span key={label}>
          <Text as="b" variant="caption" weight="bold" tone="default" tabular>
            {n}
          </Text>{' '}
          {label}
        </span>
      ))}
    </Text>
  );
}

function TopicHeaderRoot({
  kind,
  name,
  icon,
  programs,
  open,
  level,
  onFollow,
  onLevelChange,
  onUnfollow,
  map,
  className,
  children,
}: {
  kind: TopicKind;
  name: string;
  /** 타일 아이콘(기본은 종류 아이콘) */
  icon?: IconName;
  /** 프로그램 수 */
  programs: number;
  /** 모집 중 수 */
  open: number;
  /** 알림 수준. 주면 팔로우 중(`팔로우 중 ⌄` 메뉴), 없으면 팔로우 전 */
  level?: FollowLevel;
  onFollow?: () => void;
  onLevelChange?: (level: FollowLevel) => void;
  onUnfollow?: () => void;
  /** 팔로우 옆 지도 버튼 자리(지역만). 지도를 그릴지는 쓰는 쪽이 정하며 이 부품은 그리지 않는다 */
  map?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <TopicHeaderContext.Provider
      value={{
        kind,
        name,
        icon,
        programs,
        open,
        level,
        onFollow,
        onLevelChange,
        onUnfollow,
        map,
      }}
    >
      <header className={className}>
        {children ?? (
          <>
            <Banner />
            <div className="-mt-9 flex items-end justify-between px-4.5">
              <Tile />
              <Actions />
            </div>
            <Title />
            <Counts />
          </>
        )}
      </header>
    </TopicHeaderContext.Provider>
  );
}

/**
 * 지역 · 분야 화면 머리(컴파운드): Banner · Tile(종류 아이콘 76) · Actions(Follow + `map` 자리) · Title(h2) · Counts.
 * 팔로우 전 `팔로우` 버튼, `level`을 주면 `팔로우 중 ⌄` 메뉴(알림 수준 · 팔로우 해제). 팔로우 · 알림 · 해제를 저장하는 일은 쓰는 쪽 몫이다.
 * 기본 조립은 `<TopicHeader kind="region" name="서울" programs={4} open={3} map={<Button … />} />`. 분야는 `map`을 주지 않는다. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<TopicHeader kind="field" name="웹·앱" programs={9} open={5}><TopicHeader.Banner /><TopicHeader.Title /></TopicHeader>`
 */
export const TopicHeader = Object.assign(TopicHeaderRoot, {
  Banner,
  Tile,
  Follow,
  Actions,
  Title,
  Counts,
});

function BannerSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn(BANNER, className)} />;
}

function TileSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn(TILE, className)} />;
}

function ActionsSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('mt-13', className)}>
      <Skeleton className="h-10 w-24 rounded-full" />
    </div>
  );
}

function TitleSkeleton({ className }: { className?: string }) {
  return (
    <TextSkeleton variant="title" className={cn('mt-3.5 w-32', className)} />
  );
}

function CountsSkeleton({ className }: { className?: string }) {
  return (
    <TextSkeleton variant="caption" className={cn('mt-3 w-40', className)} />
  );
}

function TopicHeaderSkeletonRoot({ children }: { children?: ReactNode }) {
  return (
    <div aria-hidden>
      {children ?? (
        <>
          <BannerSkeleton />
          <div className="-mt-9 flex items-end justify-between px-4.5">
            <TileSkeleton />
            <ActionsSkeleton />
          </div>
          <TitleSkeleton />
          <CountsSkeleton />
        </>
      )}
    </div>
  );
}

/**
 * 불러오는 동안의 지역 · 분야 머리(컴파운드, TopicHeader와 같은 크기 · 간격): Banner · Tile · Actions · Title · Counts. 지도 버튼과 팔로우 중 메뉴는 없을 수 있어 팔로우 버튼 자리만 둔다.
 * 기본 조립은 `<TopicHeaderSkeleton />`
 */
export const TopicHeaderSkeleton = Object.assign(TopicHeaderSkeletonRoot, {
  Banner: BannerSkeleton,
  Tile: TileSkeleton,
  Actions: ActionsSkeleton,
  Title: TitleSkeleton,
  Counts: CountsSkeleton,
});
