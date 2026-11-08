import { Icon } from '@/components/atoms/Icon';

/** 컨퍼런스·시간표 기간 행 오른쪽 */
export function TimetableButton({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" aria-label="시간표 보기" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick?.(); }}
      className="flex h-[54px] w-14 flex-col items-center justify-center gap-[3px] rounded-md bg-accent text-caption font-semibold text-accent-foreground shadow-control outline-none transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-[26px]">
      <Icon name="timetable" />시간표
    </button>
  );
}
