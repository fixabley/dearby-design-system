import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

// shadcn Card + Dearby 섹션 카드: 흰 면 + 얇은 테두리(페이지 바탕은 옅은 회색이라 면 대비가 보인다), 모서리 16, 안쪽 18·20, 소제목 15/600
function Card({
  className,
  asChild,
  interactive,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean; interactive?: boolean }) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      data-slot="card"
      className={cn(
        'rounded-lg bg-card px-5 py-[18px] text-card-foreground shadow-card',
        // 카드 전체가 눌리면(`asChild`로 링크 · 버튼 요소를 카드로 쓸 때): 눌림 덧칠 + 3:1 포커스 링(2026-11-17 UI/UX 평가 반영)
        interactive &&
          'cursor-pointer outline-none transition-transform active:scale-[.99] focus-visible:ring-2 focus-visible:ring-ring pressable',
        className,
      )}
      {...props}
    />
  );
}
function CardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="card-title"
      className={cn('-mt-0.5 mb-2.5 text-body font-semibold', className)}
      {...props}
    />
  );
}
function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn(className)} {...props} />;
}

export { Card, CardContent, CardTitle };
