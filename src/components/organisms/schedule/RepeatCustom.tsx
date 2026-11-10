import { createContext, useContext, type ReactNode } from 'react';
import { Text } from '@/components/atoms/shared/Text';
import { ListGroup } from '@/components/molecules/shared/ListGroup';
import { Segmented } from '@/components/molecules/shared/Segmented';
import { WeekdayPicker } from '@/components/molecules/timetable/WeekdayPicker';
import { PageHeader } from './PageHeader';
import { PickerRow } from '@/components/organisms/shared/PickerRow';
import {
  FREQUENCY_LABEL,
  NTH_LABEL,
  WEEKDAYS,
  WEEKDAY_SHORT,
  intervalLabel,
  monthlyOf,
  nthOf,
  weekdayOf,
  type RepeatFrequency,
  type RepeatMonthly,
  type RepeatRule,
  type Weekday,
} from './repeat';

type RepeatCustomContextValue = {
  value: RepeatRule;
  start: Date;
  onChange?: (rule: RepeatRule) => void;
  onBack?: () => void;
  onDone?: () => void;
  autoFocus?: boolean;
  backLabel: string;
};
const RepeatCustomContext = createContext<RepeatCustomContextValue | null>(
  null,
);

function useRepeatCustom(part: string) {
  const ctx = useContext(RepeatCustomContext);
  if (!ctx)
    throw new Error(`RepeatCustom.${part}는 <RepeatCustom> 안에서 쓴다`);
  return ctx;
}

const FREQUENCIES = Object.keys(FREQUENCY_LABEL) as RepeatFrequency[];
const FREQUENCY_OPTIONS = FREQUENCIES.map((f) => ({
  value: f,
  label: FREQUENCY_LABEL[f],
}));
/** 간격은 1~30까지 고른다(이미 더 큰 값이면 그 값도 목록에 둔다) */
const MAX_INTERVAL = 30;
const NTH_OPTIONS = ([1, 2, 3, 4, 'last'] as const).map((n) => ({
  value: String(n),
  label: NTH_LABEL[n],
}));
const WEEKDAY_OPTIONS = WEEKDAYS.map((w) => ({
  value: w,
  label: `${WEEKDAY_SHORT[w]}요일`,
}));
const DAY_OPTIONS = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1}일`,
}));
const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1}월`,
}));

/** 머리: 뒤로(이전 화면 이름) · 제목 `사용자 지정` · 완료 */
function Header({ className }: { className?: string }) {
  const { onBack, onDone, autoFocus, backLabel } = useRepeatCustom('Header');
  return (
    <PageHeader
      title="사용자 지정"
      backLabel={backLabel}
      onBack={onBack}
      onDone={onDone}
      autoFocus={autoFocus}
      className={className}
    />
  );
}

/** 빈도(매일 · 매주 · 매월 · 매년)와 간격(n일 · n주 · n개월 · n년마다). 빈도를 바꾸면 요일 · 날 · 달은 시작 날짜를 따르도록 비운다 */
function Basics({ className }: { className?: string }) {
  const { value, onChange } = useRepeatCustom('Basics');
  const max = Math.max(MAX_INTERVAL, value.interval);
  return (
    <ListGroup className={className}>
      <PickerRow
        icon="calendarGrid"
        title="빈도"
        value={value.frequency}
        options={FREQUENCY_OPTIONS}
        onValueChange={(f) =>
          onChange?.({
            frequency: f as RepeatFrequency,
            interval: value.interval,
            end: value.end,
            skipDates: value.skipDates,
          })
        }
      />
      <PickerRow
        icon="repeat"
        title="간격"
        value={String(value.interval)}
        options={Array.from({ length: max }, (_, i) => ({
          value: String(i + 1),
          label: intervalLabel(value.frequency, i + 1),
        }))}
        onValueChange={(n) => onChange?.({ ...value, interval: Number(n) })}
      />
    </ListGroup>
  );
}

/** 매주의 요일 다중 선택(기존 `WeekdayPicker`). 하나는 남겨야 해서 마지막 하나는 끌 수 없다 */
function Weekdays({ className }: { className?: string }) {
  const { value, start, onChange } = useRepeatCustom('Weekdays');
  const days = value.weekdays ?? [weekdayOf(start)];
  return (
    <section className={className}>
      <Text as="h4" variant="caption" tone="muted" className="mb-1.5 mt-5 px-4">
        요일
      </Text>
      <div className="px-4 py-3.5">
        <WeekdayPicker
          value={days.map((w) => WEEKDAY_SHORT[w])}
          onChange={(v) => {
            const next = WEEKDAYS.filter((w) => v.includes(WEEKDAY_SHORT[w]));
            if (next.length) onChange?.({ ...value, weekdays: next });
          }}
        />
      </div>
    </section>
  );
}

/**
 * 매월 · 매년의 날 고르기: 날짜(예 15일) | n째 주 요일(예 셋째 주 토요일) 분할 전환과 그 아래 행들.
 * 매년이면 `월` 행이 위에 더해진다. 전환하면 시작 날짜의 날 · 몇째 주 요일로 시작한다
 */
function Monthly({ className }: { className?: string }) {
  const { value, start, onChange } = useRepeatCustom('Monthly');
  const monthly = monthlyOf(value, start);
  const set = (m: RepeatMonthly) => onChange?.({ ...value, monthly: m });
  return (
    <div className={className}>
      {value.frequency === 'yearly' && (
        <ListGroup>
          <PickerRow
            icon="calendar"
            title="월"
            value={String(value.month ?? start.getMonth() + 1)}
            options={MONTH_OPTIONS}
            onValueChange={(m) => onChange?.({ ...value, month: Number(m) })}
          />
        </ListGroup>
      )}
      <Segmented
        items={['day', 'weekday'] as const}
        labels={{ day: '날짜', weekday: 'n째 주 요일' }}
        value={monthly.by}
        label="날짜 정하는 방법"
        className="mt-3.5"
        onChange={(by) =>
          set(
            by === 'day'
              ? { by: 'day', day: start.getDate() }
              : { by: 'weekday', nth: nthOf(start), weekday: weekdayOf(start) },
          )
        }
      />
      <ListGroup className="mt-3">
        {monthly.by === 'day' ? (
          <PickerRow
            icon="calendar"
            title="날짜"
            value={String(monthly.day)}
            options={DAY_OPTIONS}
            onValueChange={(d) => set({ by: 'day', day: Number(d) })}
          />
        ) : (
          <>
            <PickerRow
              icon="calendar"
              title="몇째 주"
              value={String(monthly.nth)}
              options={NTH_OPTIONS}
              onValueChange={(n) =>
                set({
                  ...monthly,
                  nth: (n === 'last' ? n : Number(n)) as typeof monthly.nth,
                })
              }
            />
            <PickerRow
              icon="calendar"
              title="요일"
              value={monthly.weekday}
              options={WEEKDAY_OPTIONS}
              onValueChange={(w) => set({ ...monthly, weekday: w as Weekday })}
            />
          </>
        )}
      </ListGroup>
    </div>
  );
}

function RepeatCustomRoot({
  value,
  start,
  onChange,
  onBack,
  onDone,
  autoFocus,
  backLabel = '반복',
  className,
  children,
}: {
  value: RepeatRule;
  /** 일정의 시작 날짜: 비워 둔 요일 · 날 · 달이 따른다 */
  start: Date;
  onChange?: (rule: RepeatRule) => void;
  /** 뒤로(이전 화면 이름이 `backLabel`) */
  onBack?: () => void;
  onDone?: () => void;
  /** 화면을 옮긴 직후 초점을 뒤로 버튼에 둔다 */
  autoFocus?: boolean;
  backLabel?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <RepeatCustomContext.Provider
      value={{ value, start, onChange, onBack, onDone, autoFocus, backLabel }}
    >
      <div className={className}>
        {children ?? (
          <>
            <Header />
            <Basics className="mt-3.5" />
            {value.frequency === 'weekly' && <Weekdays />}
            {(value.frequency === 'monthly' ||
              value.frequency === 'yearly') && <Monthly className="mt-3.5" />}
          </>
        )}
      </div>
    </RepeatCustomContext.Provider>
  );
}

/**
 * 반복 사용자 지정 화면(컴파운드, 시안 ㉙-c7 매주 · ㉙-c8 매월): Header(뒤로 · 제목 · 완료) · Basics(빈도 · 간격) · Weekdays(매주의 요일 다중 선택) · Monthly(매월 · 매년의 날짜 | n째 주 요일, 매년은 월 행 추가).
 * 시트(`SheetContent`) 안의 한 화면이라 `RepeatField`의 사용자 지정 메뉴를 고르면 쓰는 쪽이 이 화면으로 바꿔 보여 준다. 값은 쓰는 쪽이 갖는 제어형이다.
 * 기본 조립은 빈도에 맞는 칸만 보인다: `<RepeatCustom value={rule} start={start} onChange={setRule} onBack={…} onDone={…} />`
 */
export const RepeatCustom = Object.assign(RepeatCustomRoot, {
  Header,
  Basics,
  Weekdays,
  Monthly,
});
