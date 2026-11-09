import { createContext, useContext, type ReactNode } from 'react';
import type { IconName } from '@/icons';
import { DDay } from '@/components/atoms/shared/DDay';
import { Text, TextSkeleton } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type MetaLineContextValue = {
  icon: IconName;
  label: string;
  value?: ReactNode;
  dday?: string;
};
const MetaLineContext = createContext<MetaLineContextValue | null>(null);

function useMetaLine(part: string) {
  const ctx = useContext(MetaLineContext);
  if (!ctx) throw new Error(`MetaLine.${part}는 <MetaLine> 안에서 쓴다`);
  return ctx;
}

/** 맨 앞 아이콘 */
function MetaLineIcon({ className }: { className?: string }) {
  const { icon } = useMetaLine('Icon');
  return <Icon name={icon} className={className} />;
}

/** 굵은 라벨 */
function Label({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { label } = useMetaLine('Label');
  return (
    <Text
      as="b"
      variant="caption"
      weight="semibold"
      tone="default"
      className={cn('mr-0.5', className)}
    >
      {children ?? label}
    </Text>
  );
}

/** 값. dday가 있으면 값 대신 D-day */
function Value({ children }: { children?: ReactNode }) {
  const { value, dday } = useMetaLine('Value');
  return <>{children ?? (dday ? <DDay>{dday}</DDay> : value)}</>;
}

function MetaLineRoot({
  icon = 'calendar',
  label,
  value,
  dday,
  wrap,
  className,
  children,
}: {
  icon?: IconName;
  label: string;
  value?: ReactNode;
  dday?: string;
  wrap?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <MetaLineContext.Provider value={{ icon, label, value, dday }}>
      <Text
        as="div"
        variant="caption"
        tone="muted"
        className={cn(
          'flex min-w-0 items-center gap-1.5 [&>svg]:size-[15px] [&>svg]:shrink-0 [&>svg]:text-foreground',
          className,
        )}
      >
        {children ?? (
          <>
            <MetaLineIcon />
            <span className={cn('min-w-0', !wrap && 'truncate')}>
              <Label /> <Value />
            </span>
          </>
        )}
      </Text>
    </MetaLineContext.Provider>
  );
}

/**
 * 아이콘 + 굵은 라벨 + 값(컴파운드): Icon · Label · Value. 날짜는 M월 d일 (요일) HH:mm, `오늘` 같은 상대 표기 없음.
 * 기본 조립은 `<MetaLine icon="calendar" label="모집" value="11월 9일 (월) 17:00 마감" />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<MetaLine label="마감" dday="D-6"><MetaLine.Icon /><MetaLine.Value /></MetaLine>`
 */
export const MetaLine = Object.assign(MetaLineRoot, {
  Icon: MetaLineIcon,
  Label,
  Value,
});

export function MetaList({
  items,
  wrap = true,
  className,
}: {
  items: { icon?: IconName; label: string; value?: string; dday?: string }[];
  wrap?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {items.map((m) => (
        <MetaLine key={m.label} {...m} wrap={wrap} />
      ))}
    </div>
  );
}

/** 불러오는 동안의 메타 줄: 아이콘 자리 + 보조 글자 한 줄(같은 줄 높이). 너비는 className으로 */
export function MetaLineSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('flex w-3/4 items-center gap-1.5', className)}
    >
      <Skeleton className="size-[15px] shrink-0" />
      <TextSkeleton variant="caption" className="flex-1" />
    </div>
  );
}
