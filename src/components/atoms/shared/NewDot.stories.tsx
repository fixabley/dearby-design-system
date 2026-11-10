import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Atoms/Shared/NewDot',
  id: 'atoms-newdot',
  component: X.NewDot,
  args: { size: 'md', label: '새 모집 있음' },
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

/** 크기: 팔로우 카드 md(8), 접히는 섹션 머리 sm(7) */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <X.NewDot size="md" />
      <X.NewDot size="sm" />
    </div>
  ),
};
