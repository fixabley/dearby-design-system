import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import { content, event, look } from '@/stories/argTypes';

const meta: Meta = {
  title: 'Molecules/shadcn/Select',
  id: 'ui-shadcn-select',
  tags: ['shadcn'],
  component: X.Select,
  args: { value: '서울', options: ['서울', '대전', '광주', '구미', '부울경'], placeholder: '캠퍼스 고르기', variant: 'default', disabled: false, onValueChange: fn() },
  argTypes: {
    value: content('고른 값'), options: content('항목'), placeholder: content('고르기 전 글자'),
    variant: { control: 'inline-radio', options: ['default', 'inline'], ...look('default 입력 칸 · inline 목록 행 오른쪽 값') },
    disabled: { table: { category: '상태' } }, onValueChange: event(),
  },
  render: function Render({ options, placeholder, variant, disabled, ...args }: Record<string, any>) {
    const [, update] = useArgs();
    return (
      <X.Select value={args.value} disabled={disabled} onValueChange={(v) => { args.onValueChange?.(v); update({ value: v }); }}>
        <X.SelectTrigger variant={variant} className="group"><X.SelectValue placeholder={placeholder} /></X.SelectTrigger>
        <X.SelectContent>{(options as string[]).map((o) => <X.SelectItem key={o} value={o}>{o}</X.SelectItem>)}</X.SelectContent>
      </X.Select>
    );
  },
  parameters: { width: 345 },
};
export default meta;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: StoryObj<typeof meta> = {};
