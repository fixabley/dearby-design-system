import type { ReactNode } from 'react';

/** 웹 셸: 사이드바 220 + 내용(1280 기준) */
export function WebShell({ sidebar, children, height = 820 }: { sidebar: ReactNode; children: ReactNode; height?: number }) {
  return <div className="grid w-[1280px] grid-cols-[220px_minmax(0,1fr)] overflow-hidden bg-background text-foreground" style={{ height }}>{sidebar}<main className="relative flex min-w-0 flex-col">{children}</main></div>;
}
