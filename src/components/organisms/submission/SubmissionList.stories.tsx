import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/Submission/SubmissionList',
  id: 'organisms-submissionlist',
  tags: ['manage'],
  component: X.SubmissionList,
  args: { items: D.SUBMISSIONS, selected: 0, onSelect: fn() },
  
  render: controlled(X.SubmissionList, 'selected', 'onSelect'),
  parameters: { width: 420 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 요약 없이 거르기와 행만 */
export const Composed: Story = { render: function Render(args: Record<string, any>) { const [, update] = useArgs(); return <X.SubmissionList items={args.items} selected={args.selected} onSelect={(i) => { args.onSelect?.(i); update({ selected: i }); }}><X.SubmissionList.Filter /><X.SubmissionList.List /></X.SubmissionList>; } };
