import { createContext, useContext, type ReactNode } from 'react';
import { Text } from '@/components/atoms/shared/Text';
import { Wordmark } from '@/components/atoms/shared/Wordmark';
import { Icon } from '@/components/foundations/Icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NAV } from '@/lib/nav';
export { NAV, type NavKey } from '@/lib/nav';

type SidebarContextValue = {
  active?: string;
  onNavigate?: (k: string) => void;
  hosted: string[];
};
const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebar(part: string) {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error(`Sidebar.${part}는 <Sidebar> 안에서 쓴다`);
  return ctx;
}

/** 글자 로고(Wordmark) 줄. 높이 33 · 위 5는 탐색이 시작하는 자리와 로고 위치를 예전 줄 높이에 맞춘 값 */
function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('mb-5 flex h-[33px] px-3 pt-[5px]', className)}>
      <Wordmark />
    </div>
  );
}

/** 탐색 한 줄(shadcn Button 링크). value가 active와 같으면 민트 면 */
function NavItem({
  value,
  small,
  className,
  children,
}: {
  value: string;
  small?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const { active, onNavigate } = useSidebar('NavItem');
  const on = active === value;
  return (
    <Button
      asChild
      variant="plain"
      className={cn(
        'justify-start gap-3 rounded-md px-3 shadow-none active:scale-100 [&_svg]:size-[22px]',
        small ? 'h-10' : 'h-11',
        on
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:bg-muted',
        className,
      )}
    >
      <a
        href="#"
        aria-current={on ? 'page' : undefined}
        onClick={(e) => {
          e.preventDefault();
          onNavigate?.(value);
        }}
      >
        {children}
      </a>
    </Button>
  );
}

/** 앱 탭(홈 · 발견 · 명함 · 내 프로필) */
function Nav() {
  return (
    <>
      {NAV.map((n) => (
        <NavItem key={n.key} value={n.key}>
          <Icon name={n.icon} />
          {n.label}
        </NavItem>
      ))}
    </>
  );
}

/** 내가 연 모임(있을 때만): 작은 머리 + 모임마다 작은 줄 */
function Hosted() {
  const { hosted } = useSidebar('Hosted');
  return hosted.length > 0 ? (
    <>
      <Text
        as="p"
        variant="caption"
        weight="semibold"
        tone="muted"
        className="mx-3 mb-1 mt-5"
      >
        내가 연 모임
      </Text>
      {hosted.map((h) => (
        <NavItem key={h} value={h} small>
          <span className="size-[22px] shrink-0 rounded-[7px] bg-gradient-to-br from-[#123B5C] to-[#2FB3B4]" />
          {h}
        </NavItem>
      ))}
    </>
  ) : null;
}

function SidebarRoot({
  active,
  onNavigate,
  hosted = [],
  children,
}: {
  active?: string;
  onNavigate?: (k: string) => void;
  hosted?: string[];
  children?: ReactNode;
}) {
  return (
    <SidebarContext.Provider value={{ active, onNavigate, hosted }}>
      <nav
        aria-label="탐색"
        className="flex w-[220px] flex-col gap-0.5 px-3 pt-5"
      >
        {children ?? (
          <>
            <Logo />
            <Nav />
            <Hosted />
          </>
        )}
      </nav>
    </SidebarContext.Provider>
  );
}

/**
 * 웹 탐색(shadcn Button 링크, 컴파운드): Logo(글자 로고) · Nav(앱 탭마다 NavItem) · Hosted(내가 연 모임). 펼친 폰의 레일을 이름 붙은 사이드바로.
 * 기본 조립은 `<Sidebar active="home" hosted={[…]} onNavigate={…} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<Sidebar active="home"><Sidebar.Logo /><Sidebar.NavItem value="home"><Icon name="home" />홈</Sidebar.NavItem></Sidebar>`
 */
export const Sidebar = Object.assign(SidebarRoot, {
  Logo,
  Nav,
  NavItem,
  Hosted,
});
