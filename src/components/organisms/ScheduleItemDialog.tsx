import type { ReactNode } from 'react';
import type { Leader } from '@/types';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item';
import { renderLite } from '@/lib/markdown';

/**
 * 시간표 항목 상세(shadcn Dialog): 머리 배지 · 제목 · 시각 · 이끄는 사람 · 태그 · 상세 설명 · 동작.
 * 시간표 모달 위에 겹쳐 열려도 Esc·바깥 누르기는 이 창만 닫는다.
 */
export function ScheduleItemDialog({ open, onOpenChange, badge, title, when, people = [], tags = [], description, action }: {
  open: boolean; onOpenChange: (o: boolean) => void; badge?: ReactNode; title: string; when?: string; people?: Leader[]; tags?: string[]; description?: string; action?: ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-auto max-h-[80vh] max-w-[480px]">
        <DialogHeader className="gap-1.5">
          {badge && <div className="self-start">{badge}</div>}
          <DialogTitle className="text-section leading-tight">{title}</DialogTitle>
          {when && <DialogDescription>{when}</DialogDescription>}
        </DialogHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-6 pb-6 pt-1">
          {tags.length > 0 && <div className="flex flex-wrap gap-1">{tags.map((t) => <Badge key={t} variant="mint" size="sm">{t}</Badge>)}</div>}
          {people.length > 0 && (
            <ItemGroup variant="plain">
              {people.map((p) => (
                <Item key={p.name} size="sm" className="px-0">
                  <ItemMedia><Avatar fallback={p.initial} /></ItemMedia>
                  <ItemContent><ItemTitle className="text-body font-semibold">{p.name}</ItemTitle>{p.role && <ItemDescription>{p.role}</ItemDescription>}</ItemContent>
                </Item>
              ))}
            </ItemGroup>
          )}
          {description && <p className="whitespace-pre-line text-body leading-relaxed">{renderLite(description)}</p>}
          {action}
        </div>
      </DialogContent>
    </Dialog>
  );
}
