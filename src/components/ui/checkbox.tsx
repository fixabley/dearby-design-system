import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/foundations/Icon';

// shadcn Checkbox + Dearby: 22px 네모(모서리 6). 켜면 청록 채움, 흰 체크가 스프링으로 커진다
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer grid size-[22px] shrink-0 place-items-center rounded-sm text-primary-foreground inset-ring-[1.5px] inset-ring-muted-foreground/50 outline-none transition-colors duration-150',
        'focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-primary data-[state=checked]:inset-ring-0 dark:data-[state=checked]:shadow-control',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        forceMount
        data-slot="checkbox-indicator"
        className="flex transition-transform duration-300 ease-spring data-[state=unchecked]:scale-0 [&_svg]:size-3.5"
      >
        <Icon name="checkmark" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
