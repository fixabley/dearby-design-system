import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Separator } from './separator';

// shadcn ButtonGroup + Dearby 글래스 캡슐(우상단 화면 액션 | 설정·알림)
const buttonGroupVariants = cva('flex w-fit items-center', {
  variants: {
    variant: {
      default: 'gap-2',
      // glass는 이름만 남은 별칭: 평평한 조작 면 + 얇은 테두리(button · input-group · dialog 닫기와 같은 값)
      glass: 'h-11 rounded-full bg-control px-1 shadow-control',
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
