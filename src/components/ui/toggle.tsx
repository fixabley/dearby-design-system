import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import type { IconName } from '@/icons';
import { Icon } from '@/components/foundations/Icon';
import { cn } from '@/lib/utils';

// shadcn Toggle: 필터 칩. 켜면 민트 면 + 청록 2px 테두리
const toggleVariants = cva(
  'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full outline-none transition-[background-color,box-shadow,color,transform] duration-150 active:scale-[.97] focus-visible:ring-2 focus-visible:ring-ring pressable disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-[18px]',
  {
    variants: {
      variant: {
        tile: 'h-[66px] flex-col gap-1.5 rounded-lg bg-card text-caption font-semibold text-foreground shadow-control [&_svg]:size-[22px] [&_svg]:text-accent-foreground data-[state=on]:bg-mint data-[state=on]:text-mint-foreground',
        tileMint:
          'h-[66px] flex-col gap-1.5 rounded-lg bg-mint text-caption font-semibold text-mint-foreground shadow-control [&_svg]:size-[22px]',
        icon: 'size-7 rounded-full text-accent-foreground [&_svg]:size-[18px] data-[state=on]:[&_svg]:animate-[ds-pop_.36s_var(--ease-spring)]',
        live: 'h-7 w-14 gap-[5px] rounded-full bg-background text-micro font-bold tracking-wider text-accent-foreground ring-[1.5px] ring-inset ring-primary data-[state=on]:bg-primary data-[state=on]:text-white data-[state=on]:shadow-[0_6px_18px_rgba(0,127,128,.28)] data-[state=on]:ring-0',
        follow:
          'h-8 gap-1 rounded-full bg-mint px-3.5 text-caption font-semibold text-mint-foreground shadow-control [&_svg]:size-4',
        chip: 'bg-background text-body text-foreground ring-1 ring-inset ring-[#C4C4C7] data-[state=on]:bg-mint data-[state=on]:font-semibold data-[state=on]:text-mint-foreground data-[state=on]:ring-2 data-[state=on]:ring-primary dark:ring-border',
      },
      size: { default: 'h-10 px-3.5', auto: '' },
    },
    defaultVariants: { variant: 'chip', size: 'default' },
  },
);

/** icon: 글자 앞 아이콘(필터 칩의 종류·상태 아이콘, 찜 하트 등) */
function Toggle({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants> & { icon?: IconName }) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    >
      {icon && <Icon name={icon} />}
      {children}
    </TogglePrimitive.Root>
  );
}

export { Toggle, toggleVariants };
