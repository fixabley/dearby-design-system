import type { Activity } from '@/types';
import { KindLabel } from '@/components/atoms/KindLabel';
import { StatusGlyph } from '@/components/atoms/StatusGlyph';
import { Thumbnail } from '@/components/atoms/Thumbnail';
import { HostLine } from '@/components/molecules/HostLine';
import { MetaLine } from '@/components/molecules/MetaLine';
import { ProgressTrack } from '@/components/molecules/ProgressTrack';
import { TimetableButton } from '@/components/molecules/TimetableButton';
import { cn } from '@/lib/utils';

/** 홈·내 활동 행: 왼쪽 열(종류·썸네일·상태) + 조직 줄·제목·메타 + 진행 트랙. 고르면 민트 면 */
export function ActivityRow({ a, selected, onSelect, onTimetable }: { a: Activity; selected?: boolean; onSelect?: (a: Activity) => void; onTimetable?: () => void }) {
  return (
    <a href={`/activities/${a.id}`} aria-current={selected || undefined} onClick={(e) => { e.preventDefault(); onSelect?.(a); }}
      className={cn('grid grid-cols-[64px_minmax(0,1fr)] gap-x-3.5 rounded-2xl py-4 outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring',
        selected && '-mx-3 bg-accent px-3', onSelect && 'cursor-pointer')}>
      <span className="row-span-2 flex flex-col items-center gap-[5px]">
        <KindLabel kind={a.kind} /><Thumbnail thumb={a.thumb} />{a.status && <StatusGlyph status={a.status} />}
      </span>
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="min-w-0 flex-1">
          <HostLine {...a.host} />
          <div className="mt-[3px] line-clamp-2 text-headline leading-tight">{a.title}</div>
          <div className="mt-1 flex flex-col gap-[3px]">{a.metas.map((m) => <MetaLine key={m.label} {...m} />)}</div>
        </div>
        {a.timetable && <TimetableButton onClick={onTimetable} />}
      </div>
      {a.steps && <ProgressTrack steps={a.steps} more={a.more} className="mt-2" />}
    </a>
  );
}
