import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';
import { menuMotion } from './dropdown-menu';

// shadcn Popover + Dearby: 카드 면(모서리 16 · 컨트롤 그림자). 여닫는 움직임은 DropdownMenu와 같다.
// 좁은 화면에서 상자가 화면 끝에 붙지 않게 화면 여백(16)만큼 안쪽에 머문다(collisionPadding)
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 6,
  collisionPadding = 16,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          'z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-lg bg-popover p-4 text-popover-foreground shadow-control outline-none',
          menuMotion,
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
