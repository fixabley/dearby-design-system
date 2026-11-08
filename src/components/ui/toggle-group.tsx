import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cn } from '@/lib/utils';

// shadcn ToggleGroup을 iOS 분할 전환으로. 고른 칸 뒤의 흰 면(thumb)이 스프링으로 미끄러진다
function ToggleGroup({ className, children, count, index, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & { count: number; index: number }) {
  return (
    <ToggleGroupPrimitive.Root data-slot="toggle-group" className={cn('relative isolate flex h-9 rounded-full bg-muted p-[3px]', className)}
      style={{ ['--n' as string]: count, ['--i' as string]: index }} {...props}>
      <span aria-hidden className="absolute inset-y-[3px] left-[3px] -z-10 w-[calc((100%-6px)/var(--n))] translate-x-[calc(var(--i)*100%)] rounded-full bg-background shadow-[0_1px_4px_rgba(0,0,0,.12)] transition-transform duration-[360ms] ease-spring dark:bg-card" />
      {children}
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return <ToggleGroupPrimitive.Item data-slot="toggle-group-item" className={cn(
    'flex-1 rounded-full text-caption font-semibold text-muted-foreground outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring data-[state=on]:text-foreground',
    className)} {...props} />;
}

export { ToggleGroup, ToggleGroupItem };
