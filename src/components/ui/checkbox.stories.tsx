import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import { content, event, state } from '@/stories/argTypes';

const meta: Meta = {
  title: 'Atoms/Checkbox',
  id: 'ui-shadcn-checkbox',
  tags: ['shadcn'],
  component: X.Checkbox,
  args: { label: '단계 통과 인증', checked: true, disabled: false, onCheckedChange: fn() },
  argTypes: {
    label: content('옆 글자(label로 감싸 글자를 눌러도 켜진다)'),
    checked: state('켜짐'),
    disabled: state(),
    onCheckedChange: event(),
  },
  render: function Render({ label, ...args }: Record<string, any>) {
    const [, update] = useArgs();
    return (
      <label className="flex items-center gap-3 text-body-lg">
        <X.Checkbox checked={args.checked} disabled={args.disabled} onCheckedChange={(v) => { args.onCheckedChange?.(v); update({ checked: v === true }); }} />
        {label}
      </label>
    );
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 묶음 목록 행 오른쪽(㉙-m 제출 명함 필수 항목) */
export const List: Story = {
  parameters: { width: 345 },
  render: () => (
    <div>
      <p className="px-4 pb-1.5 text-caption text-muted-foreground">연락처·링크</p>
      <X.ItemGroup>
        {([['이메일', true], ['전화', false], ['GitHub', true], ['인스타그램', false]] as const).map(([t, on]) => (
          <X.Item key={t} asChild><label><X.ItemContent><X.ItemTitle>{t}</X.ItemTitle></X.ItemContent><X.Checkbox defaultChecked={on} /></label></X.Item>
        ))}
      </X.ItemGroup>
    </div>
  ),
};
