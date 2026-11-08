import type { ReactNode } from 'react';
import type { IconName } from '@/icons';
import { DDay } from '@/components/atoms/DDay';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/lib/utils';

/** 아이콘 + 굵은 라벨 + 값. 날짜는 M월 d일 (요일) HH:mm, `오늘` 같은 상대 표기 없음 */
export function MetaLine({ icon = 'calendar', label, value, dday, wrap, className }: { icon?: IconName; label: string; value?: ReactNode; dday?: string; wrap?: boolean; className?: string }) {
  return (
    <div className={cn('flex min-w-0 items-center gap-1.5 text-caption leading-snug text-muted-foreground [&>svg]:size-[15px] [&>svg]:shrink-0 [&>svg]:text-foreground', className)}>
      <Icon name={icon} />
      <span className={cn('min-w-0', !wrap && 'truncate')}><b className="mr-0.5 font-semibold text-foreground">{label}</b> {dday ? <DDay>{dday}</DDay> : value}</span>
    </div>
  );
}

export function MetaList({ items, wrap = true }: { items: { icon?: IconName; label: string; value?: string; dday?: string }[]; wrap?: boolean }) {
  return <div className="flex flex-col gap-1.5">{items.map((m) => <MetaLine key={m.label} {...m} wrap={wrap} />)}</div>;
}
