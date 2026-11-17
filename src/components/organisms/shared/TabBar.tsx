import {
  Children,
  createContext,
  isValidElement,
  useContext,
  type ReactNode,
} from 'react';
import { ICONS, type IconName } from '@/icons';
import { Svg } from '@/components/foundations/Icon';
import { Text } from '@/components/atoms/shared/Text';
import { cn } from '@/lib/utils';
import { NAV, type NavKey } from '@/lib/nav';

type TabBarContextValue = {
  active: NavKey;
  minimized: boolean;
  onNavigate?: (k: NavKey) => void;
  onExpand?: () => void;
};
const TabBarContext = createContext<TabBarContextValue | null>(null);

function useTabBar(part: string) {
  const ctx = useContext(TabBarContext);
  if (!ctx) throw new Error(`TabBar.${part}는 <TabBar> 안에서 쓴다`);
  return ctx;
}

/**
 * 아이콘 그림 크기(px). 24칸 SVG 안의 그림이 iOS 시스템 탭 막대에서 잰 크기(집 27×24 · 돋보기 22 · QR 21 · 사람 둘 30×20 · 사람 원 23pt)가 되게 맞춘 값이다.
 * 아이콘 가운데는 늘 막대 위에서 24.7(위 끝 12.7 + 반)이다
 */
const ICON_PX: Partial<Record<IconName, number>> = {
  tabHomeFill: 34,
  tabSearchFill: 31,
  tabQr: 30,
  tabContactsFill: 30,
  tabProfileFill: 31,
};

/**
 * 탭 하나: 아이콘 + 라벨 10. value가 active와 같으면 청록 글자(고른 면은 TabBar가 하나로 그린다).
 * iOS 시스템 탭 막대(iOS 26 TabView)에서 잰 값(Android #186): 안 고른 글자 라이트 #0F0F0F · 다크 #FDFEFF, 고른 글자 라이트 #006B6C · 다크 #40C5C6
 */
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
  const { active, minimized, onNavigate, onExpand } = useTabBar('Tab');
  const selected = value === active;
  const px = ICON_PX[icon] ?? 30;
  return (
    <button
      type="button"
      aria-current={selected ? 'page' : undefined}
      // 줄어든 막대는 고른 탭만 보이고, 누르면 막대가 펴진다
      tabIndex={minimized && !selected ? -1 : undefined}
      aria-hidden={minimized && !selected ? true : undefined}
      onClick={() => (minimized ? onExpand?.() : onNavigate?.(value))}
      className={cn(
        'relative flex-1 rounded-full outline-none transition-opacity duration-200 [-webkit-tap-highlight-color:transparent] focus-visible:ring-2 focus-visible:ring-ring',
        selected
          ? 'text-[#006b6c] dark:text-[#40c5c6]'
          : 'text-[#0f0f0f] dark:text-[#fdfeff]',
        minimized && !selected && 'hidden',
        className,
      )}
    >
      <span
        aria-hidden
        style={{ top: minimized ? 26 : 24.7 }}
        className="absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-[top] duration-300 ease-spring"
      >
        <Svg src={ICONS[icon]} size={px} />
      </span>
      <Text
        as="span"
        variant="tab"
        className={cn(
          'absolute inset-x-0 top-[39px] transition-opacity duration-150',
          minimized && 'opacity-0',
        )}
      >
        {children}
      </Text>
    </button>
  );
}

function TabBarRoot({
  active,
  onNavigate,
  minimized = false,
  onExpand,
  className,
  children,
}: {
  active: NavKey;
  onNavigate?: (k: NavKey) => void;
  /** 줄어든 모양(아래로 스크롤하는 동안, iOS tabBarMinimizeBehavior onScrollDown): 고른 탭 아이콘 하나의 작은 캡슐 */
  minimized?: boolean;
  /** 줄어든 막대를 눌렀을 때(펴라는 요청) */
  onExpand?: () => void;
  className?: string;
  children?: ReactNode;
}) {
  // 고른 탭의 순서는 children에서 센다(분할 전환과 같은 방식). 탭은 모두 flex-1이라 너비가 같으니 칸 수와 순서만으로 면이 탭에 맞는다
  const tabs = Children.toArray(
    children ??
      NAV.map((n) => (
        <Tab key={n.key} value={n.key} icon={n.tabIcon}>
          {n.label}
        </Tab>
      )),
  );
  const index = tabs.findIndex(
    (t) => isValidElement<{ value?: NavKey }>(t) && t.props.value === active,
  );
  return (
    <TabBarContext.Provider value={{ active, minimized, onNavigate, onExpand }}>
      <div
        role="group"
        aria-label="탭 막대"
        className={cn(
          // iOS 26 시스템 탭 막대에서 잰 값(Android #186): 높이 63 · 캡슐 · 안쪽 좌우 9 · 유리(라이트 흰색 74%, 다크 흰색 14% + 흐림) · 0.5 선
          'relative isolate flex h-[63px] w-full select-none rounded-full border-[.5px] border-black/14 bg-white/74 px-[9px] shadow-[0_6px_16px_rgba(20,32,31,.08)] backdrop-blur-[18px] backdrop-saturate-160 transition-[width] duration-300 ease-spring dark:border-[.75px] dark:border-white/25 dark:bg-white/14 dark:shadow-none',
          minimized && 'h-[52px] w-16 self-start px-0',
          className,
        )}
        style={{ ['--n' as string]: tabs.length, ['--i' as string]: index }}
      >
        {/* 고른 탭의 알약: 칸보다 8 넓고(좌우 4씩) 높이 52, 위 · 아래 막대와 5.5 띄움. 라이트 검정 7% · 다크 검정 54%, 윤곽선 없음. 고른 탭으로 미끄러진다 */}
        {index >= 0 && (
          <span
            aria-hidden
            className="absolute inset-y-[5.5px] -z-10 rounded-full bg-black/7 transition-[left,width] duration-300 ease-spring dark:bg-black/54"
            style={
              minimized
                ? { left: 0, width: '100%', top: 0, bottom: 0 }
                : {
                    left: `calc(5px + var(--i) * (100% - 18px) / var(--n))`,
                    width: `calc((100% - 18px) / var(--n) + 8px)`,
                  }
            }
          />
        )}
        {tabs}
      </div>
    </TabBarContext.Provider>
  );
}

/**
 * 모바일 탭 막대(iOS 26 시스템 탭 막대와 같은 모양, 컴파운드): 앱 탭마다 Tab. 높이 63의 떠 있는 유리 캡슐, 고른 탭은 청록 + 옅은 알약.
 * 기본 조립은 `<TabBar active="home" onNavigate={…} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<TabBar active="home"><TabBar.Tab value="home" icon="tabHomeFill">홈</TabBar.Tab><TabBar.Tab value="profile" icon="tabProfileFill">내 프로필</TabBar.Tab></TabBar>`
 * 고른 면의 자리를 children 순서로 정하니 Tab은 TabBar 바로 아래에 둔다(Fragment나 다른 컴포넌트로 감싸지 않는다).
 * 막대를 두는 쪽은 화면 아래에서 21 띄운다(좌우 21). 아래로 스크롤하면 `minimized`로 줄이고 위로 스크롤하면 펴 준다
 */
export const TabBar = Object.assign(TabBarRoot, { Tab });
