import * as React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { cn } from '@/lib/utils';
import { menuItem, menuMotion, menuSeparator } from './dropdown-menu';

// shadcn ContextMenu: 오른쪽 클릭(터치는 길게 누르기)으로 여는 메뉴. 행·구분선·움직임은 DropdownMenu와 같고,
// 신고·차단 같은 행은 variant destructive로 빨갛게. 면은 DropdownMenu와 같되 그림자만 컨트롤 그림자
const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

function ContextMenuContent({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content data-slot="context-menu-content" className={cn(
        'z-50 min-w-[230px] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-[14px] bg-popover/95 p-1 text-popover-foreground shadow-control backdrop-blur-xl',
        menuMotion, className)} {...props} />
    </ContextMenuPrimitive.Portal>
  );
}

function ContextMenuItem({ className, variant = 'default', ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Item> & { variant?: 'default' | 'destructive' }) {
  return <ContextMenuPrimitive.Item data-slot="context-menu-item" data-variant={variant} className={cn(menuItem,
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-45 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-[highlighted]:bg-destructive/10',
    className)} {...props} />;
}

function ContextMenuSeparator({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return <ContextMenuPrimitive.Separator data-slot="context-menu-separator" className={cn(menuSeparator, className)} {...props} />;
}

export { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger };
