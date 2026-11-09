import {
  Children,
  createContext,
  isValidElement,
  useContext,
  type ReactNode,
} from 'react';
import type { IconName } from '@/icons';
import { Text } from '@/components/atoms/shared/Text';
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

/** 탭 하나: 아이콘 + 이름. value가 active와 같으면 민트 글자(면은 TabBar가 하나로 그린다) */
function Tab({
  value,
  icon,
  className,
  children,
}: {
  value: NavKey;
  icon: IconName;
  className?: string;
  children: ReactNode;
}) {
  const { active, onNavigate } = useTabBar('Tab');
  return (
    <Button
      variant="plain"
      aria-current={value === active ? 'page' : undefined}
      onClick={() => onNavigate?.(value)}
      icon={icon}
      className={cn(
        'h-full flex-1 flex-col gap-[3px] rounded-full px-0 duration-200 [&_svg]:size-6',
        // 안 고른 탭은 시안 .tab #3a3a3c, 다크 .dk .tab #9AA3A8(다크 muted-foreground와 같은 값)
        value === active
          ? 'text-accent-foreground'
          : 'text-[#3a3a3c] dark:text-muted-foreground',
        className,
      )}
    >
      <Text variant="micro">{children}</Text>
    </Button>
  );
}

function TabBarRoot({
  active,
  onNavigate,
  children,
}: {
  active: NavKey;
  onNavigate?: (k: NavKey) => void;
  children?: ReactNode;
}) {
  // 고른 탭의 순서는 children에서 센다(분할 전환과 같은 방식). 탭은 모두 flex-1이라 너비가 같으니 칸 수와 순서만으로 면이 탭에 맞는다
  const tabs = Children.toArray(
    children ??
      NAV.map((n) => (
        <Tab key={n.key} value={n.key} icon={n.icon}>
          {n.label}
        </Tab>
      )),
  );
  const index = tabs.findIndex(
    (t) => isValidElement<{ value?: NavKey }>(t) && t.props.value === active,
  );
  return (
    <TabBarContext.Provider value={{ active, onNavigate }}>
      <ButtonGroup
        variant="glass"
        aria-label="탭 막대"
        className="relative isolate h-16 w-full p-1"
        style={{ ['--n' as string]: tabs.length, ['--i' as string]: index }}
      >
        {/* 청록 10% 면 하나가 고른 탭으로 미끄러진다(시안 .tabs · .tab.on). 너비 (100% − 여백 4px×2) ÷ n, 한 칸 이동은 너비만큼 */}
        {index >= 0 && (
          <span
            aria-hidden
            className="absolute inset-y-1 left-1 -z-10 w-[calc((100%-8px)/var(--n))] translate-x-[calc(var(--i)*100%)] rounded-full bg-primary/10 transition-transform duration-[360ms] ease-spring"
          />
        )}
        {tabs}
      </ButtonGroup>
    </TabBarContext.Provider>
  );
}

/**
 * 모바일 탭 막대(shadcn ButtonGroup 글래스 + Button, 컴파운드): 앱 탭마다 Tab.
 * 기본 조립은 `<TabBar active="home" onNavigate={…} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<TabBar active="home"><TabBar.Tab value="home" icon="home">홈</TabBar.Tab><TabBar.Tab value="profile" icon="profile">내 프로필</TabBar.Tab></TabBar>`
 * 고른 면의 자리를 children 순서로 정하니 Tab은 TabBar 바로 아래에 둔다(Fragment나 다른 컴포넌트로 감싸지 않는다).
 */
export const TabBar = Object.assign(TabBarRoot, { Tab });
