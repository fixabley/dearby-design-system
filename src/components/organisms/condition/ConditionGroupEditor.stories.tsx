import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { AGE, STATUS_GROUP } from '@/stories/conditions';

const meta: Meta<typeof X.ConditionGroupEditor> = {
  title: 'Organisms/Condition/ConditionGroupEditor',
  id: 'organisms-conditiongroupeditor',
  component: X.ConditionGroupEditor,
  args: {
    value: STATUS_GROUP,
    onChange: fn(),
    onEdit: fn(),
    onAdd: fn(),
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

function Demo(args: React.ComponentProps<typeof X.ConditionGroupEditor>) {
  const [value, setValue] = useState(args.value);
  return <X.ConditionGroupEditor {...args} value={value} onChange={setValue} />;
}

/** ㉙-l4: 모두 | 하나라도, 안에 아이콘 없는 조건 행들과 `자격 추가` */
export const Playground: Story = { render: (args) => <Demo {...args} /> };

/** 안에 묶음이 또 있으면 행에 키 이름들과 `모두` · `하나라도`로 보인다(깊이 3까지) */
export const Nested: Story = {
  args: {
    value: {
      match: 'all',
      items: [AGE, STATUS_GROUP, { match: 'all', items: [AGE] }],
    },
  },
  render: (args) => <Demo {...args} />,
};

/** 바텀 시트 안(㉙-l4) */
export const InSheet: Story = {
  parameters: { layout: 'fullscreen', width: undefined },
  render: (args) => (
    <X.Sheet open modal={false}>
      <X.SheetContent>
        <X.SheetHeader title="자격 묶음" />
        <Demo {...args} className="overflow-y-auto pb-1" />
        <X.Button size="lg" block className="mt-4">
          추가
        </X.Button>
      </X.SheetContent>
    </X.Sheet>
  ),
};
