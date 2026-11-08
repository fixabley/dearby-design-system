import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// shadcn Toggle: 필터 칩. 켜면 민트 면 + 청록 2px 테두리
const toggleVariants = cva(
  'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full outline-none transition-[background-color,box-shadow,color,transform] duration-150 active:scale-[.97] focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-[18px]',
  {
    variants: {
      variant: {
        chip: 'bg-background text-body text-foreground ring-1 ring-inset ring-[#C4C4C7] data-[state=on]:bg-accent data-[state=on]:font-semibold data-[state=on]:text-accent-foreground data-[state=on]:ring-2 data-[state=on]:ring-primary dark:ring-border',
      },
      size: { default: 'h-10 px-3.5' },
    },
    defaultVariants: { variant: 'chip', size: 'default' },
  },
);

function Toggle({ className, variant, size, ...props }: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return <TogglePrimitive.Root data-slot="toggle" className={cn(toggleVariants({ variant, size, className }))} {...props} />;
}

export { Toggle, toggleVariants };
