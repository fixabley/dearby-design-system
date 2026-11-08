import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;
/** 요일 고르기(여러 개). 원 안 글자, 고르면 청록 채움 */
export function WeekdayPicker({ value, onChange }: { value: string[]; onChange?: (v: string[]) => void }) {
  return (
    <ToggleGroupPrimitive.Root type="multiple" value={value} onValueChange={onChange} className="grid grid-cols-7 gap-1.5" aria-label="요일">
      {DAYS.map((d) => (
        <ToggleGroupPrimitive.Item key={d} value={d} className="grid aspect-square place-items-center rounded-full bg-muted text-body font-semibold outline-none transition-[background-color,color,transform] duration-200 ease-spring active:scale-90 focus-visible:ring-2 focus-visible:ring-ring data-[state=on]:bg-primary data-[state=on]:text-white">{d}</ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  );
}
