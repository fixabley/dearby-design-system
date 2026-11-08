import { useState } from 'react';
import type { Block } from '@/types';
import { Icon } from '@/components/atoms/Icon';
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

function BlockFace({ b }: { b: Block }) {
  return (
    <>
      <b className={cn('text-[12px] leading-tight', b.shape === 'rest' ? 'font-medium' : 'font-semibold')}>{b.name}</b>
      {b.who && b.to - b.from >= 2 && <small className="truncate text-[10px] opacity-80">{b.who}</small>}
      {b.desc && <span className="absolute right-[3px] top-1 opacity-85 [&_svg]:size-2.5"><Icon name="description" label="상세 설명 있음" /></span>}
    </>
  );
}

/**
 * 주간 시간표: 수업(민트) · 특강(청록 채움) · 쉬는 시간(점선).
 * mode=view(참여자): 상세 설명이 있는 블록만 눌리고, 누르면 상세 창. mode=edit(개설자): 모든 블록을 골라 편집, 고른 블록은 청록 테두리.
 */
export function WeeklyTimetable({ blocks, hourHeight = 44, from = 10, to = 17, mode = 'view', selected, onSelect }: {
  blocks: Block[]; hourHeight?: number; from?: number; to?: number; mode?: 'view' | 'edit'; selected?: number; onSelect?: (i: number) => void;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const pos = (b: Block) => ({ left: `calc(${b.day} * 20% + 2px)`, top: (b.from - from) * hourHeight + 2, height: (b.to - b.from) * hourHeight - 4 });
  const grid = { background: `repeating-linear-gradient(180deg,var(--border) 0 .5px,transparent .5px ${hourHeight}px)` };
  const cur = open == null ? null : blocks[open];
  return (
    <Card className="px-2.5 pb-2.5 pt-3">
      <div className="mb-1.5 grid grid-cols-[24px_repeat(5,1fr)] text-center text-[12px] font-semibold text-muted-foreground"><span />{DAYS.map((d) => <span key={d}>{d}</span>)}</div>
      <div className="relative grid grid-cols-[24px_minmax(0,1fr)]" style={{ height: (to - from) * hourHeight }}>
        <div className="relative">{Array.from({ length: to - from + 1 }, (_, i) => (
          <span key={i} className="absolute right-1 -translate-y-1/2 text-[10px] tabular-nums text-muted-foreground first:translate-y-0 last:-translate-y-full" style={{ top: i * hourHeight }}>{from + i}</span>))}</div>
        {mode === 'edit' ? (
          <ToggleGroup type="single" variant="plain" aria-label="시간표 블록" value={selected == null ? '' : String(selected)} onValueChange={(v) => v && onSelect?.(Number(v))} className="relative rounded-sm" style={grid}>
            {blocks.map((b, i) => (
              <ToggleGroupItem key={i} value={String(i)} className={cn(BASE, PRESS, SHAPE[b.shape], selected === i && 'ring-2 ring-inset ring-primary')} style={pos(b)}><BlockFace b={b} /></ToggleGroupItem>
            ))}
          </ToggleGroup>
        ) : (
          <div className="relative rounded-sm" style={grid}>
            {blocks.map((b, i) => b.desc
              ? <button key={i} type="button" aria-label={`${DAYS[b.day]}요일 ${b.name} 자세히`} onClick={() => setOpen(i)} className={cn(BASE, PRESS, SHAPE[b.shape], 'cursor-pointer hover:shadow-[0_2px_10px_rgba(20,32,31,.18)]')} style={pos(b)}><BlockFace b={b} /></button>
              : <div key={i} className={cn(BASE, SHAPE[b.shape])} style={pos(b)}><BlockFace b={b} /></div>)}
          </div>
        )}
      </div>
      {cur && (
        <ScheduleItemDialog open={open != null} onOpenChange={(o) => !o && setOpen(null)} title={cur.name}
          badge={<Badge variant={cur.shape === 'special' ? 'default' : 'mint'}>{cur.shape === 'special' ? '특강' : '수업'}</Badge>}
          when={`매주 ${DAYS[cur.day]}요일 ${hh(cur.from)} ~ ${hh(cur.to)}`} people={cur.leaders} description={cur.desc} />
      )}
    </Card>
  );
}
