import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { FORM_QUESTIONS, SENSITIVE } from '@/stories/forms';

const meta: Meta<typeof X.FormQuestionList> = {
  title: 'Organisms/Form/FormQuestionList',
  id: 'organisms-formquestionlist',
  component: X.FormQuestionList,
  tags: ['manage'],
  args: { value: FORM_QUESTIONS, onEdit: fn(), onAdd: fn() },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** ㉙-i: 질문 행들과 끝의 `질문 추가` */
export const Playground: Story = {};

/** 질문이 없으면 `질문 추가` 행만 */
export const Empty: Story = { args: { value: [] } };

/** 컴파운드로 바꿔 조립: 행들만 */
export const RowsOnly: Story = {
  render: (args) => (
    <X.FormQuestionList {...args}>
      <X.FormQuestionList.Rows />
    </X.FormQuestionList>
  ),
};

const BLANK: X.FormQuestion = { text: '', kind: 'short', required: false };

function Flow() {
  const [questions, setQuestions] = useState<X.FormQuestion[]>(FORM_QUESTIONS);
  // 편집 중인 질문: 고치는 자리(index) 또는 새 질문(null) + 임시 값
  const [editing, setEditing] = useState<{
    index: number | null;
    draft: X.FormQuestion;
  } | null>(null);
  const warning = editing ? SENSITIVE.test(editing.draft.text) : false;
  const commit = () => {
    if (!editing) return;
    setQuestions(
      editing.index == null
        ? [...questions, editing.draft]
        : questions.map((q, i) => (i === editing.index ? editing.draft : q)),
    );
    setEditing(null);
  };
  const remove = () => {
    if (editing?.index == null) return;
    setQuestions(questions.filter((_, i) => i !== editing.index));
    setEditing(null);
  };
  return (
    <div className="px-5 pt-6">
      <X.Text as="h2" variant="title" className="mb-4">
        참여 폼
      </X.Text>
      <X.FormQuestionList
        value={questions}
        onEdit={(q, i) => setEditing({ index: i, draft: q })}
        onAdd={() => setEditing({ index: null, draft: BLANK })}
      />
      <X.Sheet
        open={editing != null}
        modal={false}
        onOpenChange={(open) => !open && setEditing(null)}
      >
        <X.SheetContent className="min-h-[60dvh]">
          <X.SheetHeader title="질문" />
          {editing && (
            <>
              <div className="overflow-y-auto pb-1 pt-1">
                <X.FormQuestionEditor
                  value={editing.draft}
                  warning={warning}
                  onChange={(draft) => setEditing({ ...editing, draft })}
                />
              </div>
              <div className="mt-4 flex gap-2.5">
                {editing.index != null && (
                  <X.Button
                    variant="outline"
                    size="icon-lg"
                    icon="trash"
                    className="text-destructive"
                    aria-label="질문 지우기"
                    onClick={remove}
                  />
                )}
                <X.Button
                  size="lg"
                  className="flex-1"
                  disabled={warning || !X.isFormQuestionComplete(editing.draft)}
                  onClick={commit}
                >
                  완료
                </X.Button>
              </div>
            </>
          )}
        </X.SheetContent>
      </X.Sheet>
    </div>
  );
}

/** 질문 목록 → 편집 시트(㉙-i · i2 · i3 · i4) 전체 흐름: 행을 누르면 편집, 종류 메뉴에서 바꾸고, 경고 문구(주민등록 · 계좌 …)를 적으면 경고가 뜨고 완료가 꺼지며, 왼쪽 휴지통으로 지운다. `질문 추가`로 새 질문을 만든다. 하나 고르기 질문의 선택지 편집은 시안에 틀이 없어 이 흐름에 없다 */
export const InSheet: Story = {
  parameters: { layout: 'fullscreen', width: undefined },
  render: () => <Flow />,
};
