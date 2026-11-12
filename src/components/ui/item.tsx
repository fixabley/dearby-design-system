import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Separator } from './separator';

// shadcn Item + Dearby: iOS 묶음 목록 행(grouped). 미디어 · 제목/설명 · 오른쪽 동작
function ItemGroup({
  className,
  variant = 'grouped',
  ...props
}: React.ComponentProps<'div'> & { variant?: 'grouped' | 'plain' }) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        'flex flex-col',
        variant === 'grouped' &&
          'overflow-hidden rounded-md border border-border [&>[data-slot=item]+[data-slot=item]]:border-t [&>[data-slot=item]+[data-slot=item]]:border-border',
        className,
      )}
      {...props}
    />
  );
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      className={cn('my-0', className)}
      {...props}
    />
  );
}

const itemVariants = cva(
  'group/item flex w-full items-center gap-3 text-left outline-none transition-colors duration-200 focus-visible:bg-accent/60 [a]:cursor-pointer [button]:cursor-pointer data-[selected=true]:bg-accent',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'rounded-md ring-1 ring-inset ring-border',
        muted: 'rounded-md border border-border',
      },
      size: {
        default: 'min-h-11 px-4 py-2',
        sm: 'min-h-10 px-3 py-1.5',
        row: 'items-start gap-x-3.5 rounded-2xl py-4',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

function Item({
  className,
  variant,
  size,
  asChild = false,
  selected,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof itemVariants> & {
    asChild?: boolean;
    selected?: boolean;
  }) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      role="listitem"
      data-slot="item"
      data-selected={selected || undefined}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  );
}

const itemMediaVariants = cva('flex shrink-0 items-center justify-center', {
  variants: {
    variant: {
      default: 'bg-transparent',
      icon: 'text-accent-foreground [&_svg]:size-[22px]',
      image: 'overflow-hidden rounded-md',
    },
  },
  defaultVariants: { variant: 'default' },
});
function ItemMedia({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  );
}
function ItemContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-content"
      className={cn('flex min-w-0 flex-1 flex-col', className)}
      {...props}
    />
  );
}
// 제목 · 보조 줄은 relative: 말줄임(overflow hidden) 안의 sr-only(absolute) 글자가 잘리지 않으면 페이지가 가로로 넘친다
function ItemTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-title"
      className={cn('relative truncate text-body-lg', className)}
      {...props}
    />
  );
}
function ItemDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        'relative truncate text-caption text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}
function ItemActions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-actions"
      className={cn(
        'flex shrink-0 items-center gap-2 text-body text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}
function ItemHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        'flex basis-full items-center justify-between gap-2',
        className,
      )}
      {...props}
    />
  );
}
function ItemFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        'flex basis-full items-center justify-between gap-2',
        className,
      )}
      {...props}
    />
  );
}

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
  itemVariants,
};
