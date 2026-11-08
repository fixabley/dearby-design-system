import { Button } from '@/components/ui/button';

/** 컨퍼런스·시간표 기간 행 오른쪽(shadcn Button mint · tile-sm) */
export function TimetableButton({ onClick }: { onClick?: () => void }) {
  return <Button variant="mint" size="tile-sm" aria-label="시간표 보기" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick?.(); }} icon="timetable">시간표</Button>;
}
