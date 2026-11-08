import type { Block } from '@/types';
import { Icon } from '@/components/atoms/Icon';
import { Card } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

const DAYS = ['월', '화', '수', '목', '금'];
const SHAPE = { class: 'bg-accent text-accent-foreground', special: 'bg-primary text-white', rest: 'items-center justify-center border border-dashed border-[#C9CFCE] text-muted-foreground dark:border-white/20' };

/** 주간 시간표: 수업(민트) · 특강(청록 채움) · 쉬는 시간(점선). 고른 블록은 청록 테두리 */
export function WeeklyTimetable({ blocks, hourHeight = 44, from = 10, to = 17, selected, onSelect }: { blocks: Block[]; hourHeight?: number; from?: number; to?: number; selected?: number; onSelect?: (i: number) => void }) {
  return (
    <Card className="px-2.5 pb-2.5 pt-3">
      <div className="mb-1.5 grid grid-cols-[24px_repeat(5,1fr)] text-center text-[12px] font-semibold text-muted-foreground"><span />{DAYS.map((d) => <span key={d}>{d}</span>)}</div>
      <div className="relative grid grid-cols-[24px_minmax(0,1fr)]" style={{ height: (to - from) * hourHeight }}>
        <div className="relative">{Array.from({ length: to - from + 1 }, (_, i) => (
          <span key={i} className="absolute right-1 -translate-y-1/2 text-[10px] tabular-nums text-muted-foreground first:translate-y-0 last:-translate-y-full" style={{ top: i * hourHeight }}>{from + i}</span>))}</div>
        <ToggleGroup type="single" variant="plain" aria-label="시간표 블록" value={selected == null ? '' : String(selected)} onValueChange={(v) => v && onSelect?.(Number(v))}
          className="relative rounded-sm" style={{ background: `repeating-linear-gradient(180deg,var(--border) 0 .5px,transparent .5px ${hourHeight}px)` }}>
          {blocks.map((b, i) => (
            <ToggleGroupItem key={i} value={String(i)} className={cn(
              'absolute flex w-[calc(20%-4px)] flex-col gap-px overflow-hidden rounded-[8px] px-[5px] py-1 text-left outline-none transition-[box-shadow,transform] duration-200 active:scale-[.98] focus-visible:ring-2 focus-visible:ring-ring',
              SHAPE[b.shape], selected === i && 'ring-2 ring-inset ring-primary')}
              style={{ left: `calc(${b.day} * 20% + 2px)`, top: (b.from - from) * hourHeight + 2, height: (b.to - b.from) * hourHeight - 4 }}>
              <b className={cn('text-[12px] leading-tight', b.shape === 'rest' ? 'font-medium' : 'font-semibold')}>{b.name}</b>
              {b.who && b.to - b.from >= 2 && <small className="truncate text-[10px] opacity-80">{b.who}</small>}
              {b.desc && <span className="absolute right-[3px] top-1 opacity-85 [&_svg]:size-2.5"><Icon name="description" label="상세 설명 있음" /></span>}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </Card>
  );
}
