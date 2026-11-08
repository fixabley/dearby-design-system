import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Atoms/Switch',
  id: 'ui-shadcn-switch',  // 예전 'UI (shadcn)' 링크가 그대로 열리도록 고정
  tags: ['shadcn'],
  component: X.Switch,
  args: { checked: true, disabled: false, 'aria-label': '알림', onCheckedChange: fn() },
  
  render: controlled(X.Switch, 'checked', 'onCheckedChange'),
  
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

