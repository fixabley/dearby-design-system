import { createContext, useContext, type ReactNode } from 'react';
import type { IconName } from '@/icons';
import { DatePicker } from '@/components/molecules/shared/DatePicker';
import { ListGroup, ListRow } from '@/components/molecules/shared/ListGroup';
import { TimePicker } from '@/components/molecules/shared/TimePicker';
import { Switch } from '@/components/ui/switch';
import { formatTime } from '@/lib/date';

type DateTimeFieldContextValue = {
  start: Date; end?: Date; allDay: boolean; today?: Date;
  onStartChange?: (d: Date) => void; onEndChange?: (d: Date) => void; onAllDayChange?: (allDay: boolean) => void;
};
const DateTimeFieldContext = createContext<DateTimeFieldContextValue | null>(null);

function useDateTimeField(part: string) {
  const ctx = useContext(DateTimeFieldContext);
  if (!ctx) throw new Error(`DateTimeField.${part}는 <DateTimeField> 안에서 쓴다`);
  return ctx;
}

/** 날짜만 바꾸고 시각은 base 그대로 */
const withDate = (base: Date, d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), base.getHours(), base.getMinutes());
/** 시각('HH:mm')만 바꾸고 날짜는 base 그대로 */
const withTime = (base: Date, t: string) => { const [h, m] = t.split(':').map(Number); return new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m); };

/** '하루 종일' 스위치 행. 켜면 시각 칸이 빠진다 */
function AllDay() {
  const { allDay, onAllDayChange } = useDateTimeField('AllDay');
  return <ListRow title="하루 종일" trailing={<Switch checked={allDay} onCheckedChange={onAllDayChange} aria-label="하루 종일" />} />;
}

/** 이름 + 날짜(DatePicker) + 시각(TimePicker, 하루 종일이면 없음) 행. 값이 없으면 base(시작)의 날짜·시각에 맞춰 채운다 */
function Row({ icon, title, value, base, min, onChange }: { icon: IconName; title: string; value?: Date; base: Date; min?: Date; onChange?: (d: Date) => void }) {
  const { allDay, today } = useDateTimeField('Row');
  return (
    <ListRow icon={icon} title={title} className="py-1.5" trailing={<>
      <DatePicker value={value} min={min} today={today} label={`${title} 날짜`} onChange={(d) => onChange?.(withDate(value ?? base, d))} />
      {!allDay && <TimePicker value={value ? formatTime(value) : ''} label={`${title} 시간`} onChange={(t) => onChange?.(withTime(value ?? base, t))} />}
    </>} />
  );
}

/** 시작 행(달력 아이콘). 시작을 옮기면 끝도 같은 만큼 옮겨 길이를 지킨다(iOS 캘린더와 같다) */
function Start() {
  const { start, end, onStartChange, onEndChange } = useDateTimeField('Start');
  const change = (d: Date) => { onStartChange?.(d); if (end) onEndChange?.(new Date(end.getTime() + d.getTime() - start.getTime())); };
  return <Row icon="calendar" title="시작" value={start} base={start} onChange={change} />;
}

/** 끝 행(시계 아이콘). 시작 전 날은 고를 수 없다 */
function End() {
  const { start, end, onEndChange } = useDateTimeField('End');
  return <Row icon="clock" title="끝" value={end} base={start} min={start} onChange={onEndChange} />;
}

function DateTimeFieldRoot({ start, end, allDay = false, today, onStartChange, onEndChange, onAllDayChange, className, children }: {
  start: Date; end?: Date; allDay?: boolean; today?: Date;
  onStartChange?: (d: Date) => void; onEndChange?: (d: Date) => void; onAllDayChange?: (allDay: boolean) => void; className?: string; children?: ReactNode;
}) {
  return (
    <DateTimeFieldContext.Provider value={{ start, end, allDay, today, onStartChange, onEndChange, onAllDayChange }}>
      <ListGroup className={className}>{children ?? <><AllDay /><Start />{end && <End />}</>}</ListGroup>
    </DateTimeFieldContext.Provider>
  );
}

/**
 * 일정의 날짜 · 시각 입력(컴파운드, 시안 ㉙-c3 일정 입력 시트): AllDay(하루 종일 스위치) · Start(시작) · End(끝, end가 있을 때).
 * 행마다 날짜(DatePicker) + 시각(TimePicker)이고, 하루 종일을 켜면 시각 칸이 빠진다(값의 시각은 그대로 남는다). 시작을 옮기면 끝도 함께 옮긴다.
 * DatePicker · TimePicker 두 분자를 조합하므로 유기체다. 기본 조립은 `<DateTimeField start={s} end={e} allDay={a} … />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<DateTimeField start={s} end={e}><DateTimeField.Start /><DateTimeField.End /></DateTimeField>`
 */
export const DateTimeField = Object.assign(DateTimeFieldRoot, { AllDay, Start, End });
