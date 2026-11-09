import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/Activity/ActivityDetail',
  id: 'organisms-activitydetail',
  component: X.ActivityDetail,
  args: { d: D.SSAFY, inline: true },


  parameters: { width: 600 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 커버·날짜 없이 머리 · 행동 · 일정 */
export const Composed: Story = { render: (args) => <X.ActivityDetail d={args.d}><X.ActivityDetail.Header /><X.ActivityDetail.Actions /><X.ActivityDetail.Schedule /></X.ActivityDetail> };
