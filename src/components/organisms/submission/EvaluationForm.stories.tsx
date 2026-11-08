import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/Submission/EvaluationForm',
  id: 'organisms-evaluationform',
  component: X.EvaluationForm,
  args: { repo: 'doyun/ondevice-study #7', submitted: '11월 28일 (토) 22:10 제출', feedback: '모델 불러오기를 따로 뺀 구조가 깔끔해요.', onSend: fn() },
  
  render: (args: Record<string, any>) => <X.EvaluationForm key={args.feedback} {...(args as any)} />,
  parameters: { width: 480 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 피드백 없이 제출 PR · 통과 여부 · 보내기 */
export const Composed: Story = { render: (args: Record<string, any>) => <X.EvaluationForm {...(args as any)}><X.EvaluationForm.Submission /><X.EvaluationForm.Verdict /><X.EvaluationForm.Submit /></X.EvaluationForm> };
