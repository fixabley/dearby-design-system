import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// shadcn Badge + Dearby: 모두 캡슐. 청록 채움·민트·흰 바탕 테두리만(빨강은 오류 전용, 회색 채움 없음)
const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full font-bold transition-colors [&>svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        mint: 'bg-accent text-accent-foreground',
        outline: 'bg-background text-foreground ring-1 ring-inset ring-border',
        muted: 'bg-background font-medium text-muted-foreground ring-1 ring-inset ring-border',
        destructive: 'bg-destructive/10 text-destructive',
      },
      size: {
        default: 'h-6 px-2.5 text-badge [&>svg]:size-3.5',
        sm: 'h-5 px-2 text-micro [&>svg]:size-3',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

function Badge({ className, variant, size, asChild = false, ...props }: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
