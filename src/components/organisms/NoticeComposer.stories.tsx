import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/NoticeComposer',
  component: X.NoticeForm,
  args: { title: '목요일 모임은 21:00에 시작해요', body: '11월 19일 (목)만 **한 시간 늦게** 시작해요. 회의 링크는 `meet.google.com/abc`', discord: true, onTitle: fn(), onBody: fn() },
  
  render: function Render(args: Record<string, any>) { const [, update] = useArgs(); return <div className="grid w-[960px] grid-cols-2 gap-12"><X.NoticeForm {...(args as any)} onTitle={(v) => { args.onTitle?.(v); update({ title: v }); }} onBody={(v) => { args.onBody?.(v); update({ body: v }); }} /><X.NoticePreview title={args.title} body={args.body} /></div>; },
  
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

