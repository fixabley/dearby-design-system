import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import * as X from '@/index';
import {
  FORM_PROJECTS,
  GOAL_Q,
  LINK_Q,
  MANY_Q,
  PROJECT_Q,
  ROLE_Q,
  SHORT_Q,
  SWIFT_Q,
} from '@/stories/forms';

const meta: Meta<typeof X.FormAnswerInput> = {
  title: 'Organisms/Form/FormAnswerInput',
  id: 'organisms-formanswerinput',
  component: X.FormAnswerInput,
  args: {
    question: SWIFT_Q,
    value: null,
    onChange: fn(),
    onPickProject: fn(),
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

function Demo(args: React.ComponentProps<typeof X.FormAnswerInput>) {
  const [value, setValue] = useState(args.value);
  return (
    <X.FormAnswerInput
      {...args}
      value={value}
      onChange={(v) => {
        setValue(v);
        args.onChange?.(v);
      }}
    />
  );
}

/** ㉙-j: 예/아니오. 분할 전환이고 처음에는 고른 칸이 없다 */
export const Bool: Story = { render: (args) => <Demo {...args} /> };

/** 예를 고른 모양 */
export const BoolYes: Story = {
  args: { value: true },
  render: (args) => <Demo {...args} />,
};

/** ㉙-j: 하나 고르기. 라디오 줄 */
export const One: Story = {
  args: { question: ROLE_Q, value: 'iOS' },
  render: (args) => <Demo {...args} />,
};

/** 여러 개 고르기(시안에 답 틀이 없는 추천안): 체크박스 줄 */
export const Many: Story = {
  args: { question: MANY_Q, value: ['테스트'] },
  render: (args) => <Demo {...args} />,
};

/** ㉙-j: 긴 답 */
export const Long: Story = {
  args: {
    question: GOAL_Q,
    value: '실전 같은 모의 면접 피드백을 주고받고 싶어요',
  },
  render: (args) => <Demo {...args} />,
};

/** 짧은 답(시안에 답 틀이 없는 추천안) */
export const Short: Story = {
  args: { question: SHORT_Q, value: '' },
  render: (args) => <Demo {...args} />,
};

/** 링크: https만. 입력을 마치고 나가면 틀린 형식을 알린다(시안에 답 틀이 없는 추천안) */
export const Link: Story = {
  args: { question: LINK_Q, value: 'dearby.kr' },
  render: (args) => <Demo {...args} />,
};

/** ㉙-j5: 프로젝트. 고르기 전 */
export const Project: Story = {
  args: { question: PROJECT_Q, projects: FORM_PROJECTS },
  render: (args) => <Demo {...args} />,
};

/** 프로젝트를 고른 뒤 */
export const ProjectPicked: Story = {
  args: { question: PROJECT_Q, projects: FORM_PROJECTS, value: 'moa' },
  render: (args) => <Demo {...args} />,
};

/** 질문 글이 길어도 이어진다 */
export const LongLabel: Story = {
  args: {
    question: {
      ...SWIFT_Q,
      text: '지난 1년 안에 Swift나 SwiftUI로 만든 앱을 앱스토어에 출시해 본 경험이 있나요?',
    },
  },
  render: (args) => <Demo {...args} />,
};

const FORM = [SWIFT_Q, ROLE_Q, GOAL_Q, PROJECT_Q];

function Form() {
  const [values, setValues] = useState<X.FormAnswerValue[]>(
    FORM.map(X.emptyFormAnswer),
  );
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);
  const ready = FORM.every((q, i) => X.isFormAnswerComplete(q, values[i]));
  const set = (i: number) => (v: X.FormAnswerValue) =>
    setValues(values.map((x, j) => (j === i ? v : x)));
  return (
    <div className="px-5 pb-6 pt-6">
      <X.Text as="h2" variant="title" className="mb-5">
        참여 폼
      </X.Text>
      {FORM.map((q, i) => (
        <X.FormAnswerInput
          key={i}
          className="mb-[22px]"
          question={q}
          value={values[i]}
          onChange={set(i)}
          projects={FORM_PROJECTS}
          onPickProject={() => {
            setDraft((values[i] as string | null) ?? null);
            setOpen(true);
          }}
        />
      ))}
      <X.Button size="lg" block disabled={!ready}>
        제출
      </X.Button>
      <X.Sheet open={open} modal={false} onOpenChange={setOpen}>
        <X.SheetContent>
          <X.SheetHeader title="프로젝트" />
          <div className="overflow-y-auto pb-1 pt-3.5">
            <X.FormProjectList
              projects={FORM_PROJECTS}
              value={draft}
              onChange={setDraft}
            />
          </div>
          <X.Button
            size="lg"
            className="mt-4"
            disabled={!draft}
            onClick={() => {
              set(FORM.length - 1)(draft);
              setOpen(false);
            }}
          >
            고르기
          </X.Button>
        </X.SheetContent>
      </X.Sheet>
    </div>
  );
}

/** 참여 폼 작성 전체 흐름(㉙-j · j5): 필수를 다 채우면 제출이 열린다. 프로젝트 줄을 누르면 고르기 시트가 열리고 `고르기`로 돌아온다 */
export const Filling: Story = {
  parameters: { layout: 'fullscreen', width: undefined },
  render: () => <Form />,
};
