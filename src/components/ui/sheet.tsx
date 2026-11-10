import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/foundations/Icon';
import { buttonVariants } from './button';

// shadcn Sheet(아래에서 올라오는 시트) + Dearby: 잡이 손잡이, 왼쪽 굵은 제목. 넓은 화면에선 아래 가운데 떠 있는 카드
// 시안의 시트 머리는 오른쪽이 "닫기" 글자(.hsh · .tsheet .close)다. 2026-11-10 사용자 결정으로 바텀시트는 보이는 닫기를 없애 바깥 누르기 · Esc로 닫고,
// 넓은 화면(떠 있는 카드 · 대화상자)은 X 버튼을 보인다(README 시트 머리)
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
/** 머리를 따로 그리는 시트 화면의 제목(Radix가 시트마다 제목을 요구한다) */
const SheetTitle = SheetPrimitive.Title;

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
        data-floating={floating || undefined}
        className={cn(
          // 그림자는 시안 .fsheet · .tksheet, 다크는 .dk .sheet처럼 그림자 대신 .5px 링
          // 최대 높이는 dvh: 휴대폰에서 주소창이 펼쳐져 있어도 보이는 화면의 15%가 위에 남아 바깥을 눌러 닫을 수 있다(vh는 주소창이 접힌 큰 화면 기준)
          'fixed z-50 flex max-h-[85dvh] flex-col bg-background px-5 pt-2 shadow-[0_-8px_30px_rgba(20,32,31,.16)] outline-none dark:shadow-control',
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

/**
 * 시트 머리: 왼쪽 제목 + 닫기. 닫기는 머리가 놓인 곳에 따라 다르게 그린다.
 * 바텀시트에서는 숨기고, 초점이 있고 브라우저가 초점 표시를 켤 때(:focus-visible)만 글자로 보인다(화면 읽기에는 늘 있다).
 * 넓은 화면의 떠 있는 카드(SheetContent floating)와 대화상자(DialogContent showClose={false}) 안에서는 X 버튼이 보인다
 */
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
      className={cn(
        'flex min-h-10 shrink-0 items-center gap-2 py-2',
        className,
      )}
    >
      <SheetPrimitive.Title className="flex-1 text-headline">
        {title}
      </SheetPrimitive.Title>
      <SheetPrimitive.Close className="-m-1.5 rounded-md p-1.5 text-body font-semibold text-accent-foreground outline-none pressable focus-visible:ring-2 focus-visible:ring-ring not-focus-visible:sr-only in-data-floating:hidden in-data-[slot=dialog-content]:hidden">
        닫기
      </SheetPrimitive.Close>
      {/* 아이콘 버튼(40)이 머리 높이를 늘리지 않고, 아이콘(22)의 오른쪽 끝이 내용 끝에 맞게 */}
      <SheetPrimitive.Close
        className={cn(
          buttonVariants({ variant: 'plain', size: 'icon-sm' }),
          '-my-2 -mr-[9px] hidden in-data-floating:inline-flex in-data-[slot=dialog-content]:inline-flex',
        )}
      >
        <Icon name="close" />
        <span className="sr-only">닫기</span>
      </SheetPrimitive.Close>
    </div>
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
