import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Atoms/shadcn/Avatar',
  id: 'ui-shadcn-avatar', // 예전 'UI (shadcn)' 링크가 그대로 열리도록 고정
  tags: ['shadcn'],
  component: X.Avatar,
  args: { fallback: '김', size: 'md', src: '' },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['mark', 'dot', 'xs', 'sm', 'md', 'lg'],
    },
    src: {
      control: 'select',
      options: [
        '',
        'img/logo-13.png',
        'img/logo-22.png',
        'img/logo-pytorch.png',
      ],
    },
  },
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
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <X.Avatar size="mark" fallback="현" />
      <X.Avatar size="dot" fallback="김" />
      <X.Avatar size="xs" fallback="김" />
      <X.Avatar size="sm" fallback="김" />
      <X.Avatar size="md" fallback="김" />
      <X.Avatar size="lg" fallback="김" />
      <X.Avatar size="sm" src="img/logo-13.png" fallback="S" />
    </div>
  ),
};
