import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Separator } from './separator';

// shadcn ButtonGroup + Dearby 글래스 캡슐(우상단 화면 액션 | 설정·알림)
const buttonGroupVariants = cva('flex w-fit items-center', {
  variants: {
    variant: {
      default: 'gap-2',
      // 유리는 시안 .glass · .dk .glass(다크는 그림자 대신 .5px 링). button · input-group · dialog 닫기의 유리와 같은 값
      glass:
        'h-11 rounded-full border-[.5px] border-black/8 bg-white/74 px-1 shadow-[0_4px_16px_rgba(0,0,0,.08)] backdrop-blur-[18px] backdrop-saturate-160 dark:border-white/8 dark:bg-[rgba(15,17,18,.72)] dark:shadow-control',
    },
    orientation: { horizontal: 'flex-row', vertical: 'flex-col' },
  },
  defaultVariants: { variant: 'default', orientation: 'horizontal' },
});

function ButtonGroup({
  className,
  variant,
  orientation,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ variant, orientation }), className)}
      {...props}
    />
  );
}

function ButtonGroupSeparator({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn('mx-[3px] !h-[22px] bg-current opacity-20', className)}
      {...props}
    />
  );
}

function ButtonGroupText({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn('px-2 text-caption text-muted-foreground', className)}
      {...props}
    />
  );
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
};
