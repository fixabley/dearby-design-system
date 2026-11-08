import type { IconName } from '@/icons';
import { Icon } from '@/components/atoms/Icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export type GlassAction = { icon: IconName; label: string; onClick?: () => void };

function GlassButton({ a, badge }: { a: GlassAction; badge?: number }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="plain" size="icon-sm" aria-label={a.label} onClick={a.onClick} className="relative">
          <Icon name={a.icon} />
          {!!badge && <Badge variant="count" size="dot" className="absolute right-0.5 top-0.5">{badge}</Badge>}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{a.label}</TooltipContent>
    </Tooltip>
  );
}

/** 우상단 그룹(shadcn ButtonGroup 글래스): 화면 액션 | 설정·알림(늘 보임) */
export function GlassGroup({ actions = [], unread = 0 }: { actions?: GlassAction[]; unread?: number }) {
  return (
    <ButtonGroup variant="glass">
      {actions.map((a) => <GlassButton key={a.label} a={a} />)}
      {actions.length > 0 && <ButtonGroupSeparator />}
      <GlassButton a={{ icon: 'settings', label: '설정' }} />
      <GlassButton a={{ icon: 'bell', label: '알림' }} badge={unread} />
    </ButtonGroup>
  );
}
