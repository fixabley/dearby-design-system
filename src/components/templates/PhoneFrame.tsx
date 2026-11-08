import type { ReactNode } from 'react';
import { Text } from '@/components/atoms/Text';
import { cn } from '@/lib/utils';

/** 위 제목 줄: 가운데 제목 + 오른쪽 children(글래스 그룹 등) */
function Header({ title, className, children }: { title?: string; className?: string; children?: ReactNode }) {
  return (
    <div className={cn('absolute inset-x-0 top-14 z-10 flex h-14 items-center justify-center px-4', className)}>
      <Text as="h1" variant="subtitle">{title}</Text><div className="absolute right-4">{children}</div>
    </div>
  );
}

/** 스크롤 내용(위 제목 줄 · 아래 탭 막대 자리만큼 여백) */
function Body({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('absolute inset-0 overflow-y-auto px-6 pb-32 pt-[120px]', className)}>{children}</div>;
}

/** 아래 떠 있는 탭 막대 자리 */
function PhoneFrameTabBar({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('absolute inset-x-4 bottom-7 z-10', className)}>{children}</div>;
}

function PhoneFrameRoot({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[852px] w-[393px] overflow-hidden rounded-[55px] bg-background shadow-[0_0_0_10px_#101012,0_0_0_11px_#2c2c2e,0_28px_60px_rgba(20,32,31,.22)]">
      <div className="absolute left-1/2 top-3 h-[34px] w-[124px] -translate-x-1/2 rounded-full bg-black" />
      {children}
    </div>
  );
}

/**
 * 폰 틀(393×852, 컴파운드): Header(위 제목 줄) · Body(스크롤 내용) · TabBar(떠 있는 탭 막대 자리).
 * `<PhoneFrame><PhoneFrame.Header title="홈"><GlassGroup unread={2} /></PhoneFrame.Header><PhoneFrame.Body>…</PhoneFrame.Body><PhoneFrame.TabBar><TabBar active="home" /></PhoneFrame.TabBar></PhoneFrame>`
 */
export const PhoneFrame = Object.assign(PhoneFrameRoot, { Header, Body, TabBar: PhoneFrameTabBar });
