import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';

// shadcn ScrollArea: 칸마다 따로 스크롤, 스크롤할 때만 얇은 막대
// Radix는 Viewport 안쪽을 display:table(인라인 스타일)로 감싸 내용 폭만큼 늘어나서, 안의 말줄임이 풀리고 행이 칸 오른쪽으로 넘친다.
// 안쪽 div를 block으로 덮어(!important) 칸 폭에 맞춘다. 가로 스크롤 막대는 쓰지 않는다.
function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      type="scroll"
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit] [&>div]:block!">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        orientation="vertical"
        className="flex w-1.5 touch-none select-none p-px transition-opacity data-[state=hidden]:opacity-0"
      >
        <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-black/30 dark:bg-white/30" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  );
}

export { ScrollArea };
