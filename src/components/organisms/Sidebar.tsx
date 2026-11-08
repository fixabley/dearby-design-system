import type { IconName } from '@/icons';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/lib/utils';

export type NavKey = 'home' | 'discover' | 'cards' | 'profile';
export const NAV: { key: NavKey; icon: IconName; label: string }[] = [
  { key: 'home', icon: 'home', label: '홈' }, { key: 'discover', icon: 'explore', label: '발견' }, { key: 'cards', icon: 'card', label: '명함' }, { key: 'profile', icon: 'profile', label: '내 프로필' },
];

function NavItem({ active, small, onClick, children }: { active?: boolean; small?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return <a href="#" aria-current={active ? 'page' : undefined} onClick={(e) => { e.preventDefault(); onClick?.(); }} className={cn(
    'flex items-center gap-3 rounded-md px-3 font-semibold outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-[22px]',
    small ? 'h-10 text-[14px]' : 'h-11 text-body', active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted')}>{children}</a>;
}

/** 웹 탐색(펼친 폰의 레일을 이름 붙은 사이드바로). 아래에 내가 연 모임 */
export function Sidebar({ active, onNavigate, hosted = [] }: { active?: string; onNavigate?: (k: string) => void; hosted?: string[] }) {
  return (
    <nav aria-label="탐색" className="flex w-[220px] flex-col gap-0.5 px-3 pt-5">
      <div className="px-3 pb-5 text-[22px] font-extrabold tracking-tight text-accent-foreground">dearby</div>
      {NAV.map((n) => <NavItem key={n.key} active={active === n.key} onClick={() => onNavigate?.(n.key)}><Icon name={n.icon} />{n.label}</NavItem>)}
      {hosted.length > 0 && <p className="mx-3 mb-1 mt-5 text-[12px] font-semibold text-muted-foreground">내가 연 모임</p>}
      {hosted.map((h) => <NavItem key={h} small active={active === h} onClick={() => onNavigate?.(h)}><span className="size-[22px] shrink-0 rounded-[7px] bg-gradient-to-br from-[#123B5C] to-[#2FB3B4]" />{h}</NavItem>)}
    </nav>
  );
}
