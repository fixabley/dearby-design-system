import * as React from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { IconName } from '@/icons';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/lib/utils';

// shadcn Button + Dearby: 누를 수 있는 컨트롤에만 그림자, 고정 CTA(lg)만 17/600, 눌리면 살짝 작아짐
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap font-semibold outline-none transition-[transform,box-shadow,background-color,color] duration-150 ease-out-soft active:scale-[.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-primary',
        mint: 'bg-accent text-accent-foreground shadow-control',
        outline: 'bg-background text-foreground shadow-control',
        ghost: 'bg-transparent text-accent-foreground',
        destructive: 'bg-transparent font-normal text-destructive',
        link: 'h-auto bg-transparent px-0 text-accent-foreground shadow-none',
        plain: 'bg-transparent text-foreground shadow-none',
        tile: 'bg-card text-foreground shadow-control',
        glass: 'border border-black/10 bg-white/75 text-foreground shadow-[0_4px_16px_rgba(0,0,0,.08)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-[rgba(32,36,39,.74)]',
      },
      size: {
        lg: 'h-13 rounded-[14px] px-6 text-[17px] [&_svg]:size-5',
        default: 'h-11 rounded-md px-4.5 text-body [&_svg]:size-5',
        sm: 'h-8 rounded-full px-3.5 text-caption [&_svg]:size-4',
        icon: 'size-11 rounded-full [&_svg]:size-5.5',
        'icon-sm': 'size-10 rounded-full [&_svg]:size-[22px]',
        tile: 'h-[66px] flex-col gap-1.5 rounded-lg text-caption [&_svg]:size-[22px] [&_svg]:text-accent-foreground',
        'tile-sm': 'h-[54px] w-14 flex-col gap-[3px] rounded-md px-0 text-caption [&_svg]:size-[26px]',
        auto: 'h-auto text-body [&_svg]:size-[15px]',
      },
      block: { true: 'flex w-full', false: '' },
    },
    compoundVariants: [
      { variant: ['ghost', 'destructive'], size: ['default', 'sm', 'lg'], className: 'h-auto px-1 shadow-none' },
    ],
    defaultVariants: { variant: 'default', size: 'default', block: false },
  },
);

/** icon: 글자 앞 아이콘(크기는 size를 따른다). asChild면 자식 요소 안 맨 앞에 들어간다 */
function Button({ className, variant, size, block, asChild = false, icon, children, ...props }:
  React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean; icon?: IconName }) {
  const Comp = asChild ? Slot : 'button';
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, block, className }))} {...props}>{icon && <Icon name={icon} />}<Slottable>{children}</Slottable></Comp>;
}

export { Button, buttonVariants };
