import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** 왼쪽 사이드바 칸(220) */
function WebShellSidebar({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

/** 오른쪽 내용 칸(위에서 아래로 쌓인다) */
function Main({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <main className={cn('relative flex min-w-0 flex-col', className)}>
      {children}
    </main>
  );
}

function WebShellRoot({
  height = 820,
  children,
}: {
  height?: number;
  children: ReactNode;
}) {
  return (
    <div
      className="grid w-[1280px] grid-cols-[220px_minmax(0,1fr)] overflow-hidden bg-background text-foreground"
      style={{ height }}
    >
      {children}
    </div>
  );
}

/**
 * 웹 셸(1280 기준, 컴파운드): Sidebar(왼쪽 220) + Main(내용). 칸은 부품으로 채운다:
 * `<WebShell height={820}><WebShell.Sidebar><Sidebar active="home" /></WebShell.Sidebar><WebShell.Main><TopBar title="홈" />…</WebShell.Main></WebShell>`
 */
export const WebShell = Object.assign(WebShellRoot, {
  Sidebar: WebShellSidebar,
  Main,
});
