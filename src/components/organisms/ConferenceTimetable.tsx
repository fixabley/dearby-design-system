import { useState } from 'react';
import type { Session, TimeSlot, Track } from '@/types';
import { STATUS } from '@/icons';
import { Svg } from '@/components/atoms/Icon';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

function SessionCard({ s, track }: { s: Session; track: Track }) {
  const [saved, setSaved] = useState(!!s.saved);
  return (
    <Card className="relative flex flex-col gap-1 rounded-md p-2.5">
      <span className="self-start rounded-full px-2 py-1 text-micro font-bold leading-none" style={{ background: track.color + '2E', color: track.color }}>{track.name}</span>
      <div className="flex flex-wrap gap-1">{s.tags.map((t) => <Badge key={t} variant="mint" size="sm">{t}</Badge>)}</div>
      <b className="pr-6 text-body font-semibold leading-snug">{s.title}</b>
      <small className="text-[12px] text-muted-foreground">{s.who}</small>
      <Toggle variant="icon" size="auto" pressed={saved} onPressedChange={setSaved} aria-label="찜" className="absolute right-2 top-2" icon={saved ? 'heartFill' : 'heart'} />
    </Card>
  );
}

/** 컨퍼런스 시간표: 시간 열 + 트랙 열(가로 스크롤 없이 모두). 진행 중 행은 민트 면, 쉬는 시간은 한 줄 */
export function ConferenceTimetable({ tracks, slots }: { tracks: Track[]; slots: TimeSlot[] }) {
  const cols = `56px repeat(${tracks.length},minmax(0,1fr))`;
  return (
    <div className="flex flex-col gap-2.5">
      <div className="grid gap-3" style={{ gridTemplateColumns: cols }}><span />{tracks.map((t) => <span key={t.name} className="flex items-center gap-1.5 text-caption font-semibold"><i className="size-2 rounded-full" style={{ background: t.color }} />{t.name}</span>)}</div>
      {slots.map((s, i) => 'gap' in s
        ? <div key={i} className="pl-1 text-[12px] text-muted-foreground">{s.gap}</div>
        : (
          <div key={i} className={cn('grid gap-3 rounded-xl', s.now && '-mx-2 bg-accent p-2')} style={{ gridTemplateColumns: cols }}>
            <div className="pt-1 text-[12px] tabular-nums text-muted-foreground"><b className="block text-caption text-foreground">{s.from}</b>{s.to}
              {s.now && <span className="mt-1 flex items-center gap-1 whitespace-nowrap text-micro font-bold text-accent-foreground"><Svg src={STATUS.participating.svg} size={8} />진행 중</span>}</div>
            {'band' in s
              ? <div className="grid place-items-center rounded-md bg-card py-2.5 text-caption text-muted-foreground shadow-control" style={{ gridColumn: `2 / span ${tracks.length}` }}>{s.band}</div>
              : s.sessions.map((x, j) => x ? <SessionCard key={j} s={x} track={tracks[x.track]} /> : <div key={j} className="rounded-md ring-1 ring-inset ring-border" />)}
          </div>
        ))}
    </div>
  );
}
