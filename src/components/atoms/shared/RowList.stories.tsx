import type { Meta, StoryObj } from '@storybook/react-vite';
import * as X from '@/index';
import * as D from '@/data';

const meta: Meta = {
  title: 'Atoms/Shared/RowList',
  id: 'atoms-rowlist',
  component: X.RowList,
  args: { inset: 78, columns: undefined, count: 4 },
  argTypes: { columns: { control: 'inline-radio', options: [undefined, 2] }, count: { control: { type: 'range', min: 1, max: 5 } } },
  render: ({ count, ...args }) => <X.RowList {...args}>{D.ACTIVITIES.slice(0, count).map((a) => <X.ActivityRow key={a.id} a={a} />)}</X.RowList>,
  parameters: { width: 480 },
};
export default meta;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: StoryObj<typeof meta> = {};
