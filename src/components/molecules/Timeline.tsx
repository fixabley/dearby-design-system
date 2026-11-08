import type { ReactNode } from 'react';
import type { TimelineGroup } from '@/types';
import { Text } from '@/components/atoms/Text';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/** 항목 하나: 점 + 제목 · 날짜(· D-day) */
function Item({ item: it, className }: { item: TimelineGroup['items'][number]; className?: string }) {
  return (
    <li className={cn('relative grid grid-cols-[14px_minmax(0,1fr)] items-start gap-3 pb-[18px] after:absolute after:bottom-0 after:left-1.5 after:top-[17px] after:border-l after:border-border last:[&:is(:last-child)]:after:hidden', className)}>
      <span className="ml-[3px] mt-[7px] size-[7px] rounded-full bg-primary" />
      <div><Text as="b" variant="innerTitle" block>{it.title}</Text>
        <Text variant="caption" tone="muted">{it.when}</Text>{it.dday && <Badge size="sm" className="ml-1.5 align-[1px]">{it.dday}</Badge>}</div>
    </li>
  );
}

/** 묶음 하나: 머리(민트 캡슐) + 항목들. children을 주면 항목 대신 그린다 */
function Group({ group: g, className, children }: { group: TimelineGroup; className?: string; children?: ReactNode }) {
  return (
    <li className={className}>
      <div className="relative flex items-center gap-2.5 pb-3.5 pt-0.5 after:absolute after:bottom-0 after:left-1.5 after:top-6 after:border-l after:border-border">
        <span className="size-3.5 rounded-full bg-primary ring-[3px] ring-accent" />
        <Badge variant="mint" className="h-auto px-2.5 py-[5px]"><Text variant="control">{g.title}</Text></Badge>
      </div>
      <ol>{children ?? g.items.map((it) => <Item key={it.title} item={it} />)}</ol>
    </li>
  );
}

function TimelineRoot({ groups, className, children }: { groups: TimelineGroup[]; className?: string; children?: ReactNode }) {
  return <ol className={cn('relative', className)}>{children ?? groups.map((g) => <Group key={g.title} group={g} />)}</ol>;
}

/**
 * 일정 타임라인(컴파운드): Group(묶음 머리 민트 캡슐) 안에 Item(점 + 제목 · 날짜).
 * 기본 조립은 `<Timeline groups={groups} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<Timeline groups={groups}><Timeline.Group group={groups[0]}><Timeline.Item item={groups[0].items[0]} /></Timeline.Group></Timeline>`
 */
export const Timeline = Object.assign(TimelineRoot, { Group, Item });
