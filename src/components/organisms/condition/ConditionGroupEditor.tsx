import { createContext, useContext, type ReactNode } from 'react';
import { Segmented } from '@/components/molecules/shared/Segmented';
import { ConditionList } from './ConditionList';
import type { ConditionGroup, ConditionNode } from './condition';

type ConditionGroupEditorContextValue = {
  value: ConditionGroup;
  onChange?: (group: ConditionGroup) => void;
  onEdit?: (node: ConditionNode, index: number) => void;
  onAdd?: () => void;
};
const ConditionGroupEditorContext =
  createContext<ConditionGroupEditorContextValue | null>(null);

function useConditionGroupEditor(part: string) {
  const ctx = useContext(ConditionGroupEditorContext);
  if (!ctx)
    throw new Error(
      `ConditionGroupEditor.${part}는 <ConditionGroupEditor> 안에서 쓴다`,
    );
  return ctx;
}

/** 모두 | 하나라도 분할 전환(기존 `Segmented`) */
function Match({ className }: { className?: string }) {
  const { value, onChange } = useConditionGroupEditor('Match');
  return (
    <Segmented
      items={['all', 'any'] as const}
      labels={{ all: '모두', any: '하나라도' }}
      value={value.match}
      onChange={(match) => onChange?.({ ...value, match })}
      label="충족 조건"
      className={className}
    />
  );
}

/** 묶음 안의 조건 목록: 아이콘 없는 행들과 끝의 `자격 추가` 행(`ConditionList`) */
function Items({ className }: { className?: string }) {
  const { value, onEdit, onAdd } = useConditionGroupEditor('Items');
  return (
    <ConditionList
      value={value.items}
      icons={false}
      onEdit={onEdit}
      onAdd={onAdd}
      className={className}
    />
  );
}

function ConditionGroupEditorRoot({
  value,
  onChange,
  onEdit,
  onAdd,
  className,
  children,
}: {
  value: ConditionGroup;
  /** 모두 | 하나라도를 바꿨을 때 */
  onChange?: (group: ConditionGroup) => void;
  /** 안의 행을 눌렀을 때(안의 묶음이면 쓰는 쪽이 그 묶음의 편집으로 간다) */
  onEdit?: (node: ConditionNode, index: number) => void;
  onAdd?: () => void;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <ConditionGroupEditorContext.Provider
      value={{ value, onChange, onEdit, onAdd }}
    >
      <div className={className}>
        {children ?? (
          <>
            <Match />
            <Items className="mt-3" />
          </>
        )}
      </div>
    </ConditionGroupEditorContext.Provider>
  );
}

/**
 * 자격 묶음 편집(컴파운드, 시안 ㉙-l4): Match(모두 | 하나라도) · Items(안의 조건 목록과 `자격 추가`).
 * 안에 묶음이 있으면 행에 키 이름들과 `모두` · `하나라도`로 보인다(중첩은 `MAX_CONDITION_DEPTH`까지, 막는 일은 쓰는 쪽 몫).
 * 값은 쓰는 쪽이 갖는 제어형이고, 시트 머리(`자격 묶음`) · `추가` 버튼도 쓰는 쪽이 조립한다.
 * `<ConditionGroupEditor value={group} onChange={setGroup} onEdit={…} onAdd={…} />`
 */
export const ConditionGroupEditor = Object.assign(ConditionGroupEditorRoot, {
  Match,
  Items,
});
