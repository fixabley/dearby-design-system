import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;
/** 요일 고르기(shadcn ToggleGroup multiple · circle) */
export function WeekdayPicker({ value, onChange }: { value: string[]; onChange?: (v: string[]) => void }) {
  return <ToggleGroup type="multiple" variant="circle" value={value} onValueChange={onChange} aria-label="요일">{DAYS.map((d) => <ToggleGroupItem key={d} value={d}>{d}</ToggleGroupItem>)}</ToggleGroup>;
}
