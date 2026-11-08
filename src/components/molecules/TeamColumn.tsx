import { createContext, useContext, type ReactNode } from 'react';
import type { Team } from '@/types';
import { Text } from '@/components/atoms/Text';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle } from '@/components/ui/card';
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { cn } from '@/lib/utils';

type TeamColumnContextValue = { team: Team };
const TeamColumnContext = createContext<TeamColumnContextValue | null>(null);

function useTeamColumn(part: string) {
  const ctx = useContext(TeamColumnContext);
  if (!ctx) throw new Error(`TeamColumn.${part}는 <TeamColumn> 안에서 쓴다`);
  return ctx;
}

/** 머리: 팀 이름 · 인원 */
function Header({ className }: { className?: string }) {
  const { team } = useTeamColumn('Header');
  return (
    <CardTitle className={cn('mb-2 flex items-baseline gap-2', className)}>
      <Text variant="rowTitle">{team.name}</Text><Text as="small" variant="caption" weight="regular" tone="muted">{team.members.length}명</Text>
    </CardTitle>
  );
}

/** 팀원 한 명(끌어서 옮긴다): 아바타 · 이름 · 역할 이름표 */
function Member({ member: m, className }: { member: Team['members'][number]; className?: string }) {
  return (
    <Item draggable size="sm" className={cn('h-12 cursor-grab border-t border-border px-0 active:cursor-grabbing', className)}>
      <ItemMedia><Avatar fallback={m.initial} /></ItemMedia>
      <ItemContent><ItemTitle><Text variant="innerTitle">{m.name}</Text></ItemTitle></ItemContent>
      {!!m.roles?.length && <ItemActions>{m.roles.map((r) => <Badge key={r} variant="outline" size="sm">{r}</Badge>)}</ItemActions>}
    </Item>
  );
}

/** 팀원 전부 */
function Members() {
  const { team } = useTeamColumn('Members');
  return <>{team.members.map((m) => <Member key={m.name} member={m} />)}</>;
}

function TeamColumnRoot({ team, unassigned, className, children }: { team: Team; unassigned?: boolean; className?: string; children?: ReactNode }) {
  return (
    <TeamColumnContext.Provider value={{ team }}>
      <Card className={cn('px-3.5 py-3.5', unassigned && 'bg-transparent shadow-none ring-1 ring-inset ring-border', className)}>
        {children ?? <><Header /><Members /></>}
      </Card>
    </TeamColumnContext.Provider>
  );
}

/**
 * 팀 한 열(shadcn Card + Item, 컴파운드): Header(이름 · 인원) · Members(Member마다 아바타 · 이름 · 역할 이름표 Badge). 끌어서 옮긴다.
 * 기본 조립은 `<TeamColumn team={team} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<TeamColumn team={team}><TeamColumn.Header /><TeamColumn.Member member={team.members[0]} /></TeamColumn>`
 */
export const TeamColumn = Object.assign(TeamColumnRoot, { Header, Members, Member });
