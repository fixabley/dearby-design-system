import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/WeeklyTimetable',
  component: X.WeeklyTimetable,
  args: { blocks: D.BLOCKS, hourHeight: 52, from: 10, to: 17, selected: 14, onSelect: fn() },
  argTypes: { hourHeight: { control: { type: 'range', min: 32, max: 80 } }, selected: { control: { type: 'number', min: 0 } } },
  render: controlled(X.WeeklyTimetable, 'selected', 'onSelect'),
  parameters: { width: 560 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

