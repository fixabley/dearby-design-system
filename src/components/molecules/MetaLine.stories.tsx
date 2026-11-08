import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';
import { content, event, iconArgType, look, state } from '@/stories/argTypes';

const meta: Meta = {
  title: 'Molecules/MetaLine',
  component: X.MetaLine,
  args: { icon: 'calendar', label: '모집', value: '11월 9일 (월) 17:00 마감', dday: '', wrap: false },
  argTypes: { label: content('굵은 라벨'), value: content('값. 날짜는 M월 d일 (요일) HH:mm'), dday: content('있으면 값 대신 D-day'), icon: iconArgType(false, '맨 앞 아이콘'), wrap: look('길면 줄바꿈(끄면 말줄임)') },
  
  parameters: { width: 300 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

