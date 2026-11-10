import {
  createContext,
  useContext,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { Text, TextSkeleton } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { FOLLOW_KINDS, type IconName, type TopicKind } from '@/icons';

/** 행(원래 부품과 스켈레톤이 함께 쓴다): 시안 높이 56, 아래 .5px 구분선(마지막 제외) */
const ROW = 'border-b-[.5px] border-border last:border-b-0';
/** 행 안쪽: 아이콘 원 · 이름 · 팔로우 중 · 개수, 간격 14 */
const INNER = 'flex h-14 w-full items-center gap-3.5 text-left';

type TopicRowContextValue = {
  kind: TopicKind;
  icon?: IconName;
  name: string;
  following: boolean;
  count: number;
};
const TopicRowContext = createContext<TopicRowContextValue | null>(null);

function useTopicRow(part: string) {
  const ctx = useContext(TopicRowContext);
  if (!ctx) throw new Error(`TopicRow.${part}는 <TopicRow> 안에서 쓴다`);
  return ctx;
}

/** 앞 원 36: 청록 아이콘(기본은 종류 아이콘, 분야마다 다르면 `icon`) */
function Media({ className }: { className?: string }) {
  const { kind, icon } = useTopicRow('Media');
  return (
    <span
      aria-hidden
      className={cn(
        'grid size-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground [&_svg]:size-[18px]',
        className,
      )}
    >
      <Icon name={icon ?? FOLLOW_KINDS[kind].icon} />
    </span>
  );
}

/** 이름 */
function Name({ className }: { className?: string }) {
  const { name } = useTopicRow('Name');
  return (
    <Text variant="rowTitle" truncate className={className}>
      {name}
    </Text>
  );
}

/** `팔로우 중` 글자(팔로우한 것만) */
function Following({ className }: { className?: string }) {
  const { following } = useTopicRow('Following');
  if (!following) return null;
  return (
    <Text
      variant="badge"
      weight="semibold"
      tone="accent"
      nowrap
      className={className}
    >
      팔로우 중
    </Text>
  );
}

/** 오른쪽 끝 개수: `프로그램 31개` */
function Count({ className }: { className?: string }) {
  const { count } = useTopicRow('Count');
  return (
    <Text
      variant="caption"
      tone="muted"
      tabular
      nowrap
      className={cn('ml-auto', className)}
    >
      프로그램 {count}개
    </Text>
  );
}

function TopicRowRoot({
  kind,
  icon,
  name,
  count,
  following = false,
  onClick,
  asChild,
  className,
  children,
}: {
  kind: TopicKind;
  /** 종류 기본 아이콘을 덮는다(분야마다 아이콘이 다를 때. 어떤 아이콘을 쓸지는 쓰는 쪽이 정한다) */
  icon?: IconName;
  name: string;
  /** 프로그램 수 */
  count: number;
  /** 팔로우 중 글자 */
  following?: boolean;
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
      <Following />
      <Count />
    </>
  );
  const interactive = asChild || !!onClick;
  const Comp = asChild ? Slot : onClick ? 'button' : 'div';
  return (
    <TopicRowContext.Provider value={{ kind, icon, name, following, count }}>
      <li className={cn(ROW, className)}>
        <Comp
          type={onClick && !asChild ? 'button' : undefined}
          onClick={onClick}
          className={cn(
            INNER,
            'rounded-md outline-none',
            interactive &&
              'pressable focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
          )}
        >
          {body}
          {asChild && <Slottable>{children}</Slottable>}
        </Comp>
      </li>
    </TopicRowContext.Provider>
  );
}

/**
 * 지역 · 분야 목록 행(컴파운드, `<ul role="list">` 안에 놓는다): Media(청록 아이콘 원 36) · Name · Following(`팔로우 중`) · Count(오른쪽 끝 `프로그램 n개`).
 * 누르는 요소가 행 전체를 덮는다: `onClick`이면 button, `asChild`면 children으로 준 링크 요소 하나(안은 비워 둔다). 둘 다 없으면 그리기만 한다.
 * 기본 조립은 `<TopicRow kind="region" name="서울" count={31} following asChild><a href="/regions/seoul" /></TopicRow>`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<TopicRow kind="field" name="웹·앱" count={9}><TopicRow.Media /><TopicRow.Name /></TopicRow>`
 */
export const TopicRow = Object.assign(TopicRowRoot, {
  Media,
  Name,
  Following,
  Count,
});

/** 불러오는 동안의 지역 · 분야 행: 같은 높이 · 간격(원 · 이름 · 개수) */
export function TopicRowSkeleton({
  className,
  ...props
}: ComponentProps<'li'>) {
  return (
    <li aria-hidden className={cn(ROW, className)} {...props}>
      <div className={INNER}>
        <Skeleton className="size-9 shrink-0 rounded-full" />
        <TextSkeleton variant="rowTitle" className="w-16" />
        <TextSkeleton variant="caption" className="ml-auto w-20" />
      </div>
    </li>
  );
}
