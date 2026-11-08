import * as React from 'react';
import { DayPicker, getDefaultClassNames, type DayButton } from 'react-day-picker';
import { ko } from 'react-day-picker/locale';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/foundations/Icon';

// shadcn Calendar(react-day-picker) + Dearby: iOS 날짜 피커 모양(시안 ⑧-0b). 왼쪽 '2026년 11월', 오른쪽 이전·다음(청록),
// 일요일부터 한 주. 고른 날은 민트 원 + 청록 굵은 글자, 오늘은 청록 굵은 글자, 오늘을 고르면 iOS처럼 청록 채움 + 흰 글자로 구분.
// 기간은 시작·끝 청록 채움 원 사이를 민트 띠로 잇는다(끝 원까지 민트면 띠와 구분되지 않는다). 앞뒤 달 날짜는 흐리게
const navButton = 'inline-flex size-10 items-center justify-center rounded-full text-accent-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring aria-disabled:pointer-events-none aria-disabled:opacity-40 [&_svg]:size-5';

// 기간 띠는 칸(td)에 깐다. 시작·끝은 원 가운데부터 이어지고, 줄 끝에서는 둥글게 끊는다(DayButton의 data-range-*)
const rangeBand = [
  'has-[[data-range-middle]]:bg-accent first:has-[[data-range-middle]]:rounded-l-full last:has-[[data-range-middle]]:rounded-r-full',
  'has-[[data-range-start]]:bg-[linear-gradient(to_right,transparent_50%,var(--accent)_50%)] last:has-[[data-range-start]]:bg-none',
  'has-[[data-range-end]]:bg-[linear-gradient(to_left,transparent_50%,var(--accent)_50%)] first:has-[[data-range-end]]:bg-none',
];

function Calendar({ className, classNames, showOutsideDays = true, components, ...props }: React.ComponentProps<typeof DayPicker>) {
  const d = getDefaultClassNames();
  return (
    <DayPicker
      locale={ko}
      weekStartsOn={0}
      navLayout="after"
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        root: cn('w-fit', d.root),
        months: cn('relative flex flex-col gap-4 md:flex-row', d.months),
        month: cn('grid grid-cols-[1fr_auto] items-center gap-y-1', d.month),
        month_caption: cn('flex h-10 items-center px-1', d.month_caption),
        caption_label: cn('select-none text-headline', d.caption_label),
        nav: cn('flex items-center gap-0.5', d.nav),
        button_previous: cn(navButton, d.button_previous),
        button_next: cn(navButton, d.button_next),
        month_grid: cn('col-span-2', d.month_grid),
        weekdays: cn('flex', d.weekdays),
        weekday: cn('w-11 select-none pb-1 text-caption font-semibold text-muted-foreground', d.weekday),
        week: cn('mt-1 flex', d.week),
        day: cn('relative w-11 select-none p-0 text-center', rangeBand, d.day),
        hidden: cn('invisible', d.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: c }) => (
          <Icon name={orientation === 'left' ? 'back' : orientation === 'right' ? 'chevronRight' : 'chevronDown'} className={cn(orientation === 'up' && 'rotate-180', c)} />
        ),
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  );
}

/** 날짜 원. 기간의 시작·끝·가운데를 data-range-*로 알려 칸(td)이 띠를 깔게 한다(하루짜리 기간은 그냥 고른 날) */
function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => { if (modifiers.focused) ref.current?.focus(); }, [modifiers.focused]);
  const start = modifiers.range_start && !modifiers.range_end;
  const end = modifiers.range_end && !modifiers.range_start;
  const middle = modifiers.range_middle;
  const picked = modifiers.selected && !middle && !start && !end;
  const filled = start || end || (picked && modifiers.today);
  return (
    <button ref={ref} data-day={day.isoDate} data-range-start={start || undefined} data-range-end={end || undefined} data-range-middle={middle || undefined}
      className={cn(
        'mx-auto flex size-10 items-center justify-center rounded-full text-body-lg tabular-nums outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none',
        modifiers.today && 'font-semibold text-accent-foreground',
        modifiers.outside && 'text-muted-foreground',
        modifiers.disabled && 'text-muted-foreground opacity-50',
        middle && 'text-accent-foreground hover:bg-transparent',
        picked && !filled && 'bg-accent font-semibold text-accent-foreground hover:bg-accent',
        filled && 'bg-primary font-semibold text-primary-foreground hover:bg-primary',
        className)} {...props} />
  );
}

export { Calendar, CalendarDayButton };
