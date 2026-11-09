import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/shadcn/DropdownMenu',
  id: 'ui-shadcn-dropdownmenu',  // 예전 'UI (shadcn)' 링크가 그대로 열리도록 고정
  tags: ['shadcn'],
  component: X.DropdownMenu,
  args: { value: '전체 기수', options: ['전체 기수', '7기', '6기', '5기'], subs: ['후기 16개 · 추천 75%', '후기 9개 · 추천 78%', '후기 4개 · 추천 75%', '후기 2개'], onValueChange: fn() },

  render: function Render({ value, options, subs, ...args }) { const [, update] = useArgs(); return <X.DropdownMenu><X.DropdownMenuTrigger asChild><X.TrackPicker value={value} /></X.DropdownMenuTrigger>
  <X.DropdownMenuContent align="start"><X.DropdownMenuRadioGroup value={value} onValueChange={(v) => { args.onValueChange?.(v); update({ value: v }); }}>{(options as string[]).map((o, i) => <X.DropdownMenuRadioItem key={o} value={o} sub={(subs as string[])[i]}>{o}</X.DropdownMenuRadioItem>)}</X.DropdownMenuRadioGroup></X.DropdownMenuContent></X.DropdownMenu>; },

};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

