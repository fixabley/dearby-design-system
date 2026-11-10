import { createContext, useContext, type ReactNode } from 'react';
import { Text } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { DatePicker } from '@/components/molecules/shared/DatePicker';
import { ListGroup, ListRow } from '@/components/molecules/shared/ListGroup';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { PickerRow } from '@/components/organisms/shared/PickerRow';
import {
  REPEAT_PRESETS,
  formatRepeat,
  formatSkipDates,
  presetOf,
  presetRule,
  type RepeatEnd,
  type RepeatPreset,
  type RepeatRule,
} from './repeat';

type RepeatFieldContextValue = {
  value: RepeatRule | null;
  start: Date;
  today?: Date;
  onChange?: (rule: RepeatRule | null) => void;
  onCustomize?: () => void;
  onEditSkipDates?: () => void;
};
const RepeatFieldContext = createContext<RepeatFieldContextValue | null>(null);

function useRepeatField(part: string) {
  const ctx = useContext(RepeatFieldContext);
  if (!ctx) throw new Error(`RepeatField.${part}는 <RepeatField> 안에서 쓴다`);
  return ctx;
}

const END_OPTIONS = [
  { value: 'never', label: '안 함' },
  { value: 'until', label: '날짜까지' },
  { value: 'count', label: 'n회 뒤' },
];
const COUNT_OPTIONS = Array.from({ length: 99 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1}회`,
}));
/** 종료 날짜를 처음 고를 때, 횟수를 처음 고를 때의 값 */
const DEFAULT_COUNT = 5;

/**
 * 반복 행: 누르면 메뉴(안 함 · 매일 · 매주 · 2주마다 · 매월 · 매년 + 구분선 + 사용자 지정).
 * 행 전체가 메뉴 버튼이고 값 칸에는 규칙 요약(`매주 월·목`)이 보인다. 사용자 지정은 값이 아니라 동작이라 고를 때마다 `onCustomize`를 부른다.
 */
function Repeat({ className }: { className?: string }) {
  const { value, onChange, onCustomize } = useRepeatField('Repeat');
  const preset = presetOf(value);
  const text = value ? formatRepeat(value) : '안 함';
  return (
    <ListRow
      icon="repeat"
      title="반복"
      className={cn('relative', className)}
      trailing={
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={`반복, ${text}`}
            className="pressable absolute inset-0 flex items-center justify-end gap-1.5 px-4 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          >
            <Text as="span" variant="body" tone="muted" truncate>
              {text}
            </Text>
            <Icon
              name="chevronUpDown"
              className="size-4 shrink-0 text-muted-foreground"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[200px]">
            <DropdownMenuRadioGroup
              value={preset}
              onValueChange={(v) => {
                const p = v as RepeatPreset;
                if (p === 'none') onChange?.(null);
                else if (p !== 'custom')
                  onChange?.(
                    presetRule(
                      p,
                      value
                        ? { end: value.end, skipDates: value.skipDates }
                        : undefined,
                    ),
                  );
              }}
            >
              {REPEAT_PRESETS.map((p) => (
                <DropdownMenuRadioItem key={p.value} value={p.value}>
                  {p.label}
                </DropdownMenuRadioItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuRadioItem value="custom" onSelect={onCustomize}>
                사용자 지정
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    />
  );
}

/**
 * 반복 종료 행(반복일 때만): 안 함 · 날짜까지 · n회 뒤. 값 칸에는 고른 종류가 보이고(`안 함` · `날짜까지` · `n회 뒤`),
 * 날짜까지는 날짜 고르기 행(기존 `DatePicker`), n회 뒤는 횟수 고르기 행이 아래에 더해진다
 */
function End() {
  const { value, start, today, onChange } = useRepeatField('End');
  if (!value) return null;
  const { end } = value;
  const setEnd = (e: RepeatEnd) => onChange?.({ ...value, end: e });
  return (
    <>
      <PickerRow
        icon="calendar"
        title="반복 종료"
        value={end.type}
        options={END_OPTIONS}
        onValueChange={(v) =>
          setEnd(
            v === 'until'
              ? { type: 'until', date: start }
              : v === 'count'
                ? { type: 'count', count: DEFAULT_COUNT }
                : { type: 'never' },
          )
        }
      />
      {end.type === 'until' && (
        <ListRow
          title="종료 날짜"
          className="py-1.5"
          trailing={
            <DatePicker
              value={end.date}
              min={start}
              today={today}
              label="반복 종료 날짜"
              onChange={(date) => setEnd({ type: 'until', date })}
            />
          }
        />
      )}
      {end.type === 'count' && (
        <PickerRow
          title="횟수"
          value={String(end.count)}
          options={COUNT_OPTIONS}
          onValueChange={(v) => setEnd({ type: 'count', count: Number(v) })}
        />
      )}
    </>
  );
}

/** 건너뛸 날 행(반복일 때만): 값 칸에 첫 날(`11월 19일 (목)`)과 개수, 누르면 `onEditSkipDates`로 `SkipDates` 화면으로 간다 */
function Skip() {
  const { value, today, onEditSkipDates } = useRepeatField('Skip');
  if (!value) return null;
  return (
    <ListRow
      icon="close"
      title="건너뛸 날"
      onClick={onEditSkipDates}
      trailing={
        <>
          <Text
            as="span"
            variant="body"
            tone="muted"
            truncate
            className="max-w-44"
          >
            {formatSkipDates(value.skipDates, today)}
          </Text>
          <Icon name="chevronRight" className="size-4" />
        </>
      }
    />
  );
}

function RepeatFieldRoot({
  value,
  start,
  today,
  onChange,
  onCustomize,
  onEditSkipDates,
  className,
  children,
}: {
  /** 반복 규칙. `null`이면 반복 안 함 */
  value: RepeatRule | null;
  /** 일정의 시작 날짜: 요일 · 날 · 달을 정하지 않은 규칙이 따르고, 종료 날짜는 이 날 이후만 고른다 */
  start: Date;
  /** 기준일: 연도를 붙일지와 달력의 오늘 표시 */
  today?: Date;
  onChange?: (rule: RepeatRule | null) => void;
  /** 메뉴의 사용자 지정을 골랐을 때: 쓰는 쪽이 `RepeatCustom` 화면으로 간다 */
  onCustomize?: () => void;
  /** 건너뛸 날 행을 눌렀을 때: 쓰는 쪽이 `SkipDates` 화면으로 간다 */
  onEditSkipDates?: () => void;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <RepeatFieldContext.Provider
      value={{ value, start, today, onChange, onCustomize, onEditSkipDates }}
    >
      <ListGroup className={className}>
        {children ?? (
          <>
            <Repeat />
            <End />
            <Skip />
          </>
        )}
      </ListGroup>
    </RepeatFieldContext.Provider>
  );
}

/**
 * 일정의 반복 입력(컴파운드, 시안 ㉙-c6 일정 입력: 반복): Repeat(반복 메뉴) · End(반복 종료) · Skip(건너뛸 날).
 * 반복 종료와 건너뛸 날은 반복일 때만 보인다. 값은 쓰는 쪽이 갖는 제어형이고, 사용자 지정 화면(`RepeatCustom`)과 건너뛸 날 화면(`SkipDates`)으로 옮기는 일도 쓰는 쪽 몫이다.
 * 기본 조립은 `<RepeatField value={rule} start={start} onChange={setRule} onCustomize={…} onEditSkipDates={…} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<RepeatField value={rule} start={start}><RepeatField.Repeat /><RepeatField.End /></RepeatField>`
 */
export const RepeatField = Object.assign(RepeatFieldRoot, {
  Repeat,
  End,
  Skip,
});
