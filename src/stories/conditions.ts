import type {
  Condition,
  ConditionGroup,
  ConditionKey,
} from '@/components/organisms/condition/condition';

/** ㉙-l의 공용 키(대상자 조건 어휘 + 성별 + 승인된 사용자 제안 키) */
export const CONDITION_KEYS: ConditionKey[] = [
  { id: 'age', label: '나이', valueKind: 'range', unit: '세' },
  { id: 'birthYear', label: '출생연도', valueKind: 'range', unit: '년' },
  { id: 'grade', label: '학년', valueKind: 'range', unit: '학년' },
  { id: 'education', label: '학력', valueKind: 'many' },
  { id: 'enrollment', label: '재학상태', valueKind: 'many' },
  { id: 'employment', label: '취업상태', valueKind: 'many' },
  { id: 'career', label: '경력연수', valueKind: 'range', unit: '년' },
  { id: 'gender', label: '성별', valueKind: 'one' },
  {
    id: 'openSource',
    label: '오픈소스 기여 경험',
    valueKind: 'bool',
    proposal: 'approved',
  },
];

const key = (id: string) => CONDITION_KEYS.find((k) => k.id === id)!;

/** ㉙-c2의 첫 자격: 나이 19~34세 */
export const AGE: Condition = {
  key: key('age'),
  value: { kind: 'range', from: 19, to: 34 },
};

/** ㉙-l4의 묶음: 재학상태 · 취업상태 하나라도 */
export const STATUS_GROUP: ConditionGroup = {
  match: 'any',
  items: [
    {
      key: key('enrollment'),
      value: { kind: 'many', values: ['재학', '졸업 예정'] },
    },
    { key: key('employment'), value: { kind: 'many', values: ['미취업'] } },
  ],
};

/** ㉙-c2의 세 번째 자격: 승인 전 제안 키 `Swift 앱 출시 경험`, 값은 예 */
export const SWIFT: Condition = {
  key: {
    id: 'swiftLaunch',
    label: 'Swift 앱 출시 경험',
    valueKind: 'bool',
    proposal: 'pending',
  },
  value: { kind: 'bool', value: true },
};
