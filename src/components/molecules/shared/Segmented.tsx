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
}: {
  items: readonly T[];
  value: T;
  onChange?: (v: T) => void;
  labels?: Partial<Record<T, string>>;
  className?: string;
  style?: CSSProperties;
  label?: string;
}) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => v && onChange?.(v as T)}
      count={items.length}
      index={Math.max(0, items.indexOf(value))}
      aria-label={label}
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
