import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { toDate } from '@/stories/date';

const meta: Meta = {
  title: 'Organisms/Schedule/SkipDates',
  id: 'organisms-skipdates',
  component: X.SkipDates,
  args: { onBack: fn(), onDone: fn() },
};
export default meta;
type Story = StoryObj<typeof meta>;

function Demo({ initial }: { initial: Date[] }) {
  const [dates, setDates] = useState(initial);
  return (
    <X.Sheet open modal={false}>
      <X.SheetContent floating>
        <X.SkipDates
          value={dates}
          onChange={setDates}
          min={toDate('2026-11-16')}
          max={toDate('2026-11-30')}
          today={toDate('2026-11-03')}
        />
      </X.SheetContent>
    </X.Sheet>
  );
}

/** ㉙-c6의 건너뛸 날: 11월 19일 (목) 하나. `날짜 추가`로 더하고 줄 끝 X로 지운다 */
export const Playground: Story = {
  render: () => <Demo initial={[toDate('2026-11-19')]} />,
};

/** 아직 고른 날이 없다 */
export const Empty: Story = { render: () => <Demo initial={[]} /> };
