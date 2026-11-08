import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';

const meta: Meta = {
  title: 'Molecules/InputGroup',
  id: 'ui-shadcn-inputgroup',
  tags: ['shadcn'],
  component: X.InputGroup,
  args: { variant: 'glass', placeholder: '프로그램·활동·태그 검색', icon: 'search', suffix: '' },
  argTypes: { variant: { control: 'inline-radio', options: ['glass', 'filled'] }, icon: { control: 'select', options: [undefined, ...Object.keys(X.ICONS)] } },
  render: ({ placeholder, icon, suffix, ...args }: Record<string, any>) => <X.InputGroup {...args}>{icon && <X.InputGroupAddon><X.Icon name={icon} /></X.InputGroupAddon>}<X.InputGroupInput placeholder={placeholder} />{suffix && <X.InputGroupAddon align="inline-end"><X.InputGroupText>{suffix}</X.InputGroupText></X.InputGroupAddon>}</X.InputGroup>,
  parameters: { width: 440 },
};
export default meta;
void fn; void useArgs;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: StoryObj<typeof meta> = {};
