import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { TimeSlot, Track } from '@/types';
import { STATUS } from '@/icons';
import { Text } from '@/components/atoms/shared/Text';
import { Icon, Svg } from '@/components/foundations/Icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import { ScheduleItemDialog } from '@/components/organisms/timetable/ScheduleItemDialog';

export type TimetableView = 'all' | 'mine';
type Saved = Record<string, boolean>;

type ConferenceTimetableContextValue = {
  tracks: Track[];
  slots: TimeSlot[];
  saved: Saved;
  setSaved: (k: string, v: boolean) => void;
  onViewAll?: () => void;
};
const ConferenceTimetableContext =
  createContext<ConferenceTimetableContextValue | null>(null);

function useConferenceTimetable(part: string) {
  const ctx = useContext(ConferenceTimetableContext);
  if (!ctx)
    throw new Error(
      `ConferenceTimetable.${part}는 <ConferenceTimetable> 안에서 쓴다`,
    );
  return ctx;
}

const columns = (tracks: Track[]) =>
  `56px repeat(${tracks.length},minmax(0,1fr))`;

function TrackChip({ track }: { track: Track }) {
  return (
    <Text
      variant="micro"
      weight="bold"
      className="self-start rounded-full px-2 py-1"
      style={{ background: track.color + '2E', color: track.color }}
    >
      {track.name}
    </Text>
  );
}

function TimeCell({ s }: { s: Extract<TimeSlot, { from: string }> }) {
  return (
    <Text as="div" variant="caption" tone="muted" tabular className="pt-1">
      <Text as="b" variant="caption" tone="default" block>
        {s.from}
      </Text>
      {s.to}
      {s.now && (
        <Text
          variant="micro"
          weight="bold"
          tone="accent"
          nowrap
          className="mt-1 flex items-center gap-1"
        >
          <Svg src={STATUS.participating.svg} size={8} />
          진행 중
        </Text>
      )}
    </Text>
  );
}

/** 세션 카드(slot번째 시간의 index번째 트랙). 상세 설명이 있으면 카드 전체가 눌리고(펼친 링크 방식), 찜 하트는 따로 눌린다 */
function SessionCard({
  slot,
  index,
  className,
}: {
  slot: number;
  index: number;
  className?: string;
}) {
  const { tracks, slots, saved, setSaved } = useConferenceTimetable('Session');
  const [open, setOpen] = useState(false);
  const time = slots[slot];
  const s = 'sessions' in time ? time.sessions[index] : null;
  if (!s) return null;
  const track = tracks[s.track];
  const on = !!saved[`${slot}-${index}`];
  const onSaved = (v: boolean) => setSaved(`${slot}-${index}`, v);
  const heart = (
    <Toggle
      variant="icon"
      size="auto"
      pressed={on}
      onPressedChange={onSaved}
      aria-label="찜"
      icon={on ? 'heartFill' : 'heart'}
    />
  );
  return (
    <Card
      className={cn(
        'relative flex flex-col gap-1 rounded-md p-2.5',
        s.desc &&
          'transition-[box-shadow,transform] duration-150 hover:shadow-[0_4px_18px_rgba(20,32,31,.14)] active:scale-[.99]',
        className,
      )}
    >
      <TrackChip track={track} />
      <div className="flex flex-wrap gap-1">
        {s.tags.map((t) => (
          <Badge key={t} variant="mint" size="sm">
            {t}
          </Badge>
        ))}
      </div>
      <Text as="b" variant="innerTitle" className="pr-6">
        {s.title}
      </Text>
      <Text
        as="small"
        variant="caption"
        tone="muted"
        className="flex items-center gap-1"
      >
        {s.who}
        {s.desc && (
          <span className="text-accent-foreground [&_svg]:size-3">
            <Icon name="description" label="상세 설명 있음" />
          </span>
        )}
      </Text>
      {s.desc && (
        <button
          type="button"
          aria-label={`${s.title} 자세히`}
          onClick={() => setOpen(true)}
          className="absolute inset-0 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      )}
      <div className="absolute right-2 top-2 z-10">{heart}</div>
      {s.desc && (
        <ScheduleItemDialog
          open={open}
          onOpenChange={setOpen}
          badge={<TrackChip track={track} />}
          title={s.title}
          when={`${time.from} ~ ${time.to}`}
          tags={s.tags}
          description={s.desc}
          people={[
            {
              initial: s.who[0],
              name: s.who.split(' · ')[0],
              role: s.who.split(' · ')[1],
            },
          ]}
          action={
            <Toggle
              variant="follow"
              size="auto"
              pressed={on}
              onPressedChange={onSaved}
              icon={on ? 'heartFill' : 'heart'}
              className="self-start"
            >
              {on ? '내 시간표에 있음' : '내 시간표에 담기'}
            </Toggle>
          }
        />
      )}
    </Card>
  );
}

/** 트랙 머리 줄: 시간 열은 비우고 트랙마다 색 점 · 이름 */
function Head({ className }: { className?: string }) {
  const { tracks } = useConferenceTimetable('Head');
  return (
    <div
      className={cn('grid gap-3', className)}
      style={{ gridTemplateColumns: columns(tracks) }}
    >
      <span />
      {tracks.map((t) => (
        <Text
          key={t.name}
          variant="control"
          className="flex items-center gap-1.5"
        >
          <i className="size-2 rounded-full" style={{ background: t.color }} />
          {t.name}
        </Text>
      ))}
    </div>
  );
}

/** 전체 시간표: 트랙 머리 + 시간 열 + 트랙 열(가로 스크롤 없이 모두). 진행 중 행은 민트 면, 쉬는 시간은 한 줄 */
function All({ className }: { className?: string }) {
  const { tracks, slots } = useConferenceTimetable('All');
  const cols = columns(tracks);
  return (
    <div
      className={cn(
        'flex flex-col gap-2.5 animate-in fade-in-0 duration-300',
        className,
      )}
    >
      <Head />
      {slots.map((s, i) =>
        'gap' in s ? (
          <Text
            key={i}
            as="div"
            variant="caption"
            tone="muted"
            className="pl-1"
          >
            {s.gap}
          </Text>
        ) : (
          <div
            key={i}
            className={cn(
              'grid gap-3 rounded-xl',
              s.now && '-mx-2 bg-accent p-2',
            )}
            style={{ gridTemplateColumns: cols }}
          >
            <TimeCell s={s} />
            {'band' in s ? (
              <Text
                as="div"
                variant="caption"
                tone="muted"
                className="grid place-items-center rounded-md bg-card py-2.5 shadow-control"
                style={{ gridColumn: `2 / span ${tracks.length}` }}
              >
                {s.band}
              </Text>
            ) : (
              s.sessions.map((x, j) =>
                x ? (
                  <SessionCard key={j} slot={i} index={j} />
                ) : (
                  <div
                    key={j}
                    className="rounded-md ring-1 ring-inset ring-border"
                  />
                ),
              )
            )}
          </div>
        ),
      )}
    </div>
  );
}

/** 내 시간표: 찜한 세션만 시간순 한 열(가운데 최대 600). 하트를 끄면 바로 빠지고, 하나도 없으면 빈 화면 + 전체 시간표 보기 */
function Mine({ className }: { className?: string }) {
  const { slots, saved, onViewAll } = useConferenceTimetable('Mine');
  const rows = slots
    .map((s, i) => {
      if ('gap' in s) return null;
      if ('band' in s) return { s, i, band: s.band };
      const picks = s.sessions
        .map((x, j) =>
          x && saved[`${i}-${j}`] ? (
            <SessionCard key={j} slot={i} index={j} />
          ) : null,
        )
        .filter(Boolean);
      return picks.length ? { s, i, picks } : null;
    })
    .filter((r): r is NonNullable<typeof r> => !!r);
  const any = rows.some((r) => 'picks' in r);
  return (
    <div
      className={cn(
        'mx-auto flex max-w-[600px] flex-col gap-2.5 animate-in fade-in-0 duration-300',
        className,
      )}
    >
      {!any && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Text as="b" variant="subtitle">
            찜한 세션이 없어요
          </Text>
          {onViewAll && (
            <Button variant="mint" onClick={onViewAll}>
              전체 시간표 보기
            </Button>
          )}
        </div>
      )}
      {any &&
        rows.map((r) => (
          <div
            key={r.i}
            className={cn(
              'grid grid-cols-[56px_minmax(0,1fr)] gap-3 rounded-xl',
              r.s.now && '-mx-2 bg-accent p-2',
            )}
          >
            <TimeCell s={r.s} />
            {'band' in r ? (
              <Text
                as="div"
                variant="caption"
                tone="muted"
                className="grid place-items-center rounded-md bg-card py-2.5 shadow-control"
              >
                {r.band}
              </Text>
            ) : (
              <div className="flex flex-col gap-2">{r.picks}</div>
            )}
          </div>
        ))}
    </div>
  );
}

function ConferenceTimetableRoot({
  tracks,
  slots,
  view = 'all',
  saved: savedProp,
  onSavedChange,
  onViewAll,
  children,
}: {
  tracks: Track[];
  slots: TimeSlot[];
  view?: TimetableView;
  saved?: Saved;
  onSavedChange?: (s: Saved) => void;
  onViewAll?: () => void;
  children?: ReactNode;
}) {
  const initial = useMemo(() => {
    const m: Saved = {};
    slots.forEach(
      (s, i) =>
        'sessions' in s &&
        s.sessions.forEach((x, j) => {
          if (x?.saved) m[`${i}-${j}`] = true;
        }),
    );
    return m;
  }, [slots]);
  const [inner, setInner] = useState(initial);
  const saved = savedProp ?? inner;
  const setSaved = (k: string, v: boolean) => {
    const next = { ...saved, [k]: v };
    if (!savedProp) setInner(next);
    onSavedChange?.(next);
  };
  return (
    <ConferenceTimetableContext.Provider
      value={{ tracks, slots, saved, setSaved, onViewAll }}
    >
      {children ?? (view === 'mine' ? <Mine /> : <All />)}
    </ConferenceTimetableContext.Provider>
  );
}

/**
 * 컨퍼런스 시간표(컴파운드): All(Head 트랙 머리 + 시간 열 + 트랙 열, 가로 스크롤 없이 모두) · Mine(찜한 세션만 시간순 한 열, 가운데 최대 600) · Session(세션 카드).
 * 진행 중 행은 민트 면, 쉬는 시간은 한 줄. 찜 상태는 루트가 쥐고(saved로 바깥에서 쥘 수도 있다) 모든 부품이 함께 쓴다.
 * 기본 조립은 view에 따라 All 또는 Mine: `<ConferenceTimetable tracks={…} slots={…} view="all" />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<ConferenceTimetable tracks={…} slots={…}><ConferenceTimetable.Mine /><ConferenceTimetable.All /></ConferenceTimetable>`
 */
export const ConferenceTimetable = Object.assign(ConferenceTimetableRoot, {
  Head,
  All,
  Mine,
  Session: SessionCard,
});
