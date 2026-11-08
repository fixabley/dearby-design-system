import type { Team } from '@/types';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle } from '@/components/ui/card';
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { cn } from '@/lib/utils';

/** 팀 한 열(shadcn Card + Item): 이름·인원 + 팀원(역할은 이름표 Badge). 끌어서 옮긴다 */
export function TeamColumn({ team, unassigned }: { team: Team; unassigned?: boolean }) {
  return (
    <Card className={cn('px-3.5 py-3.5', unassigned && 'bg-transparent shadow-none ring-1 ring-inset ring-border')}>
      <CardTitle className="mb-2 flex items-baseline gap-2 text-headline">{team.name}<small className="text-caption font-normal text-muted-foreground">{team.members.length}명</small></CardTitle>
      {team.members.map((m) => (
        <Item key={m.name} draggable size="sm" className="h-12 cursor-grab border-t border-border px-0 active:cursor-grabbing">
          <ItemMedia><Avatar fallback={m.initial} /></ItemMedia>
          <ItemContent><ItemTitle className="text-body font-semibold">{m.name}</ItemTitle></ItemContent>
          {!!m.roles?.length && <ItemActions>{m.roles.map((r) => <Badge key={r} variant="outline" size="sm">{r}</Badge>)}</ItemActions>}
        </Item>
      ))}
    </Card>
  );
}
