import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/shadcn/Sheet',
  id: 'ui-shadcn-sheet',  // 예전 'UI (shadcn)' 링크가 그대로 열리도록 고정
  tags: ['shadcn'],
  component: X.Sheet,
  args: { open: false, title: '후기 남기기', floating: false, onOpenChange: fn() },

  render: function Render({ title, floating, ...args }) { const [, update] = useArgs(); return <X.Sheet open={args.open} onOpenChange={(o) => { args.onOpenChange?.(o); update({ open: o }); }}><X.SheetTrigger asChild><X.Button variant="mint">시트 열기</X.Button></X.SheetTrigger><X.SheetContent floating={floating}><X.SheetHeader title={title} /><p className="py-4 text-body text-muted-foreground">내용</p></X.SheetContent></X.Sheet>; },

};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

