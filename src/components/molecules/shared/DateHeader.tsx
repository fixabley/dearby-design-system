import { createContext, useContext, useState, type ReactNode } from 'react';
import { Text } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatDate, formatDay, weekdayName } from '@/lib/date';
import { cn } from '@/lib/utils';

type DateHeaderContextValue = { date: Date; today?: Date; pickable: boolean };
const DateHeaderContext = createContext<DateHeaderContextValue | null>(null);

function useDateHeader(part: string) {
  const ctx = useContext(DateHeaderContext);
  if (!ctx) throw new Error(`DateHeader.${part}는 <DateHeader> 안에서 쓴다`);
  return ctx;
}

/** 날짜. 묶음 머리는 'M월 d일', 누를 수 있는 머리는 'M월 d일 (요일)'. 기준일(today)과 해가 다르면 앞에 'yyyy년' */
function Day() {
  const { date, today, pickable } = useDateHeader('Day');
  return (
    <span>{pickable ? formatDate(date, today) : formatDay(date, today)}</span>
  );
}

/** 요일 이름(흐리게) */
function Weekday() {
  const { date } = useDateHeader('Weekday');
  return (
    <Text variant="caption" tone="muted" weight="regular">
      {weekdayName(date)}
    </Text>
  );
}

/** 아래 꺾쇠(열리면 뒤집힌다) */
function Chevron() {
  return (
    <Icon
      name="chevronDown"
      className="size-[18px] shrink-0 text-muted-foreground transition-transform group-data-[state=open]/date-header:rotate-180"
    />
  );
}

function DateHeaderRoot({
  date,
  pickable = false,
  sticky = false,
  today,
  open,
  onSelect,
  onOpenChange,
  className,
  children,
}: {
  date: Date;
  pickable?: boolean;
  sticky?: boolean;
  today?: Date;
  open?: boolean;
  onSelect?: (date: Date) => void;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children?: ReactNode;
}) {
  const [innerOpen, setInnerOpen] = useState(false);
  const isOpen = open ?? innerOpen;
  const setOpen = (o: boolean) => {
    setInnerOpen(o);
    onOpenChange?.(o);
  };
  const body =
    children ??
    (pickable ? (
      <>
        <Day />
        <Chevron />
      </>
    ) : (
      <>
        <Day />
        <Weekday />
      </>
    ));
  return (
    <DateHeaderContext.Provider value={{ date, today, pickable }}>
      <div
        data-slot="date-header"
        className={cn(
          'pb-1 pt-1.5',
          sticky && 'sticky top-0 z-10 bg-background',
          className,
        )}
      >
        {pickable ? (
          <Popover open={isOpen} onOpenChange={setOpen}>
            <Text as="h2" variant="section" className="flex">
              <PopoverTrigger className="group/date-header flex items-center gap-1.5 rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {body}
              </PopoverTrigger>
            </Text>
            {/* 열면 고른 날에 초점(달력 autoFocus). 닫을 때 쓰는 쪽이 초점을 다른 곳(옮겨 간 묶음 머리 등)으로 옮겼으면 그대로 둔다 */}
            <PopoverContent
              align="start"
              aria-label="날짜 고르기"
              className="w-auto p-0"
              onOpenAutoFocus={(e) => e.preventDefault()}
              onCloseAutoFocus={(e) => {
                if (
                  document.activeElement &&
                  document.activeElement !== document.body
                )
                  e.preventDefault();
              }}
            >
              <Calendar
                mode="single"
                required
                autoFocus
                selected={date}
                defaultMonth={date}
                today={today}
                onSelect={(d) => {
                  onSelect?.(d);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        ) : (
          <Text
            as="h3"
            variant="subtitle"
            className="flex items-baseline gap-2"
          >
            {body}
          </Text>
        )}
      </div>
    </DateHeaderContext.Provider>
  );
}

/**
 * 날짜 묶음 머리(컴파운드, 시안 ㉗-g 알림 목록 · ⑧-0 내 활동): Day(날짜) · Weekday(요일, 흐리게) · Chevron(아래 꺾쇠).
 * 기본은 묶음 소제목 '11월 9일 월요일'(17/600 + 13 흐리게). pickable이면 고정 머리 모양 '11월 8일 (일) ⌄'(22/700)이 되고,
 * 누르면 말풍선 달력(shadcn Popover + Calendar, ⑧-0b)이 열려 날짜를 고르면 onSelect로 알리고 닫힌다. sticky면 스크롤해도 위에 붙는다.
 * 바꿔 조립하려면 부품을 직접 놓는다: `<DateHeader date={d}><DateHeader.Day /><DateHeader.Weekday /><DDay>D-18</DDay></DateHeader>`
 */
export const DateHeader = Object.assign(DateHeaderRoot, {
  Day,
  Weekday,
  Chevron,
});
