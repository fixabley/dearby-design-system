import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { GOAL_Q, ROLE_Q, SWIFT_Q } from '@/stories/forms';

const meta: Meta<typeof X.FormQuestionRow> = {
  title: 'Organisms/Form/FormQuestionRow',
  id: 'organisms-formquestionrow',
  component: X.FormQuestionRow,
  tags: ['manage'],
  args: { number: 1, question: SWIFT_Q, onEdit: fn() },
  parameters: { width: 345 },
  decorators: [
    (Story) => (
      <X.ListGroup>
        <Story />
      </X.ListGroup>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof meta>;

/** ㉙-i: 번호 원 · 질문 글 · 종류 + `필수` + `조건 · 예만 참여` · 꺾쇠, 누르면 고치기 */
export const Playground: Story = {};

/** 필수만 있는 행 */
export const Required: Story = { args: { number: 2, question: ROLE_Q } };

/** 태그가 없는 행(종류만) */
export const Plain: Story = { args: { number: 3, question: GOAL_Q } };

/** 민감 정보 경고 표시(시안에 없는 추천안): 빨강 + 아이콘 + 글자 */
export const Warning: Story = {
  args: {
    warning: true,
    question: { ...GOAL_Q, text: '주민등록번호 앞자리를 알려 주세요' },
  },
};

/** 질문 글이 길면 여러 줄로 이어진다 */
export const LongText: Story = {
  args: {
    question: {
      ...SWIFT_Q,
      text: '지난 1년 안에 Swift나 SwiftUI로 만든 앱을 앱스토어에 출시해 본 경험이 있다면 어떤 앱이었는지 알려 주세요',
    },
  },
};
