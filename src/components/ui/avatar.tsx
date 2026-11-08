import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// shadcn Avatar + Dearby: 사진이 없으면 민트 바탕 청록 첫 글자. mark는 조직 로고 자리의 작은 네모
const avatarVariants = cva('relative flex shrink-0 overflow-hidden', {
  variants: {
    size: { sm: 'size-9 rounded-full text-[14px]', md: 'size-12 rounded-full text-[18px]', lg: 'size-20 rounded-full text-[30px]', mark: 'size-4 rounded-sm text-[11px]', dot: 'size-[18px] rounded-full text-[10px]' },
  },
  defaultVariants: { size: 'sm' },
});

function Avatar({ className, size, src, fallback, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root> & VariantProps<typeof avatarVariants> & { src?: string; fallback: string }) {
  return (
    <AvatarPrimitive.Root data-slot="avatar" className={cn(avatarVariants({ size }), className)} {...props}>
      {src && <AvatarPrimitive.Image src={src} alt="" className="aspect-square size-full object-cover" />}
      <AvatarPrimitive.Fallback delayMs={src ? 300 : 0} className="flex size-full items-center justify-center bg-accent font-bold text-accent-foreground">{fallback}</AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

export { Avatar, avatarVariants };
