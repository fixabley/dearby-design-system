import { createContext, useContext, type ReactNode } from 'react';
import type { IconName } from '@/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@/components/ui/button-group';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export type GlassAction = {
  icon: IconName;
  label: string;
  onClick?: () => void;
};

type GlassGroupContextValue = { unread: number };
const GlassGroupContext = createContext<GlassGroupContextValue | null>(null);

function useGlassGroup(part: string) {
  const ctx = useContext(GlassGroupContext);
  if (!ctx) throw new Error(`GlassGroup.${part}는 <GlassGroup> 안에서 쓴다`);
  return ctx;
}

function GlassButton({
  a,
  badge,
  className,
}: {
  a: GlassAction;
  badge?: number;
  className?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="plain"
          size="icon-sm"
          aria-label={a.label}
          onClick={a.onClick}
          className={cn('relative', className)}
          icon={a.icon}
        >
          {!!badge && (
            <Badge
              variant="count"
              size="dot"
              className="absolute right-0.5 top-0.5"
            >
              {badge}
            </Badge>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{a.label}</TooltipContent>
    </Tooltip>
  );
}

/** 화면 액션 버튼 하나(이름은 툴팁으로) */
function Action({ className, ...a }: GlassAction & { className?: string }) {
  return <GlassButton a={a} className={className} />;
}

/** 화면 액션과 설정·알림 사이 구분선 */
function Separator({ className }: { className?: string }) {
  return <ButtonGroupSeparator className={className} />;
}

/** 설정 버튼 */
function Settings({ className }: { className?: string }) {
  return (
    <GlassButton
      a={{ icon: 'settings', label: '설정' }}
      className={className}
    />
  );
}

/** 알림 버튼(안 읽은 개수 점) */
function Notifications({ className }: { className?: string }) {
  const { unread } = useGlassGroup('Notifications');
  return (
    <GlassButton
      a={{ icon: 'bell', label: '알림' }}
      badge={unread}
      className={className}
    />
  );
}

function GlassGroupRoot({
  actions = [],
  unread = 0,
  children,
}: {
  actions?: GlassAction[];
  unread?: number;
  children?: ReactNode;
}) {
  return (
    <GlassGroupContext.Provider value={{ unread }}>
      <ButtonGroup variant="glass">
        {children ?? (
          <>
            {actions.map((a) => (
              <Action key={a.label} {...a} />
            ))}
            {actions.length > 0 && <Separator />}
            <Settings />
            <Notifications />
          </>
        )}
      </ButtonGroup>
    </GlassGroupContext.Provider>
  );
}

/**
 * 우상단 그룹(shadcn ButtonGroup 글래스, 컴파운드): 화면 액션(Action) | Separator | 설정(Settings) · 알림(Notifications, 늘 보임).
 * 기본 조립은 `<GlassGroup actions={[…]} unread={2} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<GlassGroup unread={2}><GlassGroup.Action icon="share" label="공유" /><GlassGroup.Separator /><GlassGroup.Notifications /></GlassGroup>`
 */
export const GlassGroup = Object.assign(GlassGroupRoot, {
  Action,
  Separator,
  Settings,
  Notifications,
});
