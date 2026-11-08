import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// shadcn Alert + Dearby: 큰 둥근 상자. 왼쪽 아이콘 · 굵은 제목과 보조 설명 · 오른쪽 청록 글자 행동(세로 가운데).
// 아이콘·행동이 없으면 그 칸은 폭이 0이 되도록 간격을 gap 대신 margin으로 준다
const alertVariants = cva(
  'grid w-full grid-cols-[auto_1fr_auto] items-center gap-y-0.5 rounded-[14px] px-3.5 py-3 text-left [&>svg]:col-start-1 [&>svg]:row-span-2 [&>svg]:row-start-1 [&>svg]:mr-3 [&>svg]:size-5',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground shadow-control [&>svg]:text-accent-foreground',  // 카드 면
        destructive: 'bg-destructive/10 text-foreground dark:bg-destructive/16 [&>svg]:text-destructive',  // 빨강 틴트(오류·꺼짐)
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

function Alert({ className, variant, ...props }: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="alert-title" className={cn('col-start-2 text-body font-semibold leading-snug', className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="alert-description" className={cn('col-start-2 text-caption text-muted-foreground', className)} {...props} />;
}

/** 오른쪽 행동(청록 글자 버튼). asChild면 링크 등에 같은 모양을 입힌다 */
function AlertAction({ className, asChild = false, ...props }: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';
  return <Comp data-slot="alert-action" className={cn(
    'col-start-3 row-span-2 row-start-1 ml-3 whitespace-nowrap rounded-sm text-caption font-semibold text-accent-foreground outline-none transition-opacity active:opacity-60 focus-visible:ring-2 focus-visible:ring-ring',
    className)} {...props} />;
}

export { Alert, AlertAction, AlertDescription, AlertTitle, alertVariants };
