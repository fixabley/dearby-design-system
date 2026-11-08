import type { IconName } from '@/icons';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/lib/utils';

/** 상세의 큰 행동 버튼(아이콘 위, 글자 아래). primary면 민트 면 */
export function ActionTile({ icon, label, primary, pressed, onClick }: { icon: IconName; label: string; primary?: boolean; pressed?: boolean; onClick?: () => void }) {
  return (
    <button type="button" aria-pressed={pressed} onClick={onClick} className={cn(
      'flex h-[66px] flex-col items-center justify-center gap-1.5 rounded-lg text-caption font-semibold shadow-control outline-none transition-[transform,background-color] duration-150 active:scale-[.97] focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-[22px] [&_svg]:text-accent-foreground',
      primary ? 'bg-accent text-accent-foreground' : 'bg-card text-foreground')}>
      <Icon name={icon} />{label}
    </button>
  );
}

export function ActionTiles({ added, onAdd, calendarLabel = '캘린더 구독' }: { added?: boolean; onAdd?: () => void; calendarLabel?: string }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <ActionTile icon={added ? 'check' : 'addCircle'} label={added ? '내 활동에 있음' : '내 활동에 추가'} primary pressed={added} onClick={onAdd} />
      <ActionTile icon="calendarAdd" label={calendarLabel} />
    </div>
  );
}
