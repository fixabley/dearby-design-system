import type { ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

/** 내용 칸(스크롤, 아래 떠 있는 전환 자리만큼 여백) */
function Body({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('min-h-0 flex-1 overflow-y-auto px-6 pb-24', className)}>{children}</div>;
}

/** 아래 가운데 떠 있는 전환 */
function Footer({ className, children }: { className?: string; children: ReactNode }) {
  return <DialogFooter className={className}>{children}</DialogFooter>;
}

function ModalRoot({ open, onOpenChange, title, sub, children }: { open: boolean; onOpenChange: (o: boolean) => void; title: string; sub?: string; children: ReactNode }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={sub ? undefined : undefined} className="h-[calc(100vh-48px)]">
        <DialogHeader><DialogTitle>{title}</DialogTitle>{sub && <DialogDescription>{sub}</DialogDescription>}</DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

/**
 * 큰 모달(shadcn Dialog, 컴파운드): 왼쪽 위 제목 · 보조 줄(title · sub), 오른쪽 위 닫기 + Body(내용) · Footer(아래 가운데 떠 있는 전환).
 * `<Modal open={open} onOpenChange={setOpen} title="…" sub="…"><Modal.Body><ConferenceTimetable … /></Modal.Body><Modal.Footer><Segmented … /></Modal.Footer></Modal>`
 */
export const Modal = Object.assign(ModalRoot, { Body, Footer });
