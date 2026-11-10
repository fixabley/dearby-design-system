import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { toDate } from '@/stories/date';

const START = toDate('2026-11-16T20:00');

const WEEKLY: X.RepeatRule = {
  frequency: 'weekly',
  interval: 1,
  weekdays: ['mon', 'thu'],
  end: { type: 'never' },
  skipDates: [],
};

const meta: Meta = {
  title: 'Organisms/Schedule/RepeatCustom',
  id: 'organisms-repeatcustom',
  component: X.RepeatCustom,
  args: { onBack: fn(), onDone: fn() },
};
export default meta;
type Story = StoryObj<typeof meta>;

function Demo({ initial }: { initial: X.RepeatRule }) {
  const [rule, setRule] = useState(initial);
  return (
    <X.Sheet open modal={false}>
      <X.SheetContent floating>
        <X.RepeatCustom value={rule} start={START} onChange={setRule} />
      </X.SheetContent>
    </X.Sheet>
  );
}

/** ㉙-c7: 매주 · 간격 1주마다 · 월 · 목. 빈도를 바꾸면 그 빈도의 칸으로 바뀐다 */
export const Weekly: Story = { render: () => <Demo initial={WEEKLY} /> };

/** ㉙-c8: 매월 날짜(예 15일) */
export const MonthlyDay: Story = {
  render: () => (
    <Demo
      initial={{
        ...WEEKLY,
        frequency: 'monthly',
        weekdays: undefined,
        monthly: { by: 'day', day: 15 },
      }}
    />
  ),
};

/** ㉙-c8: 매월 n째 주 요일(셋째 주 토요일) */
export const MonthlyWeekday: Story = {
  render: () => (
    <Demo
      initial={{
        ...WEEKLY,
        frequency: 'monthly',
        weekdays: undefined,
        monthly: { by: 'weekday', nth: 3, weekday: 'sat' },
      }}
    />
  ),
};

/** ㉙-c8 설명: 매년이면 월 선택이 더해진다 */
export const Yearly: Story = {
  render: () => (
    <Demo
      initial={{
        ...WEEKLY,
        frequency: 'yearly',
        weekdays: undefined,
        month: 3,
        monthly: { by: 'day', day: 15 },
      }}
    />
  ),
};

/** 바텀 시트(좁은 화면) */
export const Bottom: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => {
    function Page() {
      const [rule, setRule] = useState(WEEKLY);
      return (
        <X.Sheet open modal={false}>
          <X.SheetContent>
            <X.RepeatCustom value={rule} start={START} onChange={setRule} />
          </X.SheetContent>
        </X.Sheet>
      );
    }
    return <Page />;
  },
};
