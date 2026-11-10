import type { CSSProperties } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

/** 분할 전환(shadcn ToggleGroup). 값은 영문 키, 화면 글자는 labels */
export function Segmented<T extends string>({
  items,
  value,
  onChange,
  labels,
  className,
  style,
  label,
  labelledBy,
}: {
  items: readonly T[];
  /** 고른 값. `null`이면 고른 칸이 없다(아직 답하지 않은 예/아니오) */
  value: T | null;
  onChange?: (v: T) => void;
  labels?: Partial<Record<T, string>>;
  className?: string;
  style?: CSSProperties;
  label?: string;
  /** 이름을 가진 글자의 id. `label` 대신 보이는 글자를 이름으로 삼을 때 */
  labelledBy?: string;
}) {
  return (
    <ToggleGroup
      type="single"
      value={value ?? ''}
      onValueChange={(v) => v && onChange?.(v as T)}
      count={items.length}
      index={value == null ? -1 : items.indexOf(value)}
      aria-label={label}
      aria-labelledby={labelledBy}
      className={className}
      style={style}
    >
      {items.map((x) => (
        <ToggleGroupItem key={x} value={x}>
          {labels?.[x] ?? x}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
