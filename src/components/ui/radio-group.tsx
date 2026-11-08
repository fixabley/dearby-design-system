import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/lib/utils';

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn('grid gap-0', className)} {...props} />;
}

// 22px 원. 고르면 청록 채움 + 흰 점이 스프링으로 커진다
function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item data-slot="radio-group-item" className={cn(
      'grid size-[22px] shrink-0 place-items-center rounded-full ring-[1.5px] ring-inset ring-[#C4C4C7] outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:ring-0',
      className)} {...props}>
      <RadioGroupPrimitive.Indicator forceMount className="size-2 rounded-full bg-white transition-transform duration-300 ease-spring data-[state=unchecked]:scale-0" />
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
