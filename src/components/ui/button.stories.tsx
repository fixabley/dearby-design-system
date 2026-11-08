import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';
import { iconArgType } from '@/stories/argTypes';

const meta: Meta = {
  title: 'Atoms/Button',
  id: 'ui-shadcn-button',  // 예전 'UI (shadcn)' 링크가 그대로 열리도록 고정
  tags: ['shadcn'],
  component: X.Button,
  args: { children: '캘린더 구독', icon: 'calendarAdd', variant: 'default', size: 'lg', block: false, disabled: false, onClick: fn() },
  argTypes: { variant: { control: "select", options: ["default", "mint", "outline", "ghost", "destructive", "glass", "link", "plain", "tile"] }, size: { control: "select", options: ["lg", "default", "sm", "icon", "icon-sm", "tile", "tile-sm", "auto"] }, icon: iconArgType(), asChild: { table: { disable: true } } },
  
  
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};
export const Sizes: Story = { render: () => <div className="flex flex-col items-start gap-3">{(['default', 'mint', 'outline', 'ghost', 'destructive'] as const).map((v) => (
  <div key={v} className="flex items-center gap-3">{(['lg', 'default', 'sm'] as const).map((s) => <X.Button key={s} variant={v} size={s}>{v === 'destructive' ? '블록 지우기' : '후기 모두 보기'}</X.Button>)}
    <X.Button variant={v} icon="calendarAdd">캘린더 구독</X.Button></div>))}
  <div className="flex gap-2"><X.Button variant="glass" size="icon" aria-label="뒤로" icon="back" /><X.Button variant="glass" size="icon" aria-label="공유" icon="share" /></div></div> };
/** asChild: 버튼 모양·아이콘을 링크(<a>)에 입힌다. 아이콘은 링크 안 맨 앞에 들어간다 */
export const AsLink: Story = { render: () => <X.Button asChild variant="mint" icon="link"><a href="https://kakaotechbootcamp.com" target="_blank" rel="noreferrer">공식 사이트</a></X.Button> };
