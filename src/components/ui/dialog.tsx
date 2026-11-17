import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/foundations/Icon';
import { TransitionPortal, TransitionRoot } from '@/lib/transition-open';

// shadcn Dialog + Dearby: 큰 모달(왼쪽 위 제목, 오른쪽 위 글래스 닫기). 열고 닫기는 브라우저 View Transitions(React <ViewTransition>)의 기본 전환(교차 페이드)이다
const Dialog = TransitionRoot;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn('fixed inset-0 z-50 bg-black/30', className)}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showClose = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showClose?: boolean;
}) {
  return (
    <TransitionPortal
      overlay={<DialogOverlay forceMount />}
      content={
        <DialogPrimitive.Content
          forceMount
          data-slot="dialog-content"
          className={cn(
            'fixed left-1/2 top-1/2 z-50 flex max-h-[calc(100vh-48px)] w-[calc(100vw-80px)] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-sheet shadow-card outline-none',
            className,
          )}
          {...props}
        >
          {children}
          {/* 닫기는 button-group의 glass와 같은 평평한 조작 면 */}
          {showClose && (
            <DialogPrimitive.Close className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-control shadow-control transition-transform active:scale-95 pressable [&_svg]:size-5">
              <Icon name="close" />
              <span className="sr-only">닫기</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      }
    />
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-0.5 px-6 pb-2 pt-5 pr-20', className)}
      {...props}
    />
  );
}
function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'pointer-events-none absolute inset-x-0 bottom-5 flex justify-center [&>*]:pointer-events-auto',
        className,
      )}
      {...props}
    />
  );
}
function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('text-headline leading-snug', className)}
      {...props}
    />
  );
}
function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-caption text-muted-foreground', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
