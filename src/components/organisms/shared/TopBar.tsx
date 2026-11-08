import { createContext, useContext, type ReactNode } from 'react';
import { Text } from '@/components/atoms/shared/Text';
import { cn } from '@/lib/utils';

type TopBarContextValue = { title?: ReactNode; center?: ReactNode; right?: ReactNode };
const TopBarContext = createContext<TopBarContextValue | null>(null);

function useTopBar(part: string) {
  const ctx = useContext(TopBarContext);
  if (!ctx) throw new Error(`TopBar.${part}는 <TopBar> 안에서 쓴다`);
  return ctx;
}

/** 왼쪽 제목(26/700). 비어도 자리를 차지해 오른쪽 그룹을 끝으로 민다 */
function Title({ className, children }: { className?: string; children?: ReactNode }) {
  const { title } = useTopBar('Title');
  return <Text variant="title" className={cn('flex-1', className)}>{children ?? title}</Text>;
}

/** 가운데 전환(있을 때만) */
function Center({ className, children }: { className?: string; children?: ReactNode }) {
  const { center } = useTopBar('Center');
  const node = children ?? center;
  return node ? <div className={cn('absolute left-1/2 -translate-x-1/2', className)}>{node}</div> : null;
}

/** 오른쪽 글래스 그룹 */
function Actions({ children }: { children?: ReactNode }) {
  const { right } = useTopBar('Actions');
  return <>{children ?? right}</>;
}

function TopBarRoot({ title, center, right, children }: { title?: ReactNode; center?: ReactNode; right?: ReactNode; children?: ReactNode }) {
  return (
    <TopBarContext.Provider value={{ title, center, right }}>
      <div className="relative flex h-[76px] items-center px-6">{children ?? <><Title /><Center /><Actions /></>}</div>
    </TopBarContext.Provider>
  );
}

/**
 * 화면 머리(컴파운드): Title(왼쪽 제목 26/700) · Center(가운데 전환) · Actions(오른쪽 글래스 그룹).
 * 기본 조립은 `<TopBar title="홈" right={<GlassGroup unread={2} />} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<TopBar right={…}><TopBar.Title>공지 <Badge>3</Badge></TopBar.Title><TopBar.Actions /></TopBar>`
 */
export const TopBar = Object.assign(TopBarRoot, { Title, Center, Actions });
