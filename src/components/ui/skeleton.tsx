import * as React from 'react';
import { cn } from '@/lib/utils';

// shadcn Skeleton + Dearby: 글자색 6% 면에 은은한 깜빡임(animate-pulse). 크기·모양(글자 줄·원·둥근 사각형)은 쓰는 쪽 className으로
// 채움(muted) 대신 글자색을 얇게 깔아 바탕·카드·채움 묶음 어디서나 보인다. 페이지 바탕 위에서는 채움과 거의 같은 색이다
// 화면 읽기에서는 숨긴다. 불러오는 중이라는 표시는 감싸는 영역의 aria-busy로 한다. 동작 줄이기 설정이면 styles.css가 깜빡임을 끈다
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn('animate-pulse rounded-md bg-foreground/6', className)}
      {...props}
    />
  );
}

export { Skeleton };
