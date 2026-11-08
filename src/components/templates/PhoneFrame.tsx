import type { ReactNode } from 'react';

/** 폰 틀(393×852): 위 제목 줄 + 스크롤 내용 + 떠 있는 탭 막대 */
export function PhoneFrame({ title, actions, tabBar, children }: { title?: string; actions?: ReactNode; tabBar?: ReactNode; children: ReactNode }) {
  return (
    <div className="relative h-[852px] w-[393px] overflow-hidden rounded-[55px] bg-background shadow-[0_0_0_10px_#101012,0_0_0_11px_#2c2c2e,0_28px_60px_rgba(20,32,31,.22)]">
      <div className="absolute left-1/2 top-3 h-[34px] w-[124px] -translate-x-1/2 rounded-full bg-black" />
      <div className="absolute inset-x-0 top-14 z-10 flex h-14 items-center justify-center px-4"><h1 className="text-headline">{title}</h1><div className="absolute right-4">{actions}</div></div>
      <div className="absolute inset-0 overflow-y-auto px-6 pb-32 pt-[120px]">{children}</div>
      {tabBar && <div className="absolute inset-x-4 bottom-7 z-10">{tabBar}</div>}
    </div>
  );
}
