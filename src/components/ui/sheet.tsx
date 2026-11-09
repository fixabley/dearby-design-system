import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

// shadcn Sheet(아래에서 올라오는 시트) + Dearby: 잡이 손잡이, 왼쪽 굵은 제목 + 오른쪽 닫기 글자. 넓은 화면에선 아래 가운데 떠 있는 카드
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;

function SheetContent({
  className,
  children,
  floating,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  floating?: boolean;
}) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/20 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          'fixed z-50 flex max-h-[85vh] flex-col bg-background px-5 pt-2 shadow-[0_-8px_40px_rgba(0,0,0,.15)] outline-none',
          // 아래에 붙는 시트만 홈 인디케이터만큼 아래 여백을 더한다. env(safe-area-inset-bottom)은 받아 쓰는 쪽이 viewport-fit=cover일 때만 값이 있고 아니면 0
          floating
            ? 'bottom-6 left-1/2 w-[440px] -translate-x-1/2 rounded-[24px] pb-6'
            : 'inset-x-0 bottom-0 rounded-t-[24px] pb-[calc(24px+env(safe-area-inset-bottom))]',
          'duration-300 ease-spring data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-8 data-[state=open]:fade-in-0',
          'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-8 data-[state=closed]:fade-out-0 data-[state=closed]:duration-150',
          className,
        )}
        {...props}
      >
        <div
          aria-hidden
          className="mx-auto mb-2 h-[5px] w-9 shrink-0 rounded-full bg-[#D1D1D6] dark:bg-white/20"
        />
        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

function SheetHeader({
  title,
  className,
}: {
  title: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex items-center justify-between py-2', className)}
    >
      <SheetPrimitive.Title className="text-headline">
        {title}
      </SheetPrimitive.Title>
      <SheetPrimitive.Close className="text-body font-semibold text-accent-foreground outline-none">
        닫기
      </SheetPrimitive.Close>
    </div>
  );
}

export { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger };
