import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/TeamColumn',
  component: X.TeamColumn,
  args: { team: D.TEAMS[0], unassigned: false },
  
  
  parameters: { width: 260 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 역할이 있는 팀원만 */
export const Composed: Story = { render: () => <X.TeamColumn team={D.TEAMS[0]}><X.TeamColumn.Header />{D.TEAMS[0].members.filter((m) => m.roles?.length).map((m) => <X.TeamColumn.Member key={m.name} member={m} />)}</X.TeamColumn> };
