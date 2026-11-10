import {
  createContext,
  useContext,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { Text, TextSkeleton } from '@/components/atoms/shared/Text';
import { NewDot } from '@/components/atoms/shared/NewDot';
import { Icon } from '@/components/foundations/Icon';
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from '@/components/ui/avatar';
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
  type FollowKind,
  type FollowLevel,
} from '@/icons';

/** 카드 면(원래 부품과 스켈레톤이 함께 쓴다): 흰 바탕 + 그림자(다크는 0.5px 테두리), 모서리 16, 최소 높이 132 */
const SURFACE =
  'relative flex min-h-33 rounded-lg bg-background shadow-control';
/** 안쪽: 위 12 · 옆 10 · 아래 10, 간격 6 */
const INNER = 'flex flex-col gap-1.5 px-2.5 pb-2.5 pt-3';

type FollowCardContextValue = {
  kind: FollowKind;
  name: string;
  logo?: string;
  fresh: boolean;
  level?: FollowLevel;
  onLevelChange?: (level: FollowLevel) => void;
  onUnfollow?: () => void;
};
const FollowCardContext = createContext<FollowCardContextValue | null>(null);

function useFollowCard(part: string) {
  const ctx = useContext(FollowCardContext);
  if (!ctx) throw new Error(`FollowCard.${part}는 <FollowCard> 안에서 쓴다`);
  return ctx;
}

/** 앞 요소 44: 조직 · 프로그램은 로고(없으면 이름 첫 글자), 지역 · 분야는 종류 아이콘 원 */
function Media({ className }: { className?: string }) {
  const { kind, name, logo } = useFollowCard('Media');
  if (kind === 'region' || kind === 'field')
    return (
      <span
        className={cn(
          'grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground [&_svg]:size-[22px]',
          className,
        )}
      >
        <Icon name={FOLLOW_KINDS[kind].icon} />
      </span>
    );
  return (
    <AvatarRoot
      className={cn(
        'relative flex size-11 shrink-0 overflow-hidden rounded-md bg-white ring-[.5px] ring-black/6 dark:bg-[#2A2E31] dark:ring-white/6',
        className,
      )}
    >
      {logo && (
        <AvatarImage src={logo} alt="" className="size-full object-cover" />
      )}
      <AvatarFallback
        delayMs={logo ? 300 : 0}
        aria-hidden
        className="flex size-full items-center justify-center bg-accent text-mint-foreground"
      >
        <Text variant="rowTitle" weight="bold">
          {name.slice(0, 1)}
        </Text>
      </AvatarFallback>
    </AvatarRoot>
  );
}

/** 이름: 두 줄까지, 넘치면 말줄임 */
function Name({ className }: { className?: string }) {
  const { name } = useFollowCard('Name');
  return (
    <Text
      as="b"
      variant="control"
      lines={2}
      className={cn('min-w-0 break-words', className)}
    >
      {name}
    </Text>
  );
}

/** 종류 글자(맨 아래) */
function Kind({ className }: { className?: string }) {
  const { kind } = useFollowCard('Kind');
  return (
    <Text
      as="small"
      variant="micro"
      tone="muted"
      className={cn('mt-auto', className)}
    >
      {FOLLOW_KINDS[kind].label}
    </Text>
  );
}

/** 알림 수준(맨 아래): 종 모양과 글자. `level`이 없으면 그리지 않는다 */
function Level({ className }: { className?: string }) {
  const { level } = useFollowCard('Level');
  if (!level) return null;
  const { label, icon } = FOLLOW_LEVELS[level];
  return (
    <Text
      as="small"
      variant="micro"
      tone="muted"
      className={cn(
        'mt-auto flex items-center gap-1 [&_svg]:size-[13px]',
        className,
      )}
    >
      <Icon name={icon} />
      <span className="sr-only">알림 </span>
      {label}
    </Text>
  );
}

/** 새 모집 점: 알림 수준 줄이 있는 격자 카드는 오른쪽 아래(오른쪽 위는 ⋯ 자리), 한 줄 카드는 오른쪽 위 */
function Dot({ className }: { className?: string }) {
  const { fresh, level } = useFollowCard('Dot');
  if (!fresh) return null;
  return (
    <NewDot
      className={cn(
        'absolute',
        level ? 'bottom-3 right-3' : 'right-2.5 top-2.5',
        className,
      )}
    />
  );
}

/** ⋯ 메뉴: 알림 수준(전체 · 신청일만 · 없음)과 팔로우 해제. 누르는 요소 밖 형제라 버튼이 겹치지 않는다 */
function Menu() {
  const { name, level, onLevelChange, onUnfollow } = useFollowCard('Menu');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`${name} 더보기`}
          className="absolute right-0 top-0 grid size-11 place-items-center rounded-full text-muted-foreground outline-none pressable focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-[18px]"
        >
          <Icon name="more" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        {onLevelChange && (
          <>
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
              aria-label="알림 수준"
              value={level}
              onValueChange={(v) => onLevelChange(v as FollowLevel)}
            >
              {(Object.keys(FOLLOW_LEVELS) as FollowLevel[]).map((k) => (
                <DropdownMenuRadioItem key={k} value={k}>
                  {FOLLOW_LEVELS[k].label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </>
        )}
        {onLevelChange && onUnfollow && <DropdownMenuSeparator />}
        {onUnfollow && (
          <DropdownMenuItem className="text-destructive" onSelect={onUnfollow}>
            <Icon name="close" />
            팔로우 해제
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FollowCardRoot({
  kind,
  name,
  logo,
  fresh = false,
  level,
  onLevelChange,
  onUnfollow,
  onClick,
  asChild,
  className,
  children,
}: {
  kind: FollowKind;
  name: string;
  logo?: string;
  /** 새 모집이 열려 있음(청록 점) */
  fresh?: boolean;
  /** 알림 수준. 주면 종류 글자 대신 알림 수준을 그린다 */
  level?: FollowLevel;
  /** 주면 ⋯ 메뉴에 알림 수준 고르기가 생긴다 */
  onLevelChange?: (level: FollowLevel) => void;
  /** 주면 ⋯ 메뉴에 팔로우 해제가 생긴다 */
  onUnfollow?: () => void;
  onClick?: () => void;
  asChild?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  // asChild면 children은 링크 요소라 조립은 기본 조립
  const body = (asChild ? null : children) ?? (
    <>
      <Media />
      <Name />
      {level ? <Level /> : <Kind />}
      <Dot />
    </>
  );
  const interactive = asChild || !!onClick;
  const Comp = asChild ? Slot : onClick ? 'button' : 'div';
  return (
    <FollowCardContext.Provider
      value={{ kind, name, logo, fresh, level, onLevelChange, onUnfollow }}
    >
      <li className={cn(SURFACE, className)}>
        <Comp
          type={onClick && !asChild ? 'button' : undefined}
          onClick={onClick}
          className={cn(
            INNER,
            'min-w-0 flex-1 rounded-lg text-left outline-none',
            interactive &&
              'pressable focus-visible:ring-2 focus-visible:ring-ring',
          )}
        >
          {body}
          {asChild && <Slottable>{children}</Slottable>}
        </Comp>
        {(onLevelChange || onUnfollow) && <Menu />}
      </li>
    </FollowCardContext.Provider>
  );
}

/**
 * 팔로우 카드(컴파운드, `FollowCards` 안에 놓는다): Media(로고 또는 종류 아이콘 원 44) · Name(두 줄) · Kind(종류 글자) 또는 Level(알림 종) · Dot(새 모집 점).
 * 누르는 요소가 카드 전체를 덮는다: `onClick`이면 button, `asChild`면 children으로 준 링크 요소 하나(`<a href>` · Next `Link`, 안은 비워 둔다).
 * `onLevelChange` · `onUnfollow`를 주면 ⋯ 메뉴가 오른쪽 위에 생긴다(링크 밖 형제 버튼).
 * 기본 조립은 `<FollowCard kind="org" name="카카오" logo="…" fresh onClick={…} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<FollowCard kind="org" name="카카오"><FollowCard.Media /><FollowCard.Name /></FollowCard>`
 */
export const FollowCard = Object.assign(FollowCardRoot, {
  Media,
  Name,
  Kind,
  Level,
  Dot,
});

/** 불러오는 동안의 팔로우 카드: 같은 면과 간격(로고 자리 · 이름 두 줄 · 종류 글자) */
export function FollowCardSkeleton({ className }: { className?: string }) {
  return (
    <li aria-hidden className={cn(SURFACE, className)}>
      <div className={cn(INNER, 'min-w-0 flex-1')}>
        <Skeleton className="size-11 rounded-md" />
        <TextSkeleton variant="control" lines={2} className="w-full" />
        <TextSkeleton variant="micro" className="mt-auto w-1/2" />
      </div>
    </li>
  );
}

/**
 * 팔로우 카드 목록(ul): `strip`은 가로로 넘기는 한 줄(카드 폭 107, 화면 옆 여백 24까지 번져 끝에서 잘리지 않는다),
 * `grid`는 3열 격자(사이 12). 안에는 FollowCard · BrowseCard(및 FollowCardSkeleton)를 놓는다.
 * 옆 여백 24는 화면 기준이라 다른 여백의 화면에서는 className으로 `-mx-N px-N`을 덮어쓴다
 */
export function FollowCards({
  layout = 'strip',
  className,
  ...props
}: ComponentProps<'ul'> & { layout?: 'strip' | 'grid' }) {
  return (
    <ul
      role="list"
      className={cn(
        layout === 'strip'
          ? '-mx-6 flex gap-2.5 overflow-x-auto px-6 pb-2.5 pt-1 [scrollbar-width:none] *:w-[107px] *:shrink-0'
          : 'grid grid-cols-3 gap-3',
        className,
      )}
      {...props}
    />
  );
}

type BrowseCardContextValue = { title: string; sub: string };
const BrowseCardContext = createContext<BrowseCardContextValue | null>(null);

function useBrowseCard(part: string) {
  const ctx = useContext(BrowseCardContext);
  if (!ctx) throw new Error(`BrowseCard.${part}는 <BrowseCard> 안에서 쓴다`);
  return ctx;
}

/** + 원 44: 면(민트) 위라 배경색 바탕에 청록 + */
function BrowseMedia({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'grid size-11 shrink-0 place-items-center rounded-full bg-background text-accent-foreground [&_svg]:size-[22px]',
        className,
      )}
    >
      <Icon name="addCircle" />
    </span>
  );
}

/** 제목: 두 줄까지 */
function BrowseTitle({ className }: { className?: string }) {
  const { title } = useBrowseCard('Title');
  return (
    <Text
      as="b"
      variant="control"
      tone="inherit"
      lines={2}
      className={cn('min-w-0 break-words', className)}
    >
      {title}
    </Text>
  );
}

/** 보조 글자(맨 아래). 시안은 청록 75%지만 민트 면 위 대비가 모자라 불투명으로 쓴다 */
function BrowseSub({ className }: { className?: string }) {
  const { sub } = useBrowseCard('Sub');
  return (
    <Text
      as="small"
      variant="micro"
      tone="inherit"
      className={cn('mt-auto', className)}
    >
      {sub}
    </Text>
  );
}

function BrowseCardRoot({
  kind,
  title,
  sub,
  onClick,
  asChild,
  className,
  children,
}: {
  kind: FollowKind;
  /** 기본은 `조직 둘러보기`처럼 종류 이름 + 둘러보기 */
  title?: string;
  /** 예: `조직 42곳` */
  sub: string;
  onClick?: () => void;
  asChild?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const heading = title ?? `${FOLLOW_KINDS[kind].label} 둘러보기`;
  // asChild면 children은 링크 요소라 조립은 기본 조립
  const body = (asChild ? null : children) ?? (
    <>
      <BrowseMedia />
      <BrowseTitle />
      <BrowseSub />
    </>
  );
  const interactive = asChild || !!onClick;
  const Comp = asChild ? Slot : onClick ? 'button' : 'div';
  return (
    <BrowseCardContext.Provider value={{ title: heading, sub }}>
      <li
        className={cn(
          'relative flex min-h-33 rounded-lg bg-accent shadow-none dark:shadow-control',
          className,
        )}
      >
        <Comp
          type={onClick && !asChild ? 'button' : undefined}
          onClick={onClick}
          className={cn(
            'flex min-w-0 flex-1 flex-col items-start gap-1.5 rounded-lg px-2.5 pb-2.5 pt-3 text-left text-mint-foreground outline-none',
            interactive &&
              'pressable focus-visible:ring-2 focus-visible:ring-ring',
          )}
        >
          {body}
          {asChild && <Slottable>{children}</Slottable>}
        </Comp>
      </li>
    </BrowseCardContext.Provider>
  );
}

/**
 * 둘러보기 카드(민트 면, 컴파운드, `FollowCards` 안에 놓는다): Media(+ 원) · Title · Sub.
 * 팔로우가 없을 때의 진입 카드이자 팔로우 관리의 각 섹션 끝 카드. `onClick`이면 button, `asChild`면 링크 요소 하나.
 * 기본 조립은 `<BrowseCard kind="org" sub="조직 42곳" onClick={…} />`
 */
export const BrowseCard = Object.assign(BrowseCardRoot, {
  Media: BrowseMedia,
  Title: BrowseTitle,
  Sub: BrowseSub,
});
