import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';
import { fn } from 'storybook/test';
import * as X from '@/index';
import * as D from '@/data';

const meta: Meta = {
  title: 'Molecules/Activity/StageQuestion',
  id: 'molecules-stagequestion',
  component: X.StageQuestion,
  args: {
    variant: 'row',
    question: '서류 발표 결과를 남겨 주세요',
    label: 'D-DAY · 서류 발표',
    canFail: true,
    passLabel: '통과',
    failLabel: '탈락',
    laterLabel: '아직 몰라요',
    onPass: fn(),
    onFail: fn(),
    onLater: fn(),
  },
  argTypes: { variant: { control: 'inline-radio', options: ['row', 'card'] } },
  parameters: { width: 393 },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 활동 상세의 질문 카드(시안 ㉖-b3): 라벨 · 제목 · 버튼 셋 */
export const Card: Story = {
  args: { variant: 'card' },
};

/** 다음 단계가 시작될 때 앞 단계를 묻는 꼴(시안 ㉖-c): 탈락 없이 `통과로 표시` · `아직 몰라요` */
export const PreviousStage: Story = {
  args: {
    question: '면접이 시작됐어요. 서류는 통과로 표시할까요?',
    canFail: false,
    passLabel: '통과로 표시',
  },
};

/** 컴파운드로 바꿔 조립: 라벨 없이 */
export const Composed: Story = {
  args: { variant: 'card' },
  render: (args) => (
    <X.StageQuestion {...(args as ComponentProps<typeof X.StageQuestion>)}>
      <X.StageQuestion.Question />
      <X.StageQuestion.Actions />
    </X.StageQuestion>
  ),
};

const documents = D.ACTIVITIES.find((a) => a.id === '1287') ?? D.ACTIVITIES[1];

const WAITING = {
  ...documents,
  metas: [
    { label: '서류 발표', dday: 'D-DAY 17:00' },
    { icon: 'place' as const, label: '장소', value: '서울 관악구' },
  ],
  steps: [
    { name: '지원', state: 'past' as const },
    { name: '서류 발표', state: 'cur' as const },
    { name: '면접', state: 'up' as const },
    { name: '최종 발표', state: 'up' as const },
    { name: '교육 시작', state: 'up' as const },
  ],
};

/** 묻기 전 · 답한 뒤(시안 ㉖-d): 통과를 누르면 질문이 사라지고 트랙이 면접으로 간다. 앱 쪽이 하는 일을 흉내 낸 것 */
export const AskedAndAnswered: Story = {
  render: function R() {
    const [passed, setPassed] = useState(false);
    const a = passed
      ? {
          ...WAITING,
          metas: [{ label: '면접', dday: 'D-5' }, WAITING.metas[1]],
          steps: [
            { name: '지원', state: 'past' as const },
            { name: '서류 발표', state: 'past' as const },
            { name: '면접', state: 'cur' as const },
            { name: '최종 발표', state: 'up' as const },
            { name: '교육 시작', state: 'up' as const },
          ],
        }
      : WAITING;
    return (
      <>
        <X.ActivityRow a={a} />
        {!passed && (
          <X.StageQuestion
            question="서류 발표 결과를 남겨 주세요"
            onPass={() => setPassed(true)}
            onFail={fn()}
            onLater={fn()}
          />
        )}
      </>
    );
  },
};

/** 어드민이 더한 OTHER 상태(예비 합격 등)가 단계에 있어도 질문은 그대로 세 버튼이다. OTHER는 상세 일정 카드의 상태 메뉴에서 고른다 */
export const WithOtherState: Story = {
  render: () => (
    <>
      <X.ActivityRow
        a={{
          ...WAITING,
          steps: WAITING.steps.map((s) =>
            s.state === 'cur' ? { ...s, name: '예비 합격' } : s,
          ),
        }}
      />
      <X.StageQuestion
        question="예비 합격 결과를 남겨 주세요"
        onPass={fn()}
        onFail={fn()}
        onLater={fn()}
      />
    </>
  ),
};
