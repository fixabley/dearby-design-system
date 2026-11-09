import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/foundations/Icon';

// shadcn DropdownMenu + iOS 메뉴 모양. 누른 자리에서 커지며 열린다(transform-origin은 Radix가 넘겨준다)
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

/** 떠 있는 면이 누른 자리에서 커지며 열리고 줄며 닫힌다. ContextMenu·Popover도 같은 움직임 */
export const menuMotion =
  'duration-200 ease-spring data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-90 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95';
/** 메뉴 행·구분선. ContextMenu도 같은 모양 */
export const menuItem =
  'flex min-h-11 cursor-default select-none items-center gap-2 rounded-[10px] px-3 text-body outline-none data-[highlighted]:bg-muted [&_svg]:size-4';
export const menuSeparator = '-mx-1 my-1 h-1.5 bg-muted';

function DropdownMenuContent({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-[230px] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-[14px] bg-popover/95 p-1 text-popover-foreground shadow-[0_10px_40px_rgba(0,0,0,.18)] backdrop-blur-xl',
          menuMotion,
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  sub,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
  sub?: React.ReactNode;
}) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        'relative flex min-h-11 cursor-default select-none flex-col justify-center rounded-[10px] py-1.5 pl-8 pr-3 outline-none data-[highlighted]:bg-muted',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 top-1/2 flex size-4 -translate-y-1/2 items-center justify-center [&_svg]:size-4">
        <DropdownMenuPrimitive.ItemIndicator>
          <Icon name="check" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      <span className="text-body">{children}</span>
      {sub && <span className="text-caption text-muted-foreground">{sub}</span>}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(menuItem, className)}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn(menuSeparator, className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
};
