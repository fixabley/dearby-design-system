import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';

const meta: Meta = {
  title: 'Organisms/Shared/PickerRow',
  id: 'organisms-pickerrow',
  component: X.PickerRow,
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

function Demo() {
  const [v, setV] = useState('weekly');
  return (
    <X.ListGroup>
      <X.PickerRow
        icon="calendarGrid"
        title="빈도"
        value={v}
        onValueChange={setV}
        options={[
          { value: 'daily', label: '매일' },
          { value: 'weekly', label: '매주' },
          { value: 'monthly', label: '매월' },
        ]}
      />
    </X.ListGroup>
  );
}

/** 시안 `.srow`: 행 어디를 눌러도 목록이 열리고, 오른쪽에 값과 위아래 꺾쇠 */
export const Playground: Story = { render: () => <Demo /> };
