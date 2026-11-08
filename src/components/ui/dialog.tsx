import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/atoms/Icon';

// shadcn Dialog + Dearby: 큰 모달(왼쪽 위 제목, 오른쪽 위 글래스 닫기). 열 때 살짝 떠오르고 닫을 때 가라앉는다
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return <DialogPrimitive.Overlay data-slot="dialog-overlay" className={cn(
    'fixed inset-0 z-50 bg-black/30 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0', className)} {...props} />;
}

function DialogContent({ className, children, showClose = true, ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & { showClose?: boolean }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content data-slot="dialog-content" className={cn(
        'fixed left-1/2 top-1/2 z-50 flex max-h-[calc(100vh-48px)] w-[calc(100vw-80px)] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-background shadow-[0_20px_60px_rgba(0,0,0,.25)] outline-none',
        'duration-300 ease-spring data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[.97] data-[state=open]:slide-in-from-bottom-3',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[.98] data-[state=closed]:duration-150',
        className)} {...props}>
        {children}
        {showClose && (
          <DialogPrimitive.Close className="absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-black/10 bg-white/75 shadow-[0_4px_16px_rgba(0,0,0,.08)] backdrop-blur-xl transition-transform active:scale-95 dark:border-white/10 dark:bg-[rgba(32,36,39,.74)] [&_svg]:size-5">
            <Icon name="close" /><span className="sr-only">닫기</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-header" className={cn('flex flex-col gap-0.5 px-6 pb-2 pt-5 pr-20', className)} {...props} />;
}
function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-footer" className={cn('pointer-events-none absolute inset-x-0 bottom-5 flex justify-center [&>*]:pointer-events-auto', className)} {...props} />;
}
function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn('text-headline leading-snug', className)} {...props} />;
}
function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description data-slot="dialog-description" className={cn('text-caption text-muted-foreground', className)} {...props} />;
}

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger };
