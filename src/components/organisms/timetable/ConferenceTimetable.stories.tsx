import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/Timetable/ConferenceTimetable',
  id: 'organisms-conferencetimetable',
  component: X.ConferenceTimetable,
  args: {
    tracks: D.TRACKS,
    slots: D.SLOTS,
    view: 'all',
    onSavedChange: fn(),
    onViewAll: fn(),
  },
  argTypes: { view: { control: 'inline-radio', options: ['all', 'mine'] } },
  render: function Render(args) {
    const [, update] = useArgs();
    return (
      <X.ConferenceTimetable
        {...(args as ComponentProps<typeof X.ConferenceTimetable>)}
        onViewAll={() => {
          args.onViewAll?.();
          update({ view: 'all' });
        }}
      />
    );
  },
  parameters: { width: 1000 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs;
void fn;
void controlled;
void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 내 시간표: 찜한 세션만 시간순 한 열. 하트를 끄면 바로 빠진다 */
export const Mine: Story = { args: { view: 'mine' } };

/** 컴파운드로 바꿔 조립: 내 시간표와 전체를 나란히. 찜 상태를 함께 써서 전체에서 하트를 누르면 왼쪽에 바로 담긴다 */
export const Composed: Story = {
  render: (args) => (
    <X.ConferenceTimetable
      tracks={args.tracks}
      slots={args.slots}
      onSavedChange={args.onSavedChange}
    >
      <div className="grid grid-cols-[300px_minmax(0,1fr)] items-start gap-6">
        <X.ConferenceTimetable.Mine />
        <X.ConferenceTimetable.All />
      </div>
    </X.ConferenceTimetable>
  ),
};
