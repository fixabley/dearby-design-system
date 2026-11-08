import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/ConferenceTimetable',
  component: X.ConferenceTimetable,
  args: { tracks: D.TRACKS, slots: D.SLOTS, view: 'all', onSavedChange: fn(), onViewAll: fn() },
  argTypes: { view: { control: 'inline-radio', options: ['all', 'mine'] } },
  render: function Render(args: Record<string, any>) { const [, update] = useArgs(); return <X.ConferenceTimetable {...(args as any)} onViewAll={() => { args.onViewAll?.(); update({ view: 'all' }); }} />; },
  parameters: { width: 1000 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};


/** 내 시간표: 찜한 세션만 시간순 한 열. 하트를 끄면 바로 빠진다 */
export const Mine: Story = { args: { view: 'mine' } };
