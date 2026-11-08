import type { ReactNode } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

/**
 * 따로 스크롤되는 칸(shadcn ScrollArea). 주어진 높이(격자 칸 · flex-1)를 채우고 넘치는 내용은 칸 안에서 스크롤한다.
 * contain-size: 내용 높이가 부모(WebShell.Main 등)의 높이를 늘리지 않게 한다. 그래서 칸의 폭·높이는 늘 부모가 정한다.
 */
export function Pane({ children, className }: { children: ReactNode; className?: string }) {
  return <ScrollArea className={cn('h-full min-h-0 contain-size', className)}>{children}</ScrollArea>;
}

/** 칸 아래 CTA 영역(위로 바탕색 그러데이션) */
export function PaneFooter({ children }: { children: ReactNode }) {
  return <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-background to-[24px] py-6 [&>*]:pointer-events-auto">{children}</div>;
}

/** 아래 가운데 떠 있는 바. 칸이 열리면 왼쪽 칸 가운데로 옮겨 간다 */
export function FloatingBar({ children, align = 'center' }: { children: ReactNode; align?: 'center' | 'left-pane' }) {
  return <div className={cn('absolute bottom-6 z-10 w-[440px] -translate-x-1/2 transition-[left] duration-300 ease-spring', align === 'center' ? 'left-1/2' : 'left-[calc(24px+(100%-96px)*5/24)]')}>{children}</div>;
}
