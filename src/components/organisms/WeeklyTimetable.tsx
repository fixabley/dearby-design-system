import { createContext, useContext, useState, type CSSProperties, type ReactNode } from 'react';
import type { Block } from '@/types';
import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/foundations/Icon';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { ScheduleItemDialog } from './ScheduleItemDialog';

const DAYS = ['월', '화', '수', '목', '금'];
const SHAPE = { class: 'bg-accent text-accent-foreground', special: 'bg-primary text-white', rest: 'items-center justify-center border border-dashed border-[#C9CFCE] text-muted-foreground dark:border-white/20' };
const hh = (h: number) => `${String(h).padStart(2, '0')}:00`;
const BASE = 'absolute flex w-[calc(20%-4px)] flex-col gap-px overflow-hidden rounded-[8px] px-[5px] py-1 text-left';
const PRESS = 'outline-none transition-[box-shadow,transform] duration-200 active:scale-[.98] focus-visible:ring-2 focus-visible:ring-ring';

type Mode = 'view' | 'edit';
type WeeklyTimetableContextValue = {
  blocks: Block[]; hourHeight: number; from: number; to: number; mode: Mode; selected?: number; onSelect?: (i: number) => void; open: number | null; setOpen: (i: number | null) => void;
};
const WeeklyTimetableContext = createContext<WeeklyTimetableContextValue | null>(null);

function useWeeklyTimetable(part: string) {
  const ctx = useContext(WeeklyTimetableContext);
  if (!ctx) throw new Error(`WeeklyTimetable.${part}는 <WeeklyTimetable> 안에서 쓴다`);
  return ctx;
}

function BlockFace({ b }: { b: Block }) {
  return (
    <>
      <Text as="b" variant="caption" weight={b.shape === 'rest' ? 'medium' : 'semibold'}>{b.name}</Text>
      {b.who && b.to - b.from >= 2 && <Text as="small" variant="micro" truncate className="opacity-80">{b.who}</Text>}
      {b.desc && <span className="absolute right-[3px] top-1 opacity-85 [&_svg]:size-2.5"><Icon name="description" label="상세 설명 있음" /></span>}
    </>
  );
}

/** 요일 머리(월~금) */
function Days({ className }: { className?: string }) {
  return <Text as="div" variant="caption" weight="semibold" tone="muted" className={cn('mb-1.5 grid grid-cols-[24px_repeat(5,1fr)] text-center', className)}><span />{DAYS.map((d) => <span key={d}>{d}</span>)}</Text>;
}

/** 블록 하나(index번째). view: 상세 설명이 있으면 눌러 상세 창, edit: 골라 편집(고른 블록은 청록 테두리) */
function BlockItem({ index, className }: { index: number; className?: string }) {
  const { blocks, hourHeight, from, mode, selected, setOpen } = useWeeklyTimetable('Block');
  const b = blocks[index];
  const style: CSSProperties = { left: `calc(${b.day} * 20% + 2px)`, top: (b.from - from) * hourHeight + 2, height: (b.to - b.from) * hourHeight - 4 };
  if (mode === 'edit') return <ToggleGroupItem value={String(index)} className={cn(BASE, PRESS, SHAPE[b.shape], selected === index && 'ring-2 ring-inset ring-primary', className)} style={style}><BlockFace b={b} /></ToggleGroupItem>;
  if (b.desc) return <button type="button" aria-label={`${DAYS[b.day]}요일 ${b.name} 자세히`} onClick={() => setOpen(index)} className={cn(BASE, PRESS, SHAPE[b.shape], 'cursor-pointer hover:shadow-[0_2px_10px_rgba(20,32,31,.18)]', className)} style={style}><BlockFace b={b} /></button>;
  return <div className={cn(BASE, SHAPE[b.shape], className)} style={style}><BlockFace b={b} /></div>;
}

/** 격자: 시각 열 + 블록 칸(시간마다 가는 줄). children을 주면 모든 블록 대신 그린다 */
function Grid({ className, children }: { className?: string; children?: ReactNode }) {
  const { blocks, hourHeight, from, to, mode, selected, onSelect } = useWeeklyTimetable('Grid');
  const lines = { background: `repeating-linear-gradient(180deg,var(--border) 0 .5px,transparent .5px ${hourHeight}px)` };
  const items = children ?? blocks.map((_, i) => <BlockItem key={i} index={i} />);
  return (
    <div className={cn('relative grid grid-cols-[24px_minmax(0,1fr)]', className)} style={{ height: (to - from) * hourHeight }}>
      <div className="relative">{Array.from({ length: to - from + 1 }, (_, i) => (
        <Text key={i} variant="micro" tabular tone="muted" className="absolute right-1 -translate-y-1/2 first:translate-y-0 last:-translate-y-full" style={{ top: i * hourHeight }}>{from + i}</Text>))}</div>
      {mode === 'edit' ? (
        <ToggleGroup type="single" variant="plain" aria-label="시간표 블록" value={selected == null ? '' : String(selected)} onValueChange={(v) => v && onSelect?.(Number(v))} className="relative rounded-sm" style={lines}>{items}</ToggleGroup>
      ) : (
        <div className="relative rounded-sm" style={lines}>{items}</div>
      )}
    </div>
  );
}

/** 누른 블록의 상세 창(view) */
function Detail() {
  const { blocks, open, setOpen } = useWeeklyTimetable('Detail');
  const cur = open == null ? null : blocks[open];
  return cur ? (
    <ScheduleItemDialog open={open != null} onOpenChange={(o) => !o && setOpen(null)} title={cur.name}
      badge={<Badge variant={cur.shape === 'special' ? 'default' : 'mint'}>{cur.shape === 'special' ? '특강' : '수업'}</Badge>}
      when={`매주 ${DAYS[cur.day]}요일 ${hh(cur.from)} ~ ${hh(cur.to)}`} people={cur.leaders} description={cur.desc} />
  ) : null;
}

function WeeklyTimetableRoot({ blocks, hourHeight = 44, from = 10, to = 17, mode = 'view', selected, onSelect, children }: {
  blocks: Block[]; hourHeight?: number; from?: number; to?: number; mode?: Mode; selected?: number; onSelect?: (i: number) => void; children?: ReactNode;
}) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <WeeklyTimetableContext.Provider value={{ blocks, hourHeight, from, to, mode, selected, onSelect, open, setOpen }}>
      <Card className="px-2.5 pb-2.5 pt-3">{children ?? <><Days /><Grid /><Detail /></>}</Card>
    </WeeklyTimetableContext.Provider>
  );
}

/**
 * 주간 시간표(컴파운드): Days(요일 머리) · Grid(시각 열 + 블록마다 Block: 수업 민트 · 특강 청록 채움 · 쉬는 시간 점선) · Detail(상세 창).
 * mode=view(참여자): 상세 설명이 있는 블록만 눌리고, 누르면 상세 창. mode=edit(개설자): 모든 블록을 골라 편집, 고른 블록은 청록 테두리.
 * 기본 조립은 `<WeeklyTimetable blocks={blocks} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<WeeklyTimetable blocks={blocks}><WeeklyTimetable.Grid>{blocks.map((b, i) => b.shape !== 'rest' && <WeeklyTimetable.Block key={i} index={i} />)}</WeeklyTimetable.Grid><WeeklyTimetable.Detail /></WeeklyTimetable>`
 */
export const WeeklyTimetable = Object.assign(WeeklyTimetableRoot, { Days, Grid, Block: BlockItem, Detail });
