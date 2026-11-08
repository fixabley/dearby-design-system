import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { cn } from '@/lib/utils';
import { NAV, type NavKey } from './Sidebar';

/** 모바일 탭 막대(shadcn ButtonGroup 글래스 + Button) */
export function TabBar({ active, onNavigate }: { active: NavKey; onNavigate?: (k: NavKey) => void }) {
  return (
    <ButtonGroup variant="glass" aria-label="탭 막대" className="h-16 w-full gap-1 p-1.5">
      {NAV.map((n) => (
        <Button key={n.key} variant="plain" aria-current={n.key === active ? 'page' : undefined} onClick={() => onNavigate?.(n.key)} className={cn(
          'h-full flex-1 flex-col gap-0.5 rounded-full px-0 text-[10px] [&_svg]:size-6', n.key === active && 'bg-accent text-accent-foreground')}><Icon name={n.icon} />{n.label}</Button>
      ))}
    </ButtonGroup>
  );
}
