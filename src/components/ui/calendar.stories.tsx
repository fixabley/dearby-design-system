import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import { content, event, look, state } from '@/stories/argTypes';

// Controls에서 고칠 수 있게 날짜는 'YYYY-MM-DD' 글자로 둔다
const toDate = (s?: string) => { if (!s) return undefined; const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d ?? 1); };
const toIso = (d?: Date) => (d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` : '');

const meta: Meta = {
  title: 'Molecules/Calendar',
  id: 'ui-shadcn-calendar',
  tags: ['shadcn'],
  component: X.Calendar,
  args: {
    selected: '2026-11-08', dates: [], range: { from: '', to: '' }, mode: 'single', showOutsideDays: true, numberOfMonths: 1,
    month: '2026-11-01', today: '2026-11-03', enabledDates: [], onSelect: fn(), onMonthChange: fn(),
  },
  argTypes: {
    selected: content('mode single: 고른 날'),
    dates: content('mode multiple: 고른 날들'),
    range: content('mode range: 기간(from · to)'),
    mode: { control: 'inline-radio', options: ['single', 'multiple', 'range'], ...look('single 하루 · multiple 여러 날(건너뛸 날) · range 기간') },
    showOutsideDays: look('앞뒤 달 날짜를 흐리게 보인다'),
    numberOfMonths: { control: { type: 'range', min: 1, max: 2 }, ...look('나란히 보이는 달 수') },
    month: state('보이는 달(이전·다음으로 바뀐다)'),
    today: state('오늘 표시(시안 기준일 11월 3일)'),
    enabledDates: state('이 날만 고를 수 있다(비우면 모두)'),
    onSelect: event(),
    onMonthChange: event(),
  },
  render: function Render({ mode, selected, dates, range, month, today, enabledDates, onSelect, onMonthChange, ...args }: Record<string, any>) {
    const [, update] = useArgs();
    const only = enabledDates as string[];
    const common = {
      ...args,
      month: toDate(month),
      onMonthChange: (m: Date) => { onMonthChange?.(m); update({ month: toIso(m) }); },
      today: toDate(today),
      disabled: only.length ? (d: Date) => !only.includes(toIso(d)) : undefined,
    };
    if (mode === 'multiple') {
      return <X.Calendar {...common} mode="multiple" selected={(dates as string[]).map((s) => toDate(s)!)} onSelect={(v) => { onSelect?.(v); update({ dates: (v ?? []).map(toIso) }); }} className="rounded-lg bg-card shadow-control" />;
    }
    if (mode === 'range') {
      return <X.Calendar {...common} mode="range" selected={{ from: toDate(range.from), to: toDate(range.to) }} onSelect={(v) => { onSelect?.(v); update({ range: { from: toIso(v?.from), to: toIso(v?.to) } }); }} className="rounded-lg bg-card shadow-control" />;
    }
    return <X.Calendar {...common} mode="single" selected={toDate(selected)} onSelect={(v) => { onSelect?.(v); update({ selected: toIso(v) }); }} className="rounded-lg bg-card shadow-control" />;
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다(⑧-0b 날짜 피커: 11월 8일을 고른 상태) */
export const Playground: Story = {};

/** ㉙-c6 건너뛸 날: 매주 월·목 반복(11월 16일 ~ 30일) 중 고를 날만 열고, 11월 19일 (목)을 고른 상태 */
export const SkipDates: Story = {
  args: { mode: 'multiple', dates: ['2026-11-19'], enabledDates: ['2026-11-16', '2026-11-19', '2026-11-23', '2026-11-26', '2026-11-30'] },
};

/** 기간: 반복 기간 11월 16일 (월)부터 11월 30일 (월)까지 */
export const Range: Story = {
  args: { mode: 'range', range: { from: '2026-11-16', to: '2026-11-30' } },
};
