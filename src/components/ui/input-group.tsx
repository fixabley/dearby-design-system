import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Input, Textarea } from './input';

// shadcn InputGroup + Dearby: 검색 캡슐(글래스) · 묶음 입력(채움)
const inputGroupVariants = cva(
  'group/input-group relative flex w-full items-center transition-shadow has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-ring',
  {
    variants: {
      variant: {
        // 유리는 button-group의 glass와 같은 값(시안 .glass · .dk .glass)
        glass:
          'h-11 rounded-full border-[.5px] border-black/8 bg-white/74 px-4 shadow-[0_4px_16px_rgba(0,0,0,.08)] backdrop-blur-[18px] backdrop-saturate-160 dark:border-white/8 dark:bg-[rgba(36,40,43,.72)] dark:shadow-control',
        filled: 'min-h-11 rounded-md bg-muted px-4',
      },
    },
    defaultVariants: { variant: 'filled' },
  },
);

function InputGroup({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group"
      className={cn(inputGroupVariants({ variant }), className)}
      {...props}
    />
  );
}

function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & { align?: 'inline-start' | 'inline-end' }) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        'flex shrink-0 items-center gap-1 text-muted-foreground [&_svg]:size-[18px]',
        align === 'inline-start' ? 'order-first mr-2' : 'order-last ml-2',
        className,
      )}
      onClick={(e) =>
        (
          e.currentTarget.parentElement?.querySelector(
            'input,textarea',
          ) as HTMLElement | null
        )?.focus()
      }
      {...props}
    />
  );
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<'input'>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn('flex-1 text-body', className)}
      {...props}
    />
  );
}
function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<'textarea'>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn('flex-1 py-2', className)}
      {...props}
    />
  );
}
function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn('text-caption text-muted-foreground', className)}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
