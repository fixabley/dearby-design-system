import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';

const meta: Meta = {
  title: 'Molecules/Item',
  id: 'ui-shadcn-item',
  tags: ['shadcn'],
  component: X.Item,
  args: { title: '시작', description: '', action: '11월 30일 (월)', icon: 'calendar', variant: 'default', size: 'default', selected: false, rows: 3 },
  argTypes: { variant: { control: 'inline-radio', options: ['default', 'outline', 'muted'] }, size: { control: 'inline-radio', options: ['default', 'sm'] }, icon: { control: 'select', options: [undefined, ...Object.keys(X.ICONS)] }, rows: { control: { type: 'range', min: 1, max: 6 } } },
  render: ({ title, description, action, icon, rows, ...args }: Record<string, any>) => <X.ItemGroup>{Array.from({ length: rows }, (_, i) => <X.Item key={i} {...args}>{icon && <X.ItemMedia variant="icon"><X.Icon name={icon} /></X.ItemMedia>}<X.ItemContent><X.ItemTitle>{title}</X.ItemTitle>{description && <X.ItemDescription>{description}</X.ItemDescription>}</X.ItemContent>{action && <X.ItemActions>{action}</X.ItemActions>}</X.Item>)}</X.ItemGroup>,
  parameters: { width: 345 },
};
export default meta;
void fn; void useArgs;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: StoryObj<typeof meta> = {};
