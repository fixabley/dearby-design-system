import { Fragment } from 'react';
import type { IconName } from '@/icons';
import { ListRow } from '@/components/molecules/shared/ListGroup';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

/**
 * 묶음 목록의 고르기 행(시안 `.srow`): 아이콘 · 제목 · 오른쪽 값 + 위아래 꺾쇠. 행 어디를 눌러도 목록이 열린다.
 * ListRow 위에 shadcn Select를 행 전체로 펼쳐 얹었다. 화면 읽기 이름은 `제목, 고른 값`이다.
 */
export function PickerRow({
  icon,
  title,
  value,
  options,
  onValueChange,
  className,
}: {
  icon?: IconName;
  title: string;
  value: string;
  /** `separatorBefore`: 이 항목 앞에 구분선(시안 ㉙-i4 종류 메뉴의 링크 앞) */
  options: { value: string; label: string; separatorBefore?: boolean }[];
  onValueChange?: (value: string) => void;
  className?: string;
}) {
  return (
    <ListRow
      icon={icon}
      title={title}
      className={cn('relative', className)}
      trailing={
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger
            variant="inline"
            icon="chevronUpDown"
            aria-label={`${title}, ${options.find((o) => o.value === value)?.label ?? ''}`}
            className="pressable absolute inset-0 h-full justify-end gap-1.5 rounded-none px-4 focus-visible:ring-inset [&>span:first-child]:min-w-0 [&>span:first-child]:truncate"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end" className="min-w-[200px]">
            {options.map((o) => (
              <Fragment key={o.value}>
                {o.separatorBefore && <SelectSeparator />}
                <SelectItem value={o.value}>{o.label}</SelectItem>
              </Fragment>
            ))}
          </SelectContent>
        </Select>
      }
    />
  );
}
