import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cn } from '@/lib/utils';

// shadcn ToggleGroup을 iOS 분할 전환으로. 고른 칸 뒤의 흰 면(thumb)이 스프링으로 미끄러진다
type Variant = 'segmented' | 'circle' | 'plain';
const VariantCtx = React.createContext<Variant>('segmented');

/** variant: segmented(분할 전환, 미끄러지는 면) · circle(요일 같은 원 버튼) · plain(겉모양 없이 고르기만) */
function ToggleGroup({ className, children, count = 0, index = 0, variant = 'segmented', style, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & { count?: number; index?: number; variant?: Variant }) {
  if (variant !== 'segmented') {
    return <VariantCtx.Provider value={variant}><ToggleGroupPrimitive.Root data-slot="toggle-group" className={cn(variant === 'circle' && 'grid grid-cols-7 gap-1.5', className)} style={style} {...props}>{children}</ToggleGroupPrimitive.Root></VariantCtx.Provider>;
  }
  return (
    <ToggleGroupPrimitive.Root data-slot="toggle-group" className={cn('relative isolate flex h-9 rounded-full bg-muted p-[3px]', className)}
      style={{ ...style, ['--n' as string]: count, ['--i' as string]: index }} {...props}>
      <span aria-hidden className="absolute inset-y-[3px] left-[3px] -z-10 w-[calc((100%-6px)/var(--n))] translate-x-[calc(var(--i)*100%)] rounded-full bg-background shadow-[0_1px_4px_rgba(0,0,0,.12)] transition-transform duration-[360ms] ease-spring dark:bg-card" />
      <VariantCtx.Provider value="segmented">{children}</VariantCtx.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

const ITEM: Record<Variant, string> = {
  segmented: '',
  circle: 'grid aspect-square place-items-center rounded-full bg-muted text-body font-semibold outline-none transition-[background-color,color,transform] duration-200 ease-spring active:scale-90 focus-visible:ring-2 focus-visible:ring-ring data-[state=on]:bg-primary data-[state=on]:text-white',
  plain: 'outline-none focus-visible:ring-2 focus-visible:ring-ring',
};
function ToggleGroupItem({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  const variant = React.useContext(VariantCtx);
  if (variant !== 'segmented') return <ToggleGroupPrimitive.Item data-slot="toggle-group-item" className={cn(ITEM[variant], className)} {...props} />;
  return <ToggleGroupPrimitive.Item data-slot="toggle-group-item" className={cn(
    'flex-1 rounded-full text-caption font-semibold text-muted-foreground outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring data-[state=on]:text-foreground',
    className)} {...props} />;
}

export { ToggleGroup, ToggleGroupItem };
