import type { IconName } from '@/icons';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';

/** 상세의 큰 행동 버튼. 켜고 끄는 것은 shadcn Toggle(tile), 한 번 누르는 것은 Button(tile) */
export function ActionTile({ icon, label, primary, pressed, onClick }: { icon: IconName; label: string; primary?: boolean; pressed?: boolean; onClick?: () => void }) {
  if (pressed !== undefined) return <Toggle variant={primary ? 'tileMint' : 'tile'} size="auto" pressed={pressed} onPressedChange={() => onClick?.()} icon={icon}>{label}</Toggle>;
  return <Button variant={primary ? 'mint' : 'tile'} size="tile" onClick={onClick} icon={icon}>{label}</Button>;
}

export function ActionTiles({ added = false, onAdd, calendarLabel = '캘린더 구독' }: { added?: boolean; onAdd?: () => void; calendarLabel?: string }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <ActionTile icon={added ? 'check' : 'addCircle'} label={added ? '내 활동에 있음' : '내 활동에 추가'} primary pressed={added} onClick={onAdd} />
      <ActionTile icon="calendarAdd" label={calendarLabel} />
    </div>
  );
}
