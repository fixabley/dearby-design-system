import * as React from 'react';
import { cn } from '@/lib/utils';

// shadcn Card + Dearby 섹션 카드: 흰 바탕 + 그림자(테두리 없음), 모서리 16, 안쪽 18·20, 소제목 15/600
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card" className={cn('rounded-lg bg-card px-5 py-[18px] text-card-foreground shadow-control', className)} {...props} />;
}
function CardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return <h3 data-slot="card-title" className={cn('-mt-0.5 mb-2.5 text-body font-semibold', className)} {...props} />;
}
function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn(className)} {...props} />;
}

export { Card, CardContent, CardTitle };
