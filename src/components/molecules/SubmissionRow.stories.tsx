import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/SubmissionRow',
  component: X.SubmissionRow,
  args: { s: D.SUBMISSIONS[0], selected: false, onSelect: fn() },
  
  render: (args: Record<string, any>) => <X.ListGroup><X.SubmissionRow {...(args as any)} /></X.ListGroup>,
  parameters: { width: 393 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 아바타 없이 평가 상태를 앞에 */
export const Composed: Story = { render: () => <X.ListGroup>{D.SUBMISSIONS.map((s) => <X.SubmissionRow key={s.name} s={s}><X.SubmissionRow.Status /><X.SubmissionRow.Text /></X.SubmissionRow>)}</X.ListGroup> };
