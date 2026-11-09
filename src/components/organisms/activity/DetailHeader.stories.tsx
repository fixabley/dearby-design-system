import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/Activity/DetailHeader',
  id: 'organisms-detailheader',
  component: X.DetailHeader,
  args: { d: D.SSAFY, badges: true },

  parameters: { width: 560 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs;
void fn;
void controlled;
void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 종류·조직 줄 없이 이름과 구분 고르기 | 배지 */
export const Composed: Story = {
  render: (args) => (
    <X.DetailHeader d={args.d}>
      <X.DetailHeader.Body>
        <X.DetailHeader.Title />
        <X.DetailHeader.Picker />
      </X.DetailHeader.Body>
      <X.DetailHeader.Badges />
    </X.DetailHeader>
  ),
};
