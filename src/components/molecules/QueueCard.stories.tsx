import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/QueueCard',
  component: X.QueueCard,
  args: { covers: ['img/cover-22.jpg', 'img/cover-13.jpg', 'img/cover-42.jpg'], title: '오늘의 맞춤 대기열', sub: '프로그램 7개 중 3개 봤어요', onClick: fn() },
  
  
  parameters: { width: 393 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

