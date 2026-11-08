import type { Team } from '@/types';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/** 팀 한 열: 이름·인원 + 팀원(역할은 이름표 배지). 끌어서 옮긴다 */
export function TeamColumn({ team, unassigned }: { team: Team; unassigned?: boolean }) {
  return (
    <Card className={cn('px-3.5 py-3.5', unassigned && 'bg-transparent shadow-none ring-1 ring-inset ring-border')}>
      <div className="mb-2 flex items-baseline gap-2"><b className="text-headline">{team.name}</b><small className="text-caption text-muted-foreground">{team.members.length}명</small></div>
      {team.members.map((m) => (
        <div key={m.name} draggable className="flex h-12 cursor-grab items-center gap-2.5 border-t border-border active:cursor-grabbing">
          <Avatar fallback={m.initial} /><b className="flex-1 text-body font-semibold">{m.name}</b>
          {m.roles?.map((r) => <Badge key={r} variant="outline" size="sm">{r}</Badge>)}
        </div>
      ))}
    </Card>
  );
}
