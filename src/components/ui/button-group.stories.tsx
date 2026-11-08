import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';

const meta: Meta = {
  title: 'Molecules/shadcn/ButtonGroup',
  id: 'ui-shadcn-buttongroup',
  tags: ['shadcn'],
  component: X.ButtonGroup,
  args: { variant: 'glass', separator: true, count: 3 },
  argTypes: { variant: { control: 'inline-radio', options: ['default', 'glass'] }, count: { control: { type: 'range', min: 1, max: 4 } } },
  render: ({ separator, count, ...args }: Record<string, any>) => <X.ButtonGroup {...args}>{(['share', 'add', 'settings', 'bell'] as const).slice(0, count).map((n, i) => [separator && i === count - 2 && <X.ButtonGroupSeparator key="s" />, <X.Button key={n} variant={args.variant === 'glass' ? 'plain' : 'mint'} size="icon-sm" aria-label={n} icon={n} />])}</X.ButtonGroup>,
};
export default meta;
void fn; void useArgs;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: StoryObj<typeof meta> = {};
