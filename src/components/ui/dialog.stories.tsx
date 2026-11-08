import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'UI (shadcn)/Dialog',
  component: X.Dialog,
  args: { open: false, title: '파이토치 데이 코리아 2026 · 오후 세션', description: '11월 21일 (토) 13:30 ~ 17:30 · 코엑스 그랜드볼룸', showClose: true, onOpenChange: fn() },
  
  render: function Render({ title, description, showClose, ...args }: Record<string, any>) { const [, update] = useArgs(); return <X.Dialog open={args.open} onOpenChange={(o) => { args.onOpenChange?.(o); update({ open: o }); }}><X.DialogTrigger asChild><X.Button variant="mint">모달 열기</X.Button></X.DialogTrigger>
  <X.DialogContent showClose={showClose} className="h-[480px] max-w-[720px]"><X.DialogHeader><X.DialogTitle>{title}</X.DialogTitle><X.DialogDescription>{description}</X.DialogDescription></X.DialogHeader><div className="px-6 text-body text-muted-foreground">내용</div></X.DialogContent></X.Dialog>; },
  
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

