import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cva, type VariantProps } from 'class-variance-authority';
import type { IconName } from '@/icons';
import { Icon } from '@/components/foundations/Icon';
import { cn } from '@/lib/utils';

// shadcn Select + Dearby: iOS 메뉴 모양 목록. 고른 항목은 앞에 체크, 열릴 때 누른 자리에서 커진다
const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const selectTriggerVariants = cva(
  'flex items-center justify-between gap-1 whitespace-nowrap outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 data-[placeholder]:text-muted-foreground [&>span]:flex [&>span]:items-center [&>span]:gap-1.5 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'h-11 w-full rounded-md bg-muted px-4 text-body-lg [&_svg]:size-[18px]',
        inline: 'h-auto rounded-sm bg-transparent p-0 text-body text-muted-foreground [&_svg]:size-4',  // 묶음 목록 행 오른쪽 값
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

function SelectTrigger({ className, variant, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger> & VariantProps<typeof selectTriggerVariants>) {
  return (
    <SelectPrimitive.Trigger data-slot="select-trigger" className={cn(selectTriggerVariants({ variant }), className)} {...props}>
      {children}
      <SelectPrimitive.Icon asChild><span className="text-muted-foreground [&_svg]:transition-transform group-data-[state=open]:[&_svg]:rotate-180"><Icon name="chevronDown" /></span></SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({ className, children, position = 'popper', ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content data-slot="select-content" position={position} sideOffset={6} className={cn(
        'relative z-50 max-h-(--radix-select-content-available-height) min-w-[200px] origin-(--radix-select-content-transform-origin) overflow-hidden rounded-[14px] bg-popover/95 text-popover-foreground shadow-[0_10px_40px_rgba(0,0,0,.18)] backdrop-blur-xl',
        position === 'popper' && 'min-w-(--radix-select-trigger-width)',
        'duration-200 ease-spring data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-90 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        className)} {...props}>
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return <SelectPrimitive.Label data-slot="select-label" className={cn('px-3 pb-1 pt-2 text-caption text-muted-foreground', className)} {...props} />;
}

/** icon은 글자 앞(트리거에도 함께 보인다), sub는 보조 줄(목록에만 보인다) */
function SelectItem({ className, children, icon, sub, ...props }: React.ComponentProps<typeof SelectPrimitive.Item> & { icon?: IconName; sub?: React.ReactNode }) {
  return (
    <SelectPrimitive.Item data-slot="select-item" className={cn(
      'relative flex min-h-11 cursor-default select-none flex-col justify-center rounded-[10px] py-1.5 pl-8 pr-3 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-muted data-[disabled]:opacity-45', className)} {...props}>
      <span className="absolute left-2 top-1/2 flex size-4 -translate-y-1/2 items-center justify-center [&_svg]:size-4">
        <SelectPrimitive.ItemIndicator><Icon name="check" /></SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText><span className="flex items-center gap-1.5 text-body [&_svg]:size-4 [&_svg]:text-accent-foreground">{icon && <Icon name={icon} />}{children}</span></SelectPrimitive.ItemText>
      {sub && <span className="text-caption text-muted-foreground">{sub}</span>}
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator className={cn('-mx-1 my-1 h-1.5 bg-muted', className)} {...props} />;
}

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue, selectTriggerVariants };
