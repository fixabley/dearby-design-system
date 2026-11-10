// 참여 조건 · 자격의 값 모양과 순수 도우미(시안 ㉙-c2 · l · l2 · l3 · l4).
// 서버 계약(자격 정보 이슈)이 아직 없어 시안의 낱말을 영문으로 옮긴 최소한이다. 계약이 생기면 맞춘다.

/** 값 종류: 범위 · 하나 이상 고르기 · 하나 고르기 · 예/아니오 */
export type ConditionValueKind = 'range' | 'many' | 'one' | 'bool';

/**
 * 자격 키(공용 키: 대상자 조건 어휘 + 성별 + 승인된 사용자 제안 키).
 * `proposal`이 없으면 기본 키, `approved`는 승인된 사용자 제안 키, `pending`은 승인 전 제안 키(조건 요약에 `제안 중`)이다
 */
export type ConditionKey = {
  id: string;
  label: string;
  valueKind: ConditionValueKind;
  /** 범위 값 뒤의 단위(예 `세`) */
  unit?: string;
  proposal?: 'approved' | 'pending';
};

/** 조건의 값. 범위는 한쪽을 비울 수 있고(`from` · `to`), 고르는 값은 화면에 보이는 글자로 둔다 */
export type ConditionValue =
  | { kind: 'range'; from?: number; to?: number }
  | { kind: 'bool'; value: boolean }
  | { kind: 'one'; value: string }
  | { kind: 'many'; values: string[] };

/** 조건 하나: 키와 값 */
export type Condition = { key: ConditionKey; value: ConditionValue };

/** 묶음: `all` 모두 충족, `any` 하나라도 충족. 안에 조건이나 묶음이 여럿 든다 */
export type ConditionGroup = { match: 'all' | 'any'; items: ConditionNode[] };

export type ConditionNode = Condition | ConditionGroup;

/** 시안 ㉙-l4: 중첩은 깊이 3까지(맨 위 목록이 1) */
export const MAX_CONDITION_DEPTH = 3;

export const MATCH_LABEL: Record<ConditionGroup['match'], string> = {
  all: '모두',
  any: '하나라도',
};

export const VALUE_KIND_LABEL: Record<ConditionValueKind, string> = {
  range: '범위',
  many: '하나 이상 고르기',
  one: '하나 고르기',
  bool: '예/아니오',
};

export function isGroup(node: ConditionNode): node is ConditionGroup {
  return 'items' in node;
}

/** 키 목록의 오른쪽 글자: 값 종류, 승인된 사용자 제안 키는 `· 사용자 제안`(시안 ㉙-l) */
export function formatKeyKind(key: ConditionKey): string {
  const kind = VALUE_KIND_LABEL[key.valueKind];
  return key.proposal === 'approved' ? `${kind} · 사용자 제안` : kind;
}

/** 맨 위 목록을 1로 센 깊이. 조건은 1, 묶음은 안의 가장 깊은 것보다 1 크다 */
export function conditionDepth(node: ConditionNode): number {
  return isGroup(node) ? 1 + Math.max(0, ...node.items.map(conditionDepth)) : 1;
}

/** 조건 행의 제목: 조건은 키 이름, 묶음은 안의 제목을 ` · `로 이은 것(`재학상태 · 취업상태`, 비어 있으면 `자격 묶음`) */
export function conditionTitle(node: ConditionNode): string {
  if (!isGroup(node)) return node.key.label;
  return node.items.map(conditionTitle).join(' · ') || '자격 묶음';
}

/**
 * 값 요약. 범위는 `19~34세`이고 한쪽만 있으면 `19세 이상` · `34세 이하`(시안에 없는 추천안),
 * 예/아니오는 그대로, 여럿은 `·`로 잇는다(`재학·졸업 예정`)
 */
export function formatConditionValue(c: Condition): string {
  const v = c.value;
  switch (v.kind) {
    case 'range': {
      const unit = c.key.unit ?? '';
      if (v.from != null && v.to != null) return `${v.from}~${v.to}${unit}`;
      if (v.from != null) return `${v.from}${unit} 이상`;
      if (v.to != null) return `${v.to}${unit} 이하`;
      return '';
    }
    case 'bool':
      return v.value ? '예' : '아니오';
    case 'one':
      return v.value;
    case 'many':
      return v.values.join('·');
  }
}

/** 조건 행의 오른쪽 요약: 값 요약, 묶음은 `모두` · `하나라도`, 승인 전 제안 키는 ` · 제안 중`을 덧붙인다 */
export function formatConditionSummary(node: ConditionNode): string {
  if (isGroup(node)) return MATCH_LABEL[node.match];
  const value = formatConditionValue(node);
  return node.key.proposal === 'pending'
    ? [value, '제안 중'].filter(Boolean).join(' · ')
    : value;
}

/** 값이 다 채워졌는가(추가 버튼을 열 때): 범위는 한쪽이라도 있고 부터가 까지보다 크지 않아야 한다. 고르는 값은 하나 이상 */
export function isConditionValueComplete(value: ConditionValue): boolean {
  switch (value.kind) {
    case 'range':
      return (
        (value.from != null || value.to != null) &&
        !(value.from != null && value.to != null && value.from > value.to)
      );
    case 'bool':
      return true;
    case 'one':
      return value.value !== '';
    case 'many':
      return value.values.length > 0;
  }
}

/** 키를 막 골랐을 때의 값: 범위는 둘 다 비어 있고, 예/아니오는 `예`(시안 ㉙-l3), 고르는 값은 비어 있다 */
export function emptyConditionValue(key: ConditionKey): ConditionValue {
  switch (key.valueKind) {
    case 'range':
      return { kind: 'range' };
    case 'bool':
      return { kind: 'bool', value: true };
    case 'one':
      return { kind: 'one', value: '' };
    case 'many':
      return { kind: 'many', values: [] };
  }
}
