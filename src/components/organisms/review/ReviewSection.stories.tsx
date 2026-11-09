import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/Review/ReviewSection',
  id: 'organisms-reviewsection',
  component: X.ReviewSection,
  args: { r: D.MOGAKCO.reviews! },

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

/** 컴파운드로 바꿔 조립: 기수 고르기·모두 보기 없이 요약과 후기만 */
export const Composed: Story = {
  render: (args) => (
    <X.ReviewSection r={args.r}>
      <X.ReviewSection.Summary />
      <X.ReviewSection.List />
    </X.ReviewSection>
  ),
};
