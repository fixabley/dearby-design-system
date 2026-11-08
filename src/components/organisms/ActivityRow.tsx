import type { Activity } from '@/types';
import { KindLabel } from '@/components/atoms/KindLabel';
import { StatusGlyph } from '@/components/atoms/StatusGlyph';
import { Thumbnail } from '@/components/atoms/Thumbnail';
import { Item, ItemActions, ItemContent, ItemMedia } from '@/components/ui/item';
import { HostLine } from '@/components/atoms/HostLine';
import { MetaLine } from '@/components/molecules/MetaLine';
import { ProgressTrack } from '@/components/molecules/ProgressTrack';
import { TimetableButton } from '@/components/molecules/TimetableButton';
import { cn } from '@/lib/utils';

/** 홈·내 활동 행(shadcn Item 링크): 왼쪽 열(종류·썸네일·상태) + 조직 줄·제목·메타·진행 트랙 + 시간표. 고르면 민트 면 */
export function ActivityRow({ a, selected, onSelect, onTimetable }: { a: Activity; selected?: boolean; onSelect?: (a: Activity) => void; onTimetable?: () => void }) {
  return (
    <Item asChild size="row" selected={selected} className={cn(selected && '-mx-3 w-[calc(100%+24px)] px-3')}>
      <a href={`/activities/${a.id}`} aria-current={selected || undefined} onClick={(e) => { e.preventDefault(); onSelect?.(a); }}>
        <ItemMedia className="w-16 flex-col gap-[5px]"><KindLabel kind={a.kind} /><Thumbnail thumb={a.thumb} />{a.status && <StatusGlyph status={a.status} />}</ItemMedia>
        <ItemContent>
          <div className="flex items-center gap-2.5">
            <div className="min-w-0 flex-1">
              <HostLine {...a.host} />
              <div className="mt-[3px] line-clamp-2 text-headline leading-tight">{a.title}</div>
              <div className="mt-1 flex flex-col gap-[3px]">{a.metas.map((m) => <MetaLine key={m.label} {...m} />)}</div>
            </div>
            {a.timetable && <ItemActions><TimetableButton onClick={onTimetable} /></ItemActions>}
          </div>
          {a.steps && <ProgressTrack steps={a.steps} more={a.more} className="mt-2" />}
        </ItemContent>
      </a>
    </Item>
  );
}
