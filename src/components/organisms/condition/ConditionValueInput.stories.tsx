import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { CONDITION_KEYS } from '@/stories/conditions';

const AGE = CONDITION_KEYS[0];
const OPEN_SOURCE = CONDITION_KEYS[8];

const meta: Meta<typeof X.ConditionValueInput> = {
  title: 'Organisms/Condition/ConditionValueInput',
  id: 'organisms-conditionvalueinput',
  component: X.ConditionValueInput,
  args: {
    keyDef: AGE,
    value: { kind: 'range', from: 19, to: 34 },
    onChange: fn(),
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

function Demo(args: React.ComponentProps<typeof X.ConditionValueInput>) {
  const [value, setValue] = useState(args.value);
  return (
    <div className="flex flex-col gap-4">
      <X.ConditionValueInput {...args} value={value} onChange={setValue} />
      <X.Button block size="lg" disabled={!X.isConditionValueComplete(value)}>
        추가
      </X.Button>
    </div>
  );
}

/** ㉙-l2: 범위. `부터` · `까지` 칸 둘과 단위, 한쪽은 비워 둘 수 있다 */
export const Range: Story = { render: (args) => <Demo {...args} /> };

/** 처음 열었을 때: 둘 다 비어 있어 추가를 누를 수 없다 */
export const RangeEmpty: Story = {
  args: { value: { kind: 'range' } },
  render: (args) => <Demo {...args} />,
};

/** 부터가 까지보다 크면 잘못된 입력으로 표시된다(시안에 없는 추천안) */
export const RangeInvalid: Story = {
  args: { value: { kind: 'range', from: 40, to: 30 } },
  render: (args) => <Demo {...args} />,
};

/** ㉙-l3: 예/아니오. 예가 기본 */
export const Bool: Story = {
  args: { keyDef: OPEN_SOURCE, value: { kind: 'bool', value: true } },
  render: (args) => <Demo {...args} />,
};

/** 바텀 시트 안(㉙-l2) */
export const InSheet: Story = {
  parameters: { layout: 'fullscreen', width: undefined },
  render: (args) => (
    <X.Sheet open modal={false}>
      <X.SheetContent>
        <X.SheetHeader title={args.keyDef.label} />
        <div className="mt-3.5">
          <Demo {...args} />
        </div>
      </X.SheetContent>
    </X.Sheet>
  ),
};
