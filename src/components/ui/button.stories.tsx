import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'UI (shadcn)/Button',
  component: X.Button,
  args: { children: '신청하러 가기', variant: 'default', size: 'lg', block: false, disabled: false, onClick: fn() },
  argTypes: { variant: { control: "select", options: ["default", "mint", "outline", "ghost", "destructive", "glass"] }, size: { control: "inline-radio", options: ["lg", "default", "sm", "icon"] }, asChild: { table: { disable: true } } },
  
  
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};
export const Sizes: Story = { render: () => <div className="flex flex-col items-start gap-3">{(['default', 'mint', 'outline', 'ghost', 'destructive'] as const).map((v) => (
  <div key={v} className="flex items-center gap-3">{(['lg', 'default', 'sm'] as const).map((s) => <X.Button key={s} variant={v} size={s}>{v === 'destructive' ? '블록 지우기' : '후기 모두 보기'}</X.Button>)}
    <X.Button variant={v}><X.Icon name="calendarAdd" />캘린더 구독</X.Button></div>))}
  <div className="flex gap-2"><X.Button variant="glass" size="icon" aria-label="뒤로"><X.Icon name="back" /></X.Button><X.Button variant="glass" size="icon" aria-label="공유"><X.Icon name="share" /></X.Button></div></div> };
