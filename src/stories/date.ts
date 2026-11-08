// Controls에서 고칠 수 있게 날짜는 글자로 둔다: 'YYYY-MM-DD' · 'YYYY-MM-DDTHH:mm'(기기 시간대)
import { dayKey, formatTime } from '@/lib/date';

export function toDate(s: string): Date;
export function toDate(s?: string): Date | undefined;
export function toDate(s?: string) {
  if (!s) return undefined;
  const [d, t = '00:00'] = s.split('T');
  const [y, m, day] = d.split('-').map(Number);
  const [h, min] = t.split(':').map(Number);
  return new Date(y, m - 1, day ?? 1, h, min);
}

/** 'YYYY-MM-DD' */
export const toIso = (d?: Date) => (d ? dayKey(d) : '');

/** 'YYYY-MM-DDTHH:mm' */
export const toIsoTime = (d?: Date) => (d ? `${dayKey(d)}T${formatTime(d)}` : '');
