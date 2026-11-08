import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

// shadcn Switch + iOS 모양(51×31, 켜면 초록). 손잡이는 스프링으로 미끄러지고 누르는 동안 늘어난다
function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root data-slot="switch" className={cn(
      'peer group inline-flex h-[31px] w-[51px] shrink-0 items-center rounded-full bg-[#E5E5EA] p-0.5 outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 data-[state=checked]:bg-success dark:bg-muted',
      className)} {...props}>
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={cn(
        'pointer-events-none block h-[27px] w-[27px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,.2)] transition-[transform,width] duration-300 ease-spring',
        'data-[state=checked]:translate-x-5 group-active:w-[33px] group-active:data-[state=checked]:translate-x-3.5')} />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
