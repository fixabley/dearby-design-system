import type { ReactNode } from 'react';
import { Icon } from '@/components/foundations/Icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NAV } from '@/lib/nav';
export { NAV, type NavKey } from '@/lib/nav';


function NavItem({ active, small, onClick, children }: { active?: boolean; small?: boolean; onClick?: () => void; children: ReactNode }) {
  return (
    <Button asChild variant="plain" className={cn('justify-start gap-3 rounded-md px-3 shadow-none active:scale-100 [&_svg]:size-[22px]', small ? 'h-10 text-[14px]' : 'h-11 text-body',
      active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted')}>
      <a href="#" aria-current={active ? 'page' : undefined} onClick={(e) => { e.preventDefault(); onClick?.(); }}>{children}</a>
    </Button>
  );
}

/** 웹 탐색(shadcn Button 링크). 펼친 폰의 레일을 이름 붙은 사이드바로, 아래에 내가 연 모임 */
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
