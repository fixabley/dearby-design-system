import { Toggle } from '@/components/ui/toggle';

/** 실시간 추적(shadcn Toggle live). 켜면 청록 채움 + 막대가 움직인다 */
export function LiveToggle({ pressed, onPressedChange }: { pressed: boolean; onPressedChange?: (v: boolean) => void }) {
  return (
    <Toggle variant="live" size="auto" pressed={pressed} onPressedChange={onPressedChange} aria-label="실시간 추적" className="group">
      <span className="flex h-3 items-end gap-0.5">
        {[5, 12, 8].map((h, i) => <i key={i} className="w-[2.5px] origin-bottom rounded-[2px] bg-current group-data-[state=on]:animate-[ds-eq_.9s_ease-in-out_infinite]" style={{ height: h, animationDelay: `${i * 0.15}s` }} />)}
      </span>LIVE
    </Toggle>
  );
}
