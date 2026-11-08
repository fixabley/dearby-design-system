import { createContext, useContext, type ReactNode } from 'react';
import type { Activity } from '@/types';
import { HostLine } from '@/components/atoms/program/HostLine';
import { KindLabel } from '@/components/atoms/activity/KindLabel';
import { StatusGlyph } from '@/components/atoms/activity/StatusGlyph';
import { Text } from '@/components/atoms/shared/Text';
import { Thumbnail } from '@/components/atoms/shared/Thumbnail';
import { Item, ItemActions, ItemContent, ItemMedia } from '@/components/ui/item';
import { MetaLine } from '@/components/molecules/shared/MetaLine';
import { ProgressTrack } from '@/components/molecules/activity/ProgressTrack';
import { TimetableButton } from '@/components/molecules/timetable/TimetableButton';
import { cn } from '@/lib/utils';

type ActivityRowContextValue = { a: Activity; selected?: boolean; onTimetable?: () => void };
const ActivityRowContext = createContext<ActivityRowContextValue | null>(null);

function useActivityRow(part: string) {
  const ctx = useContext(ActivityRowContext);
  if (!ctx) throw new Error(`ActivityRow.${part}는 <ActivityRow> 안에서 쓴다`);
  return ctx;
}

/** 왼쪽 열: 종류 · 썸네일 · 상태 */
function Media({ className }: { className?: string }) {
  const { a } = useActivityRow('Media');
  return (
    <ItemMedia className={cn('w-16 flex-col gap-[5px]', className)}>
      <KindLabel kind={a.kind} /><Thumbnail thumb={a.thumb} />{a.status && <StatusGlyph status={a.status} />}
    </ItemMedia>
  );
}

/** 조직 · 프로그램 줄 */
function Host() {
  const { a } = useActivityRow('Host');
  return <HostLine {...a.host} />;
}

/** 활동 이름(두 줄까지) */
function Title({ children }: { children?: ReactNode }) {
  const { a } = useActivityRow('Title');
  return <Text variant="rowTitle" lines={2} className="mt-[3px]">{children ?? a.title}</Text>;
}

/** 날짜·장소 메타 줄들 */
function Metas() {
  const { a } = useActivityRow('Metas');
  return <div className="mt-1 flex flex-col gap-[3px]">{a.metas.map((m) => <MetaLine key={m.label} {...m} />)}</div>;
}

/** 시간표 버튼(컨퍼런스·시간표 기간만) */
function Timetable() {
  const { a, onTimetable } = useActivityRow('Timetable');
  return a.timetable ? <ItemActions><TimetableButton onClick={onTimetable} /></ItemActions> : null;
}

/** 진행 단계 트랙 */
function Track({ className }: { className?: string }) {
  const { a } = useActivityRow('Track');
  return a.steps ? <ProgressTrack steps={a.steps} more={a.more} className={cn('mt-2', className)} /> : null;
}

/** 글 열: 조직 줄 · 이름 · 메타 | 시간표, 아래 트랙. children을 주면 그 조립으로 바꾼다 */
function Body({ children }: { children?: ReactNode }) {
  return (
    <ItemContent>
      {children ?? (
        <>
          <div className="flex items-center gap-2.5">
            <div className="min-w-0 flex-1"><Host /><Title /><Metas /></div>
            <Timetable />
          </div>
          <Track />
        </>
      )}
    </ItemContent>
  );
}

function ActivityRowRoot({ a, selected, onSelect, onTimetable, children }: {
  a: Activity; selected?: boolean; onSelect?: (a: Activity) => void; onTimetable?: () => void; children?: ReactNode;
}) {
  return (
    <ActivityRowContext.Provider value={{ a, selected, onTimetable }}>
      <Item asChild size="row" selected={selected} className={cn(selected && '-mx-3 w-[calc(100%+24px)] px-3')}>
        <a href={`/activities/${a.id}`} aria-current={selected || undefined} onClick={(e) => { e.preventDefault(); onSelect?.(a); }}>
          {children ?? <><Media /><Body /></>}
        </a>
      </Item>
    </ActivityRowContext.Provider>
  );
}

/**
 * 홈·내 활동 행(컴파운드): 왼쪽 열(Media) + 글 열(Body = Host · Title · Metas | Timetable, Track). 고르면 민트 면.
 * 기본 조립은 `<ActivityRow a={a} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<ActivityRow a={a}><ActivityRow.Media /><ActivityRow.Body><ActivityRow.Title /><ActivityRow.Track /></ActivityRow.Body></ActivityRow>`
 */
export const ActivityRow = Object.assign(ActivityRowRoot, { Media, Body, Host, Title, Metas, Timetable, Track });
