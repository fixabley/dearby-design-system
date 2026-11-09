import * as React from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { IconName } from '@/icons';
import { Icon } from '@/components/foundations/Icon';
import { cn } from '@/lib/utils';

// shadcn Button + Dearby: 누를 수 있는 컨트롤에만 그림자, 고정 CTA(lg)만 17/600, 눌리면 살짝 작아지고 바탕 위에 덧칠(pressable, styles.css)
const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap font-semibold outline-none transition-[transform,box-shadow,background-color,color] duration-150 ease-out-soft active:scale-[.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pressable disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-primary',
        mint: 'bg-mint text-mint-foreground shadow-control',
        outline: 'bg-background text-foreground shadow-control',
        ghost: 'bg-transparent text-accent-foreground',
        destructive: 'bg-transparent font-normal text-destructive',
        // 지우기·탈퇴처럼 되돌릴 수 없는 동작의 확인 버튼
        'destructive-fill':
          'bg-destructive-fill text-primary-foreground shadow-control',
        link: 'h-auto bg-transparent px-0 text-accent-foreground shadow-none',
        plain: 'bg-transparent text-foreground shadow-none',
        tile: 'bg-card text-foreground shadow-control',
        // 유리는 button-group의 glass와 같은 값(시안 .glass · .dk .glass)
        glass:
          'border-[.5px] border-black/8 bg-white/74 text-foreground shadow-[0_4px_16px_rgba(0,0,0,.08)] backdrop-blur-[18px] backdrop-saturate-160 dark:border-white/8 dark:bg-[rgba(36,40,43,.72)] dark:shadow-control',
      },
      size: {
        lg: 'h-13 rounded-[14px] px-6 text-headline [&_svg]:size-5', // 고정 CTA 17/600
        default: 'h-11 rounded-md px-4.5 text-body [&_svg]:size-5',
        sm: 'h-8 rounded-full px-3.5 text-caption [&_svg]:size-4',
        icon: 'size-11 rounded-full [&_svg]:size-5.5',
        'icon-sm': 'size-10 rounded-full [&_svg]:size-[22px]',
        'icon-lg': 'size-13 rounded-[14px] [&_svg]:size-6', // 고정 CTA(lg) 옆에 놓는 같은 높이 · 모서리의 정사각 아이콘 버튼
        tile: 'h-[66px] flex-col gap-1.5 rounded-lg text-caption [&_svg]:size-[22px] [&_svg]:text-accent-foreground',
        'tile-sm':
          'h-[54px] w-14 flex-col gap-[3px] rounded-md px-0 text-caption [&_svg]:size-[26px]',
        auto: 'h-auto text-body [&_svg]:size-[15px]',
      },
      block: { true: 'flex w-full', false: '' },
    },
    compoundVariants: [
      {
        variant: ['ghost', 'destructive'],
        size: ['default', 'sm', 'lg'],
        className: 'h-auto px-1 shadow-none',
      },
    ],
    defaultVariants: { variant: 'default', size: 'default', block: false },
  },
);

/** icon: 글자 앞 아이콘(크기는 size를 따른다). asChild면 자식 요소 안 맨 앞에 들어간다 */
function Button({
  className,
  variant,
  size,
  block,
  asChild = false,
  icon,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    icon?: IconName;
  }) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, block, className }))}
      {...props}
    >
      {icon && <Icon name={icon} />}
      <Slottable>{children}</Slottable>
    </Comp>
  );
}

export { Button, buttonVariants };
