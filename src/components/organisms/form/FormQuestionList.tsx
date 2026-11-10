import { createContext, useContext, type ReactNode } from 'react';
import { Icon } from '@/components/foundations/Icon';
import { ListGroup, ListRow } from '@/components/molecules/shared/ListGroup';
import { FormQuestionRow } from './FormQuestionRow';
import type { FormQuestion } from './form';

type FormQuestionListContextValue = {
  value: FormQuestion[];
  warnings?: boolean[];
  onEdit?: (question: FormQuestion, index: number) => void;
  onAdd?: () => void;
};
const FormQuestionListContext =
  createContext<FormQuestionListContextValue | null>(null);

function useFormQuestionList(part: string) {
  const ctx = useContext(FormQuestionListContext);
  if (!ctx)
    throw new Error(
      `FormQuestionList.${part}는 <FormQuestionList> 안에서 쓴다`,
    );
  return ctx;
}

/** 질문 행들(`FormQuestionRow`, 번호는 순서) */
function Rows() {
  const { value, warnings, onEdit } = useFormQuestionList('Rows');
  return (
    <>
      {value.map((question, i) => (
        <FormQuestionRow
          // 질문에는 고유한 id가 없어 자리(순서)로 구분한다
          key={i}
          number={i + 1}
          question={question}
          warning={warnings?.[i]}
          onEdit={onEdit && (() => onEdit(question, i))}
        />
      ))}
    </>
  );
}

/** 끝의 `질문 추가` 행(청록 ⊕, 누르면 `onAdd`) */
function Add() {
  const { onAdd } = useFormQuestionList('Add');
  return (
    <ListRow
      add
      icon="addCircle"
      title="질문 추가"
      onClick={onAdd}
      trailing={<Icon name="chevronRight" className="size-4" />}
    />
  );
}

function FormQuestionListRoot({
  value,
  warnings,
  onEdit,
  onAdd,
  className,
  children,
}: {
  value: FormQuestion[];
  /** 질문마다 경고 표시 여부(같은 자리) */
  warnings?: boolean[];
  /** 행을 눌렀을 때: 쓰는 쪽이 질문 편집 시트로 간다 */
  onEdit?: (question: FormQuestion, index: number) => void;
  onAdd?: () => void;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <FormQuestionListContext.Provider
      value={{ value, warnings, onEdit, onAdd }}
    >
      <ListGroup className={className}>
        {children ?? (
          <>
            <Rows />
            <Add />
          </>
        )}
      </ListGroup>
    </FormQuestionListContext.Provider>
  );
}

/**
 * 참여 폼 질문 목록(컴파운드, 시안 ㉙-i): Rows(질문 행들) · Add(`질문 추가` 행).
 * 값은 쓰는 쪽이 갖는 제어형이고 고치기 · 더하기는 알리기만 한다. 순서 바꾸기(시안 "편집에서 끌기")는 틀이 없어 만들지 않았다.
 * 기본 조립은 `<FormQuestionList value={questions} onEdit={…} onAdd={…} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<FormQuestionList value={questions}><FormQuestionList.Rows /></FormQuestionList>`
 */
export const FormQuestionList = Object.assign(FormQuestionListRoot, {
  Rows,
  Add,
});
