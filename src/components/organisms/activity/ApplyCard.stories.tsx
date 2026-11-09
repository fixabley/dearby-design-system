import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/Activity/ApplyCard',
  id: 'organisms-applycard',
  component: X.ApplyCard,
  args: { d: D.SSAFY },


  parameters: { width: 340 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 배지와 신청 버튼만 담은 작은 고정 카드 */
export const Composed: Story = { render: (args) => <X.ApplyCard d={args.d}><X.ApplyCard.Badges /><X.ApplyCard.Cta /></X.ApplyCard> };
