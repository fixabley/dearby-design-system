import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/ServerPicker',
  component: X.ServerPicker,
  args: { servers: D.SERVERS, value: D.SERVERS[0].name, onChange: fn() },
  
  render: controlled(X.ServerPicker, 'value', 'onChange'),
  parameters: { width: 420 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 초대 줄 없이 서버만 */
export const Composed: Story = { render: function Render(args: Record<string, any>) { const [, update] = useArgs(); return <X.ServerPicker servers={args.servers} value={args.value} onChange={(v) => { args.onChange?.(v); update({ value: v }); }}>{(args.servers as { name: string; sub: string }[]).map((s) => <X.ServerPicker.Server key={s.name} server={s} />)}</X.ServerPicker>; } };
