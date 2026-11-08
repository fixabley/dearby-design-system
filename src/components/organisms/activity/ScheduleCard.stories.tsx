import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/Activity/ScheduleCard',
  id: 'organisms-schedulecard',
  component: X.ScheduleCard,
  args: { groups: D.SSAFY.schedule, note: D.SSAFY.note },
  
  
  parameters: { width: 480 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 제목을 바꾸고 안내 없이 */
export const Composed: Story = { render: (args: Record<string, any>) => <X.ScheduleCard groups={args.groups} note={args.note}><X.ScheduleCard.Title>선발 일정</X.ScheduleCard.Title><X.ScheduleCard.Timeline /></X.ScheduleCard> };
