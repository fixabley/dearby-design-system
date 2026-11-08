import type { ReactNode } from 'react';
import type { Team } from '@/types';
import { TeamColumn } from '@/components/molecules/TeamColumn';

function TeamBoardRoot({ teams, unassigned, children }: { teams: Team[]; unassigned?: Team; children?: ReactNode }) {
  return <div className="grid grid-cols-4 items-start gap-4">{children ?? <>{teams.map((t) => <TeamColumn key={t.name} team={t} />)}{unassigned && <TeamColumn team={unassigned} unassigned />}</>}</div>;
}

/**
 * 팀 보드(컴파운드): 팀마다 Column(= TeamColumn) + 팀 없음 Column(unassigned).
 * 기본 조립은 `<TeamBoard teams={teams} unassigned={rest} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<TeamBoard teams={teams}><TeamBoard.Column team={rest} unassigned /><TeamBoard.Column team={teams[0]} /></TeamBoard>`
 */
export const TeamBoard = Object.assign(TeamBoardRoot, { Column: TeamColumn });
