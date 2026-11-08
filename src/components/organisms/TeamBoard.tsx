import type { Team } from '@/types';
import { TeamColumn } from '@/components/molecules/TeamColumn';

/** 팀 보드: 팀 열 + 팀 없음 */
export function TeamBoard({ teams, unassigned }: { teams: Team[]; unassigned?: Team }) {
  return <div className="grid grid-cols-4 items-start gap-4">{teams.map((t) => <TeamColumn key={t.name} team={t} />)}{unassigned && <TeamColumn team={unassigned} unassigned />}</div>;
}
