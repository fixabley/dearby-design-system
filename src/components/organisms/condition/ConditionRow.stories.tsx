import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { AGE, STATUS_GROUP, SWIFT } from '@/stories/conditions';

const meta: Meta<typeof X.ConditionRow> = {
  title: 'Organisms/Condition/ConditionRow',
  id: 'organisms-conditionrow',
  component: X.ConditionRow,
  args: { node: AGE, onEdit: fn() },
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

/** ㉙-c2: 범위 조건. 사람 원 아이콘 · 키 이름 · 요약(`19~34세`) · 꺾쇠, 누르면 고치기 */
export const Playground: Story = {};

/** 한쪽만 채운 범위(시안에 없는 추천안): `19세 이상` */
export const OneSided: Story = {
  args: { node: { ...AGE, value: { kind: 'range', from: 19 } } },
};

/** ㉙-c2: 승인 전 제안 키는 요약 뒤에 `제안 중` */
export const Proposed: Story = { args: { node: SWIFT } };

/** ㉙-c2: 묶음은 제목이 안의 키 이름들, 요약이 `모두` · `하나라도` */
export const Group: Story = { args: { node: STATUS_GROUP } };

/** ㉙-l4: 묶음 안의 행은 아이콘이 없다 */
export const NoIcon: Story = {
  args: { node: STATUS_GROUP.items[0], icon: null },
};

/** 이름이 길면 줄여 보인다 */
export const LongTitle: Story = {
  args: {
    node: {
      key: {
        id: 'long',
        label: '오픈소스 프로젝트 메인테이너 활동 경험',
        valueKind: 'bool',
      },
      value: { kind: 'bool', value: true },
    },
  },
};
