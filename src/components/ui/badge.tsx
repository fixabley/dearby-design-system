import * as React from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { IconName } from '@/icons';
import { Icon } from '@/components/foundations/Icon';
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
        count: 'bg-[#FF3B30] text-white',  // 알림 개수(iOS 관례)
      },
      size: {
        default: 'h-6 px-2.5 text-badge [&>svg]:size-3.5',
        sm: 'h-5 px-2 text-micro [&>svg]:size-3',
        dot: 'h-4 min-w-4 px-1 text-micro font-bold leading-none',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

/** icon: 글자 앞 아이콘(크기는 size를 따른다). 아이콘을 children에 직접 넣어도 된다 */
function Badge({ className, variant, size, asChild = false, icon, children, ...props }: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean; icon?: IconName }) {
  const Comp = asChild ? Slot : 'span';
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant, size }), className)} {...props}>{icon && <Icon name={icon} />}<Slottable>{children}</Slottable></Comp>;
}

export { Badge, badgeVariants };
