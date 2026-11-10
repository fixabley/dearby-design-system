// 일정 반복 규칙의 값 모양과 순수 도우미(시안 ㉙-c6 · c7 · c8).
// 서버 계약이 아직 없어 시안의 낱말을 영문으로 옮긴 최소한이다. 계약이 생기면 맞춘다.
import { formatDate } from '@/lib/date';

export type RepeatFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';
export type Weekday = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
/** 몇째 주. `last`는 마지막 주 */
export type RepeatNth = 1 | 2 | 3 | 4 | 'last';
/** 매월 · 매년의 날: 날짜(`day`, 예 15일) 또는 n째 주 요일(`weekday`, 예 셋째 주 토요일) */
export type RepeatMonthly =
  | { by: 'day'; day: number }
  | { by: 'weekday'; nth: RepeatNth; weekday: Weekday };
export type RepeatEnd =
  | { type: 'never' }
  | { type: 'until'; date: Date }
  | { type: 'count'; count: number };

/**
 * 반복 규칙. 일정이 반복이 아니면 값은 `null`(안 함)이다.
 * `weekdays` · `monthly` · `month`가 없으면 일정의 시작 날짜와 같은 요일 · 날 · 달이다(`start`로 읽는다).
 */
export type RepeatRule = {
  frequency: RepeatFrequency;
  /** 몇 일 · 주 · 개월 · 년마다. 1이 매일 · 매주 · 매월 · 매년 */
  interval: number;
  weekdays?: Weekday[];
  monthly?: RepeatMonthly;
  /** 매년의 달(1~12) */
  month?: number;
  end: RepeatEnd;
  /** 건너뛸 날(날짜 단위) */
  skipDates: Date[];
};

/** 반복 메뉴의 고르기: 안 함 · 매일 · 매주 · 2주마다 · 매월 · 매년 · 사용자 지정 */
export type RepeatPreset =
  'none' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly' | 'custom';

export const REPEAT_PRESETS: { value: RepeatPreset; label: string }[] = [
  { value: 'none', label: '안 함' },
  { value: 'daily', label: '매일' },
  { value: 'weekly', label: '매주' },
  { value: 'biweekly', label: '2주마다' },
  { value: 'monthly', label: '매월' },
  { value: 'yearly', label: '매년' },
];

export const WEEKDAYS: Weekday[] = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
];
/** 요일 한 글자(요일 고르기 · 요약) */
export const WEEKDAY_SHORT: Record<Weekday, string> = {
  sun: '일',
  mon: '월',
  tue: '화',
  wed: '수',
  thu: '목',
  fri: '금',
  sat: '토',
};
export const FREQUENCY_LABEL: Record<RepeatFrequency, string> = {
  daily: '매일',
  weekly: '매주',
  monthly: '매월',
  yearly: '매년',
};
const UNIT: Record<RepeatFrequency, string> = {
  daily: '일',
  weekly: '주',
  monthly: '개월',
  yearly: '년',
};
export const NTH_LABEL: Record<RepeatNth, string> = {
  1: '첫째 주',
  2: '둘째 주',
  3: '셋째 주',
  4: '넷째 주',
  last: '마지막 주',
};

/** 날짜의 요일 */
export const weekdayOf = (d: Date): Weekday => WEEKDAYS[d.getDay()];

/** `1주마다` · `1개월마다` (간격 고르기의 글자) */
export const intervalLabel = (f: RepeatFrequency, n: number) =>
  `${n}${UNIT[f]}마다`;

/** 메뉴 항목에 해당하는 규칙. 요일 · 날 · 달은 비워 시작 날짜를 따른다 */
export function presetRule(
  preset: Exclude<RepeatPreset, 'none' | 'custom'>,
  keep?: Pick<RepeatRule, 'end' | 'skipDates'>,
): RepeatRule {
  const base = { end: { type: 'never' } as RepeatEnd, skipDates: [], ...keep };
  switch (preset) {
    case 'daily':
      return { frequency: 'daily', interval: 1, ...base };
    case 'weekly':
      return { frequency: 'weekly', interval: 1, ...base };
    case 'biweekly':
      return { frequency: 'weekly', interval: 2, ...base };
    case 'monthly':
      return { frequency: 'monthly', interval: 1, ...base };
    case 'yearly':
      return { frequency: 'yearly', interval: 1, ...base };
  }
}

/**
 * 규칙이 메뉴의 어느 항목에 해당하는지. 빈도와 간격만 본다:
 * 시안 ㉙-c6은 `매주 월·목`일 때도 메뉴의 체크가 `매주`에 있다. 해당하는 항목이 없으면 `custom`
 */
export function presetOf(rule: RepeatRule | null): RepeatPreset {
  if (!rule) return 'none';
  const { frequency, interval } = rule;
  if (interval === 1 && frequency === 'daily') return 'daily';
  if (interval === 1 && frequency === 'weekly') return 'weekly';
  if (interval === 2 && frequency === 'weekly') return 'biweekly';
  if (interval === 1 && frequency === 'monthly') return 'monthly';
  if (interval === 1 && frequency === 'yearly') return 'yearly';
  return 'custom';
}

/** 시작 날짜가 그 달의 몇째 주 요일인지(5째 주는 마지막 주로 본다) */
export function nthOf(d: Date): RepeatNth {
  const n = Math.ceil(d.getDate() / 7);
  return n >= 5 ? 'last' : (n as RepeatNth);
}

/** 매월 · 매년의 날을 규칙에서 읽는다. 없으면 시작 날짜의 날 */
export const monthlyOf = (rule: RepeatRule, start: Date): RepeatMonthly =>
  rule.monthly ?? { by: 'day', day: start.getDate() };

const monthlyText = (m: RepeatMonthly) =>
  m.by === 'day'
    ? `${m.day}일`
    : `${NTH_LABEL[m.nth]} ${WEEKDAY_SHORT[m.weekday]}요일`;

/** 반복 행의 값 글자: `매주 월·목` · `2주마다` · `매월 셋째 주 토요일` · `매년 3월 15일` */
export function formatRepeat(rule: RepeatRule): string {
  const head =
    rule.interval === 1
      ? FREQUENCY_LABEL[rule.frequency]
      : intervalLabel(rule.frequency, rule.interval);
  const parts: string[] = [];
  const days = rule.weekdays ?? [];
  if (rule.frequency === 'weekly' && days.length)
    parts.push(
      WEEKDAYS.filter((w) => days.includes(w))
        .map((w) => WEEKDAY_SHORT[w])
        .join('·'),
    );
  if (rule.frequency === 'yearly' && rule.month) parts.push(`${rule.month}월`);
  if (
    (rule.frequency === 'monthly' || rule.frequency === 'yearly') &&
    rule.monthly
  )
    parts.push(monthlyText(rule.monthly));
  return [head, ...parts].join(' ');
}

/** 건너뛸 날 행의 값 글자: `없음` · `11월 19일 (목)` · `11월 19일 (목) 외 2개`(날짜순 첫 날) */
export function formatSkipDates(dates: Date[], today?: Date): string {
  if (!dates.length) return '없음';
  const first = [...dates].sort((a, b) => a.getTime() - b.getTime())[0];
  const text = formatDate(first, today);
  return dates.length > 1 ? `${text} 외 ${dates.length - 1}개` : text;
}
