import { useState } from 'react';
import { Text } from '@/components/atoms/shared/Text';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatDate } from '@/lib/date';

/**
 * 날짜 고르기(shadcn 방식: Button outline + Popover + Calendar). 버튼에 'M월 d일 (요일)', 값이 없으면 자리 글자(흐리게).
 * min · max 밖의 날과 disabledDates는 고를 수 없고, 달 넘김도 min · max 안에서만 된다. 고르면 바로 닫힌다.
 * label은 화면 읽기용 칸 이름(보이지 않음)이고 고른 값과 함께 읽힌다.
 */
export function DatePicker({
  value,
  placeholder = '선택',
  label = '날짜',
  min,
  max,
  disabledDates = [],
  today,
  open,
  onChange,
  onOpenChange,
  className,
}: {
  value?: Date;
  placeholder?: string;
  label?: string;
  min?: Date;
  max?: Date;
  disabledDates?: Date[];
  today?: Date;
  open?: boolean;
  onChange?: (date: Date) => void;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}) {
  const [innerOpen, setInnerOpen] = useState(false);
  const isOpen = open ?? innerOpen;
  const setOpen = (o: boolean) => {
    setInnerOpen(o);
    onOpenChange?.(o);
  };
  const text = value ? formatDate(value, today) : placeholder;
  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-label={`${label}, ${text}`}
          className={className}
        >
          <Text
            as="span"
            variant="body"
            weight="regular"
            tone={value ? 'inherit' : 'muted'}
            tabular
          >
            {text}
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        aria-label={`${label} 고르기`}
        className="w-auto p-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Calendar
          mode="single"
          required
          autoFocus
          selected={value}
          defaultMonth={value ?? today}
          today={today}
          startMonth={min}
          endMonth={max}
          disabled={[
            ...(min ? [{ before: min }] : []),
            ...(max ? [{ after: max }] : []),
            ...disabledDates,
          ]}
          onSelect={(d) => {
            onChange?.(d);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
