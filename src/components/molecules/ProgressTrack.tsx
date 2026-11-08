import type { Step } from '@/types';
import { cn } from '@/lib/utils';

/** 진행 단계 막대: 지난 단계 청록, 지금 단계 테두리, 앞 단계 채움. 지금 이름만 굵게 */
export function ProgressTrack({ steps, more, className }: { steps: Step[]; more?: number; className?: string }) {
  const seg = { past: 'bg-primary', cur: 'bg-background ring-[1.5px] ring-inset ring-primary', up: 'bg-muted' };
  return (
    <div className={className}>
      <div className="flex items-center gap-1">
        {steps.map((s, i) => <i key={i} className={cn('h-1.5 flex-1 rounded-[3px] transition-colors duration-300', seg[s.state])} />)}
        {more ? <em className="text-micro font-bold not-italic text-muted-foreground">+{more}</em> : null}
      </div>
      <div className="mt-1 flex gap-1">
        {steps.map((s, i) => <span key={i} className={cn('flex-1 truncate text-micro leading-tight', s.state === 'cur' ? 'font-bold text-foreground' : 'text-muted-foreground')}>{s.name}</span>)}
        {more ? <em className="w-3.5 shrink-0" /> : null}
      </div>
    </div>
  );
}
