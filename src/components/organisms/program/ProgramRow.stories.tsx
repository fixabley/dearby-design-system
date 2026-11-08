import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/Program/ProgramRow',
  id: 'organisms-programrow',
  component: X.ProgramRow,
  args: { p: D.PROGRAMS[0], selected: false, onSelect: fn() },
  
  
  parameters: { width: 480 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 조직 줄 없이 이름과 소개만 */
export const Composed: Story = {
  render: () => (
    <X.RowList>
      {D.PROGRAMS.slice(0, 3).map((p) => (
        <X.ProgramRow key={p.id} p={p}>
          <X.ProgramRow.Media />
          <X.ProgramRow.Body><X.ProgramRow.Title /><X.ProgramRow.Description /></X.ProgramRow.Body>
        </X.ProgramRow>
      ))}
    </X.RowList>
  ),
};
