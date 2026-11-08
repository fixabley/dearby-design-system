import type { ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

/** 큰 모달(shadcn Dialog): 왼쪽 위 제목·보조 줄, 오른쪽 위 닫기, 아래 가운데 떠 있는 전환 */
export function Modal({ open, onOpenChange, title, sub, footer, children }: { open: boolean; onOpenChange: (o: boolean) => void; title: string; sub?: string; footer?: ReactNode; children: ReactNode }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={sub ? undefined : undefined} className="h-[calc(100vh-48px)]">
        <DialogHeader><DialogTitle>{title}</DialogTitle>{sub && <DialogDescription>{sub}</DialogDescription>}</DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-24">{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
