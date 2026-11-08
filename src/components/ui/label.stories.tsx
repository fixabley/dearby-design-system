import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';

const meta: Meta = {
  title: 'Atoms/shadcn/Label',
  id: 'ui-shadcn-label',
  tags: ['shadcn'],
  component: X.Label,
  args: { children: '얻어 가는 것' },
  render: (args: Record<string, any>) => <X.Label {...args} />,
};
export default meta;
void fn; void useArgs;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: StoryObj<typeof meta> = {};
