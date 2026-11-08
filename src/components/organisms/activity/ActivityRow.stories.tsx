import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/Activity/ActivityRow',
  id: 'organisms-activityrow',
  component: X.ActivityRow,
  args: { a: D.ACTIVITIES[2], selected: false, onSelect: fn(), onTimetable: fn() },
  
  
  parameters: { width: 480 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};
export const List: Story = { render: function R() { const [{ selectedId = '1287' }, update] = useArgs(); return <X.RowList>{D.ACTIVITIES.map((a) => <X.ActivityRow key={a.id} a={a} selected={selectedId === a.id} onSelect={(x) => update({ selectedId: x.id })} />)}</X.RowList>; } };

/** 컴파운드로 바꿔 조립: 메타·시간표 없이 이름과 트랙만 */
export const Composed: Story = {
  render: () => (
    <X.RowList>
      {D.ACTIVITIES.slice(0, 3).map((a) => (
        <X.ActivityRow key={a.id} a={a}>
          <X.ActivityRow.Media />
          <X.ActivityRow.Body><X.ActivityRow.Host /><X.ActivityRow.Title /><X.ActivityRow.Track /></X.ActivityRow.Body>
        </X.ActivityRow>
      ))}
    </X.RowList>
  ),
};
