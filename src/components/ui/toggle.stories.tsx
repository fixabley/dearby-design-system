import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';
import { iconArgType } from '@/stories/argTypes';

const meta: Meta = {
  title: 'Atoms/Toggle',
  id: 'ui-shadcn-toggle',  // 예전 'UI (shadcn)' 링크가 그대로 열리도록 고정
  tags: ['shadcn'],
  component: X.Toggle,
  args: { children: '부트캠프', icon: 'none', variant: 'chip', pressed: true, disabled: false, onPressedChange: fn() },
  argTypes: { icon: iconArgType(), variant: { control: 'select', options: ['chip', 'tile', 'tileMint', 'icon', 'live', 'follow'] } },
  
  render: controlled(X.Toggle, 'pressed', 'onPressedChange'),
  
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

