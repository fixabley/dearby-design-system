import { Icon } from '@/components/atoms/Icon';
import { glass } from '@/components/molecules/GlassGroup';
import { cn } from '@/lib/utils';
import { NAV, type NavKey } from './Sidebar';

/** 모바일 탭 막대(떠 있는 글래스) */
export function TabBar({ active, onNavigate }: { active: NavKey; onNavigate?: (k: NavKey) => void }) {
  return (
    <nav aria-label="탭 막대" className={`flex h-16 items-center gap-1 rounded-full p-1.5 ${glass}`}>
      {NAV.map((n) => (
        <button key={n.key} type="button" onClick={() => onNavigate?.(n.key)} aria-current={n.key === active ? 'page' : undefined} className={cn(
          'flex h-full flex-1 flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-semibold transition-colors duration-200 [&_svg]:size-6',
          n.key === active ? 'bg-accent text-accent-foreground' : 'text-foreground')}><Icon name={n.icon} />{n.label}</button>
      ))}
    </nav>
  );
}
