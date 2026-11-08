import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';

// shadcn ScrollArea: 칸마다 따로 스크롤, 스크롤할 때만 얇은 막대
function ScrollArea({ className, children, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root data-slot="scroll-area" type="scroll" className={cn('relative overflow-hidden', className)} {...props}>
      <ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit]">{children}</ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar orientation="vertical" className="flex w-1.5 touch-none select-none p-px transition-opacity data-[state=hidden]:opacity-0">
        <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-black/30 dark:bg-white/30" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  );
}

export { ScrollArea };
