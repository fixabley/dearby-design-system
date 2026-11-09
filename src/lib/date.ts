// 날짜·시각 표기(시안 날짜 규칙): 날짜는 'M월 d일 (요일)', 연도는 기준일과 해가 다를 때만 앞에 'yyyy년', 실제 시각만 'HH:mm'.
// '오늘' 같은 상대 표기는 만들지 않는다. 날짜는 모두 기기 시간대로 읽는다.
const WEEKDAYS = '일월화수목금토';
const pad = (n: number) => String(n).padStart(2, '0');

/** 같은 날인지 비교하고 정렬하는 키 'YYYY-MM-DD' */
export function dayKey(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** dayKey를 그날 0시로 */
export function fromDayKey(key: string) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** 'M월 d일'. 기준일(today)과 해가 다르면 앞에 'yyyy년' */
export function formatDay(d: Date, today: Date = new Date()) {
  const md = `${d.getMonth() + 1}월 ${d.getDate()}일`;
  return d.getFullYear() === today.getFullYear()
    ? md
    : `${d.getFullYear()}년 ${md}`;
}

/** 'M월 d일 (요일)'. 연도 규칙은 formatDay와 같다 */
export function formatDate(d: Date, today?: Date) {
  return `${formatDay(d, today)} (${WEEKDAYS[d.getDay()]})`;
}

/** '월요일' */
export function weekdayName(d: Date) {
  return `${WEEKDAYS[d.getDay()]}요일`;
}

/** 'HH:mm'(24시간) */
export function formatTime(d: Date) {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * 직접 입력한 시각을 'HH:mm'으로 맞춘다. 맞지 않으면 null.
 * '9' → 09:00, '930' → 09:30, '2130' → 21:30, '9:5' → 09:05
 */
export function parseTime(text: string): string | null {
  const t = text.trim();
  const m =
    /^(\d{1,2}):(\d{1,2})$/.exec(t) ??
    /^(\d{1,2})()$/.exec(t) ??
    /^(\d{1,2})(\d{2})$/.exec(t);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2] || 0);
  return h < 24 && min < 60 ? `${pad(h)}:${pad(min)}` : null;
}
