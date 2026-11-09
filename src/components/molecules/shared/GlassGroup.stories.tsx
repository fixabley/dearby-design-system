import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/Shared/GlassGroup',
  id: 'molecules-glassgroup',
  component: X.GlassGroup,
  args: { unread: 2, actions: [{ icon: 'share', label: '공유' }] },
  argTypes: { unread: { control: { type: 'number', min: 0, max: 99 } } },
  
  
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 설정 없이 화면 액션 | 알림 */
export const Composed: Story = { render: (args) => <X.GlassGroup unread={args.unread}><X.GlassGroup.Action icon="share" label="공유" /><X.GlassGroup.Separator /><X.GlassGroup.Notifications /></X.GlassGroup> };
