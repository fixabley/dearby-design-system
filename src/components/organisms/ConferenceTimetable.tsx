import { useMemo, useState } from 'react';
import type { Session, TimeSlot, Track } from '@/types';
import { STATUS } from '@/icons';
import { Icon, Svg } from '@/components/atoms/Icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import { ScheduleItemDialog } from './ScheduleItemDialog';

export type TimetableView = 'all' | 'mine';
type Saved = Record<string, boolean>;

function TrackChip({ track }: { track: Track }) {
  return <span className="self-start rounded-full px-2 py-1 text-micro font-bold leading-none" style={{ background: track.color + '2E', color: track.color }}>{track.name}</span>;
}

/** 세션 카드. 상세 설명이 있으면 카드 전체가 눌리고(펼친 링크 방식), 찜 하트는 따로 눌린다 */
function SessionCard({ s, track, when, saved, onSaved }: { s: Session; track: Track; when: string; saved: boolean; onSaved: (v: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const heart = <Toggle variant="icon" size="auto" pressed={saved} onPressedChange={onSaved} aria-label="찜" icon={saved ? 'heartFill' : 'heart'} />;
  return (
    <Card className={cn('relative flex flex-col gap-1 rounded-md p-2.5', s.desc && 'transition-[box-shadow,transform] duration-150 hover:shadow-[0_4px_18px_rgba(20,32,31,.14)] active:scale-[.99]')}>
      <TrackChip track={track} />
      <div className="flex flex-wrap gap-1">{s.tags.map((t) => <Badge key={t} variant="mint" size="sm">{t}</Badge>)}</div>
      <b className="pr-6 text-body font-semibold leading-snug">{s.title}</b>
      <small className="flex items-center gap-1 text-[12px] text-muted-foreground">{s.who}
        {s.desc && <span className="text-accent-foreground [&_svg]:size-3"><Icon name="description" label="상세 설명 있음" /></span>}</small>
      {s.desc && <button type="button" aria-label={`${s.title} 자세히`} onClick={() => setOpen(true)} className="absolute inset-0 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring" />}
      <div className="absolute right-2 top-2 z-10">{heart}</div>
      {s.desc && (
        <ScheduleItemDialog open={open} onOpenChange={setOpen} badge={<TrackChip track={track} />} title={s.title} when={when} tags={s.tags} description={s.desc}
          people={[{ initial: s.who[0], name: s.who.split(' · ')[0], role: s.who.split(' · ')[1] }]}
          action={<Toggle variant="follow" size="auto" pressed={saved} onPressedChange={onSaved} icon={saved ? 'heartFill' : 'heart'} className="self-start">{saved ? '내 시간표에 있음' : '내 시간표에 담기'}</Toggle>} />
      )}
    </Card>
  );
}

function TimeCell({ s }: { s: Extract<TimeSlot, { from: string }> }) {
  return (
    <div className="pt-1 text-[12px] tabular-nums text-muted-foreground"><b className="block text-caption text-foreground">{s.from}</b>{s.to}
      {s.now && <span className="mt-1 flex items-center gap-1 whitespace-nowrap text-micro font-bold text-accent-foreground"><Svg src={STATUS.participating.svg} size={8} />진행 중</span>}</div>
  );
}

/**
 * 컨퍼런스 시간표. view=all은 시간 열 + 트랙 열(가로 스크롤 없이 모두), view=mine은 찜한 세션만 시간순 한 열(가운데 최대 600).
 * 진행 중 행은 민트 면, 쉬는 시간은 한 줄. 찜 상태는 saved로 바깥에서 쥘 수도 있다.
 */
export function ConferenceTimetable({ tracks, slots, view = 'all', saved: savedProp, onSavedChange, onViewAll }: {
  tracks: Track[]; slots: TimeSlot[]; view?: TimetableView; saved?: Saved; onSavedChange?: (s: Saved) => void; onViewAll?: () => void;
}) {
  const initial = useMemo(() => {
    const m: Saved = {};
    slots.forEach((s, i) => 'sessions' in s && s.sessions.forEach((x, j) => { if (x?.saved) m[`${i}-${j}`] = true; }));
    return m;
  }, [slots]);
  const [inner, setInner] = useState(initial);
  const saved = savedProp ?? inner;
  const setSaved = (k: string, v: boolean) => { const next = { ...saved, [k]: v }; if (!savedProp) setInner(next); onSavedChange?.(next); };
  const card = (x: Session, i: number, j: number, s: { from: string; to: string }) =>
    <SessionCard key={j} s={x} track={tracks[x.track]} when={`${s.from} ~ ${s.to}`} saved={!!saved[`${i}-${j}`]} onSaved={(v) => setSaved(`${i}-${j}`, v)} />;

  if (view === 'mine') {
    const rows = slots.map((s, i) => {
      if ('gap' in s) return null;
      if ('band' in s) return { s, i, band: s.band };
      const picks = s.sessions.map((x, j) => (x && saved[`${i}-${j}`] ? card(x, i, j, s) : null)).filter(Boolean);
      return picks.length ? { s, i, picks } : null;
    }).filter((r): r is NonNullable<typeof r> => !!r);
    const any = rows.some((r) => 'picks' in r);
    return (
      <div key="mine" className="mx-auto flex max-w-[600px] flex-col gap-2.5 animate-in fade-in-0 duration-300">
        {!any && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <b className="text-headline">찜한 세션이 없어요</b>
            {onViewAll && <Button variant="mint" onClick={onViewAll}>전체 시간표 보기</Button>}
          </div>
        )}
        {any && rows.map((r) => (
          <div key={r.i} className={cn('grid grid-cols-[56px_minmax(0,1fr)] gap-3 rounded-xl', r.s.now && '-mx-2 bg-accent p-2')}>
            <TimeCell s={r.s} />
            {'band' in r ? <div className="grid place-items-center rounded-md bg-card py-2.5 text-caption text-muted-foreground shadow-control">{r.band}</div>
              : <div className="flex flex-col gap-2">{r.picks}</div>}
          </div>
        ))}
      </div>
    );
  }

  const cols = `56px repeat(${tracks.length},minmax(0,1fr))`;
  return (
    <div key="all" className="flex flex-col gap-2.5 animate-in fade-in-0 duration-300">
      <div className="grid gap-3" style={{ gridTemplateColumns: cols }}><span />{tracks.map((t) => <span key={t.name} className="flex items-center gap-1.5 text-caption font-semibold"><i className="size-2 rounded-full" style={{ background: t.color }} />{t.name}</span>)}</div>
      {slots.map((s, i) => 'gap' in s
        ? <div key={i} className="pl-1 text-[12px] text-muted-foreground">{s.gap}</div>
        : (
          <div key={i} className={cn('grid gap-3 rounded-xl', s.now && '-mx-2 bg-accent p-2')} style={{ gridTemplateColumns: cols }}>
            <TimeCell s={s} />
            {'band' in s
              ? <div className="grid place-items-center rounded-md bg-card py-2.5 text-caption text-muted-foreground shadow-control" style={{ gridColumn: `2 / span ${tracks.length}` }}>{s.band}</div>
              : s.sessions.map((x, j) => (x ? card(x, i, j, s) : <div key={j} className="rounded-md ring-1 ring-inset ring-border" />))}
          </div>
        ))}
    </div>
  );
}
