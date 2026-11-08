import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/Timetable/WeeklyTimetable',
  id: 'organisms-weeklytimetable',
  component: X.WeeklyTimetable,
  args: { blocks: D.BLOCKS, hourHeight: 52, from: 10, to: 17, mode: 'view', selected: 14, onSelect: fn() },
  argTypes: { mode: { control: 'inline-radio', options: ['view', 'edit'] }, hourHeight: { control: { type: 'range', min: 32, max: 80 } }, selected: { control: { type: 'number', min: 0 }, if: { arg: 'mode', eq: 'edit' } } },
  render: controlled(X.WeeklyTimetable, 'selected', 'onSelect'),
  parameters: { width: 560 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};


/** 개설자 편집: 모든 블록을 골라 BlockEditor로 고친다 */
export const Edit: Story = { args: { mode: 'edit' } };

/** 컴파운드로 바꿔 조립: 쉬는 시간 블록을 뺀 시간표 */
export const Composed: Story = { render: (args: Record<string, any>) => <X.WeeklyTimetable {...(args as any)}><X.WeeklyTimetable.Days /><X.WeeklyTimetable.Grid>{(args.blocks as X.Block[]).map((b, i) => b.shape !== 'rest' && <X.WeeklyTimetable.Block key={i} index={i} />)}</X.WeeklyTimetable.Grid><X.WeeklyTimetable.Detail /></X.WeeklyTimetable> };
