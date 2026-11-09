import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/shadcn/ToggleGroup',
  id: 'ui-shadcn-togglegroup',  // 예전 'UI (shadcn)' 링크가 그대로 열리도록 고정
  tags: ['shadcn'],
  component: X.ToggleGroup,
  args: { value: '활동', options: ['활동', '팔로우', '프로젝트'], onValueChange: fn() },
  
  render: function Render({ options, value, ...args }) { const [, update] = useArgs(); const o = options as string[]; return <div className="w-[345px]"><X.ToggleGroup type="single" value={value} count={o.length} index={Math.max(0, o.indexOf(value))} onValueChange={(v: string) => { if (!v) return; args.onValueChange?.(v); update({ value: v }); }}>{o.map((x) => <X.ToggleGroupItem key={x} value={x}>{x}</X.ToggleGroupItem>)}</X.ToggleGroup></div>; },
  
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

