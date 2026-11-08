import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';

const meta: Meta = {
  title: 'Molecules/Tooltip',
  id: 'ui-shadcn-tooltip',
  tags: ['shadcn'],
  component: X.Tooltip,
  args: { label: '공유', side: 'bottom', open: undefined },
  argTypes: { side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] }, open: { control: 'inline-radio', options: [undefined, true, false] } },
  render: ({ label, side, open }: Record<string, any>) => <div className="p-10"><X.Tooltip open={open}><X.TooltipTrigger asChild><X.Button variant="glass" size="icon" aria-label={label}><X.Icon name="share" /></X.Button></X.TooltipTrigger><X.TooltipContent side={side}>{label}</X.TooltipContent></X.Tooltip></div>,
};
export default meta;
void fn; void useArgs;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: StoryObj<typeof meta> = {};
