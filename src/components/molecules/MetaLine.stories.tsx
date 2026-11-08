import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/MetaLine',
  component: X.MetaLine,
  args: { icon: 'calendar', label: '모집', value: '11월 9일 (월) 17:00 마감', dday: '', wrap: false },
  argTypes: { icon: { control: 'select', options: Object.keys(X.ICONS) } },
  
  parameters: { width: 300 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

