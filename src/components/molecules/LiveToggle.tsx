import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cn } from '@/lib/utils';

/** 실시간 추적(Radix Toggle). 켜면 청록 채움 + 막대가 움직인다 */
export function LiveToggle({ pressed, onPressedChange }: { pressed: boolean; onPressedChange?: (v: boolean) => void }) {
  return (
    <TogglePrimitive.Root pressed={pressed} onPressedChange={onPressedChange} aria-label="실시간 추적" className={cn(
      'group flex h-7 w-14 items-center justify-center gap-[5px] rounded-full text-micro font-bold tracking-wider outline-none transition-[background-color,box-shadow,color] duration-200 focus-visible:ring-2 focus-visible:ring-ring',
      'bg-background text-accent-foreground ring-[1.5px] ring-inset ring-primary data-[state=on]:bg-primary data-[state=on]:text-white data-[state=on]:shadow-[0_6px_18px_rgba(0,127,128,.28)] data-[state=on]:ring-0')}>
      <span className="flex h-3 items-end gap-0.5">
        {[5, 12, 8].map((h, i) => (
          <i key={i} className="w-[2.5px] origin-bottom rounded-[2px] bg-current group-data-[state=on]:animate-[ds-eq_.9s_ease-in-out_infinite]" style={{ height: h, animationDelay: `${i * 0.15}s` }} />
        ))}
      </span>LIVE
    </TogglePrimitive.Root>
  );
}
