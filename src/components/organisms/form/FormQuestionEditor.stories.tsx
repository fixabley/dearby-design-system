import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { GOAL_Q, ROLE_Q, SENSITIVE, SWIFT_Q } from '@/stories/forms';

const meta: Meta<typeof X.FormQuestionEditor> = {
  title: 'Organisms/Form/FormQuestionEditor',
  id: 'organisms-formquestioneditor',
  component: X.FormQuestionEditor,
  tags: ['manage'],
  args: { value: SWIFT_Q, onChange: fn() },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

function Demo({
  detect,
  ...args
}: React.ComponentProps<typeof X.FormQuestionEditor> & { detect?: boolean }) {
  const [value, setValue] = useState(args.value);
  return (
    <div className="flex flex-col gap-4">
      <X.FormQuestionEditor
        {...args}
        value={value}
        onChange={setValue}
        warning={args.warning || (detect && SENSITIVE.test(value.text))}
      />
      <X.Button
        size="lg"
        disabled={
          !X.isFormQuestionComplete(value) ||
          args.warning ||
          (detect && SENSITIVE.test(value.text))
        }
      >
        완료
      </X.Button>
    </div>
  );
}

/** ㉙-i2: 예/아니오. 질문 · 종류 · 필수 · 조건으로 쓰기, 켜면 통과 답(예가 기본) */
export const Playground: Story = { render: (args) => <Demo {...args} /> };

/** ㉙-i3: 경고. 빨강 면 + 아이콘 + 글자, 질문 칸은 잘못된 입력으로 표시되고 완료가 꺼진다 */
export const WithWarning: Story = {
  args: {
    value: {
      ...GOAL_Q,
      kind: 'short',
      text: '주민등록번호 앞자리를 알려 주세요',
      required: true,
    },
    warning: true,
  },
  render: (args) => <Demo {...args} />,
};

/** 문구를 적으면 스토리의 검사 예시가 경고를 켠다(`주민등록` · `계좌` · `카드번호` · `건강` · `종교` · `정치`). 실제 검사는 쓰는 쪽 몫 */
export const TypeToWarn: Story = {
  args: { value: { ...GOAL_Q, text: '' } },
  render: (args) => <Demo {...args} detect />,
};

/** 하나 고르기: 조건으로 쓰면 통과 답이 선택지 라디오로 나온다 */
export const OneChoice: Story = {
  args: { value: { ...ROLE_Q, passAnswer: 'iOS' } },
  render: (args) => <Demo {...args} />,
};

/** 짧은 답: 조건으로 쓰기는 꺼진 채 비활성(시안 ㉙-i3) */
export const ShortAnswer: Story = {
  args: { value: { ...GOAL_Q, kind: 'short', text: '자기소개 한 줄' } },
  render: (args) => <Demo {...args} />,
};

/** 컴파운드로 바꿔 조립: 질문과 설정만 */
export const Partial: Story = {
  render: (args) => (
    <X.FormQuestionEditor {...args} className="gap-3">
      <X.FormQuestionEditor.Text />
      <X.FormQuestionEditor.Settings>
        <X.FormQuestionEditor.Kind />
        <X.FormQuestionEditor.Required />
      </X.FormQuestionEditor.Settings>
    </X.FormQuestionEditor>
  ),
};

/** 바텀 시트 안(㉙-i2) */
export const InSheet: Story = {
  parameters: { layout: 'fullscreen', width: undefined },
  render: (args) => (
    <X.Sheet open modal={false}>
      <X.SheetContent>
        <X.SheetHeader title="질문" />
        <div className="mt-3.5">
          <Demo {...args} />
        </div>
      </X.SheetContent>
    </X.Sheet>
  ),
};
