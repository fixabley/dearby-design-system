import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/shadcn/RadioGroup',
  id: 'ui-shadcn-radiogroup',  // 예전 'UI (shadcn)' 링크가 그대로 열리도록 고정
  tags: ['shadcn'],
  component: X.RadioGroup,
  args: { value: '서울', options: ['서울', '대전', '광주'], disabled: false, onValueChange: fn() },
  
  render: function Render({ options, ...args }: Record<string, any>) { const [, update] = useArgs(); return <X.RadioGroup {...args} onValueChange={(v) => { args.onValueChange?.(v); update({ value: v }); }} className="flex gap-4">{(options as string[]).map((o) => <label key={o} className="flex items-center gap-2 text-body"><X.RadioGroupItem value={o} />{o}</label>)}</X.RadioGroup>; },
  
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

