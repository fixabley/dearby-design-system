import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'UI (shadcn)/Separator',
  component: X.Separator,
  args: { orientation: 'horizontal', className: 'my-3' },
  argTypes: { orientation: { control: "inline-radio", options: ["horizontal", "vertical"] } },
  render: (args: Record<string, any>) => <div className={args.orientation === 'vertical' ? 'flex h-10 items-center gap-3' : 'w-[345px]'}><span>위</span><X.Separator {...args} /><span>아래</span></div>,
  
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

