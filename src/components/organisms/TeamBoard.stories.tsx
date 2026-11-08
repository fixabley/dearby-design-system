import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/TeamBoard',
  component: X.TeamBoard,
  args: { teams: D.TEAMS, unassigned: D.UNASSIGNED },
  
  
  parameters: { width: 1040 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 팀 없음을 맨 앞에 */
export const Composed: Story = { render: (args: Record<string, any>) => <X.TeamBoard teams={args.teams}><X.TeamBoard.Column team={args.unassigned} unassigned />{(args.teams as X.Team[]).map((t) => <X.TeamBoard.Column key={t.name} team={t} />)}</X.TeamBoard> };
