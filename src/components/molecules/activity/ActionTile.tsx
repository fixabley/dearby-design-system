import { createContext, useContext, type ReactNode } from 'react';
import type { IconName } from '@/icons';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

/** 상세의 큰 행동 버튼. 켜고 끄는 것은 shadcn Toggle(tile), 한 번 누르는 것은 Button(tile) */
export function ActionTile({
  icon,
  label,
  primary,
  pressed,
  onClick,
}: {
  icon: IconName;
  label: string;
  primary?: boolean;
  pressed?: boolean;
  onClick?: () => void;
}) {
  if (pressed !== undefined)
    return (
      <Toggle
        variant={primary ? 'tileMint' : 'tile'}
        size="auto"
        pressed={pressed}
        onPressedChange={() => onClick?.()}
        icon={icon}
      >
        {label}
      </Toggle>
    );
  return (
    <Button
      variant={primary ? 'mint' : 'tile'}
      size="tile"
      onClick={onClick}
      icon={icon}
    >
      {label}
    </Button>
  );
}

type ActionTilesContextValue = {
  added: boolean;
  onAdd?: () => void;
  calendarLabel: string;
};
const ActionTilesContext = createContext<ActionTilesContextValue | null>(null);

function useActionTiles(part: string) {
  const ctx = useContext(ActionTilesContext);
  if (!ctx) throw new Error(`ActionTiles.${part}는 <ActionTiles> 안에서 쓴다`);
  return ctx;
}

/** 내 활동에 추가 타일(켜면 `내 활동에 있음`) */
function Add() {
  const { added, onAdd } = useActionTiles('Add');
  return (
    <ActionTile
      icon={added ? 'check' : 'addCircle'}
      label={added ? '내 활동에 있음' : '내 활동에 추가'}
      primary
      pressed={added}
      onClick={onAdd}
    />
  );
}

/** 캘린더 구독 타일 */
function Calendar() {
  const { calendarLabel } = useActionTiles('Calendar');
  return <ActionTile icon="calendarAdd" label={calendarLabel} />;
}

function ActionTilesRoot({
  added = false,
  onAdd,
  calendarLabel = '캘린더 구독',
  className,
  children,
}: {
  added?: boolean;
  onAdd?: () => void;
  calendarLabel?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <ActionTilesContext.Provider value={{ added, onAdd, calendarLabel }}>
      <div className={cn('grid grid-cols-2 gap-3', className)}>
        {children ?? (
          <>
            <Add />
            <Calendar />
          </>
        )}
      </div>
    </ActionTilesContext.Provider>
  );
}

/**
 * 상세의 행동 타일 두 칸(컴파운드): Add(내 활동에 추가) · Calendar(캘린더 구독).
 * 기본 조립은 `<ActionTiles added={added} onAdd={…} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<ActionTiles added={added} onAdd={…}><ActionTiles.Add /><ActionTile icon="share" label="공유" /></ActionTiles>`
 */
export const ActionTiles = Object.assign(ActionTilesRoot, { Add, Calendar });
