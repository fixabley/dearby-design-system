import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import { content, event, iconArgType, look, state } from '@/stories/argTypes';

const meta: Meta = {
  title: 'Molecules/shadcn/Item',
  id: 'ui-shadcn-item',
  tags: ['shadcn'],
  component: X.Item,
  args: { title: '시작', description: '', action: '11월 30일 (월)', icon: 'calendar', variant: 'default', size: 'default', selected: false, rows: 3 },
  argTypes: { title: content('ItemTitle'), description: content('ItemDescription'), action: content('ItemActions'), icon: iconArgType(true, 'ItemMedia(icon)'), variant: { control: 'inline-radio', options: ['default', 'outline', 'muted'], ...look() }, size: { control: 'inline-radio', options: ['default', 'sm'], ...look() }, selected: state('고른 행'), rows: { control: { type: 'range', min: 1, max: 6 } } },
  render: ({ title, description, action, icon, rows, ...args }: Record<string, any>) => <X.ItemGroup>{Array.from({ length: rows }, (_, i) => <X.Item key={i} {...args}>{icon && <X.ItemMedia variant="icon"><X.Icon name={icon} /></X.ItemMedia>}<X.ItemContent><X.ItemTitle>{title}</X.ItemTitle>{description && <X.ItemDescription>{description}</X.ItemDescription>}</X.ItemContent>{action && <X.ItemActions>{action}</X.ItemActions>}</X.Item>)}</X.ItemGroup>,
  parameters: { width: 345 },
};
export default meta;
void fn; void useArgs;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: StoryObj<typeof meta> = {};
