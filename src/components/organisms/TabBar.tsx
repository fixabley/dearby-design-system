import { createContext, useContext, type ReactNode } from 'react';
import type { IconName } from '@/icons';
import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { cn } from '@/lib/utils';
import { NAV, type NavKey } from '@/lib/nav';

type TabBarContextValue = { active: NavKey; onNavigate?: (k: NavKey) => void };
const TabBarContext = createContext<TabBarContextValue | null>(null);

function useTabBar(part: string) {
  const ctx = useContext(TabBarContext);
  if (!ctx) throw new Error(`TabBar.${part}는 <TabBar> 안에서 쓴다`);
  return ctx;
}

/** 탭 하나: 아이콘 + 이름. value가 active와 같으면 민트 면 */
function Tab({ value, icon, className, children }: { value: NavKey; icon: IconName; className?: string; children: ReactNode }) {
  const { active, onNavigate } = useTabBar('Tab');
  return (
    <Button variant="plain" aria-current={value === active ? 'page' : undefined} onClick={() => onNavigate?.(value)} icon={icon}
      className={cn('h-full flex-1 flex-col gap-0.5 rounded-full px-0 [&_svg]:size-6', value === active && 'bg-accent text-accent-foreground', className)}>
      <Text variant="micro">{children}</Text>
    </Button>
  );
}

function TabBarRoot({ active, onNavigate, children }: { active: NavKey; onNavigate?: (k: NavKey) => void; children?: ReactNode }) {
  return (
    <TabBarContext.Provider value={{ active, onNavigate }}>
      <ButtonGroup variant="glass" aria-label="탭 막대" className="h-16 w-full gap-1 p-1.5">
        {children ?? NAV.map((n) => <Tab key={n.key} value={n.key} icon={n.icon}>{n.label}</Tab>)}
      </ButtonGroup>
    </TabBarContext.Provider>
  );
}

/**
 * 모바일 탭 막대(shadcn ButtonGroup 글래스 + Button, 컴파운드): 앱 탭마다 Tab.
 * 기본 조립은 `<TabBar active="home" onNavigate={…} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<TabBar active="home"><TabBar.Tab value="home" icon="home">홈</TabBar.Tab><TabBar.Tab value="profile" icon="profile">내 프로필</TabBar.Tab></TabBar>`
 */
export const TabBar = Object.assign(TabBarRoot, { Tab });
