import type { CSSProperties } from 'react';
import type { IconName } from '@/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * 보기 전환(2026-11-17 결정): 내용은 같고 보여 주는 모양만 바뀌는 전환(격자 · 목록, 달력 · 주간 · 목록)은 분할 전환(Segmented) 대신
 * 제목 줄 오른쪽에 두는 작은 아이콘 단추 묶음이다. 단추는 44px 누르는 자리(Button icon)이고 고른 것은 청록 아이콘과 옅은 면이다.
 * 단추마다 이름(`label`: "격자로 보기")과 `aria-pressed`를 읽힌다. "내 일정 | 전체"처럼 내용이 바뀌는 전환은 Segmented를 쓴다.
 * 아이콘은 viewList(목록) · viewGrid(격자) · viewWeek(주간) · calendar(달력)
 */
export function ViewSwitch<T extends string>({
  items,
  value,
  onChange,
  label,
  labelledBy,
  className,
  style,
}: {
  items: readonly { value: T; icon: IconName; label: string }[];
  value: T;
  onChange?: (value: T) => void;
  /** 묶음의 이름("보기") */
  label?: string;
  /** 이름을 가진 글자의 id. `label` 대신 보이는 글자를 이름으로 삼을 때 */
  labelledBy?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      aria-labelledby={labelledBy}
      className={cn('inline-flex items-center', className)}
      style={style}
    >
      {items.map((item) => {
        const on = item.value === value;
        return (
          <Button
            key={item.value}
            type="button"
            variant="plain"
            size="icon"
            icon={item.icon}
            aria-label={item.label}
            aria-pressed={on}
            className={cn(
              'transition-colors',
              on ? 'bg-accent text-primary' : 'text-muted-foreground',
            )}
            onClick={() => !on && onChange?.(item.value)}
          />
        );
      })}
    </div>
  );
}
