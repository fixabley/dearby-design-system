import { createContext, useContext, type ReactNode } from 'react';
import { ListGroup, ListRow } from '@/components/molecules/shared/ListGroup';
import { ConditionRow } from './ConditionRow';
import type { ConditionNode } from './condition';

type ConditionListContextValue = {
  value: ConditionNode[];
  icons: boolean;
  onEdit?: (node: ConditionNode, index: number) => void;
  onAdd?: () => void;
};
const ConditionListContext = createContext<ConditionListContextValue | null>(
  null,
);

function useConditionList(part: string) {
  const ctx = useContext(ConditionListContext);
  if (!ctx)
    throw new Error(`ConditionList.${part}는 <ConditionList> 안에서 쓴다`);
  return ctx;
}

/** 조건 행들(`ConditionRow`) */
function Rows() {
  const { value, icons, onEdit } = useConditionList('Rows');
  return (
    <>
      {value.map((node, i) => (
        <ConditionRow
          // 조건에는 고유한 id가 없고 같은 키를 여러 번 쓸 수 있어 자리(순서)로 구분한다
          key={i}
          node={node}
          icon={icons ? 'profile' : null}
          onEdit={onEdit && (() => onEdit(node, i))}
        />
      ))}
    </>
  );
}

/** 끝의 `자격 추가` 행(청록 ⊕, 누르면 `onAdd`) */
function Add() {
  const { onAdd } = useConditionList('Add');
  return <ListRow add icon="addCircle" title="자격 추가" onClick={onAdd} />;
}

function ConditionListRoot({
  value,
  title,
  icons = true,
  onEdit,
  onAdd,
  className,
  children,
}: {
  /** 조건 또는 묶음 목록 */
  value: ConditionNode[];
  /** 목록 위 작은 머리(시안 ㉙-c2 `자격`) */
  title?: string;
  /** 조건 행의 앞 아이콘. 묶음 안에서는 끈다(시안 ㉙-l4) */
  icons?: boolean;
  /** 행을 눌렀을 때: 쓰는 쪽이 값 입력 시트로 간다 */
  onEdit?: (node: ConditionNode, index: number) => void;
  onAdd?: () => void;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <ConditionListContext.Provider value={{ value, icons, onEdit, onAdd }}>
      <ListGroup title={title} className={className}>
        {children ?? (
          <>
            <Rows />
            <Add />
          </>
        )}
      </ListGroup>
    </ConditionListContext.Provider>
  );
}

/**
 * 조건 목록(컴파운드, 시안 ㉙-c2 자격 구역 · ㉙-l4 묶음 안): Rows(조건 행들) · Add(`자격 추가` 행).
 * 값은 쓰는 쪽이 갖는 제어형이고 고치기 · 더하기는 알리기만 한다.
 * 기본 조립은 `<ConditionList title="자격" value={nodes} onEdit={…} onAdd={…} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<ConditionList value={nodes}><ConditionList.Rows /></ConditionList>`
 */
export const ConditionList = Object.assign(ConditionListRoot, { Rows, Add });
