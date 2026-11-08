import { createContext, useContext, type ReactNode } from 'react';
import type { Leader } from '@/types';
import { Text } from '@/components/atoms/shared/Text';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item';
import { renderLite } from '@/lib/markdown';
import { cn } from '@/lib/utils';

type ScheduleItemDialogContextValue = { badge?: ReactNode; title: string; when?: string; people: Leader[]; tags: string[]; description?: string; action?: ReactNode };
const ScheduleItemDialogContext = createContext<ScheduleItemDialogContextValue | null>(null);

function useScheduleItemDialog(part: string) {
  const ctx = useContext(ScheduleItemDialogContext);
  if (!ctx) throw new Error(`ScheduleItemDialog.${part}는 <ScheduleItemDialog> 안에서 쓴다`);
  return ctx;
}

/** 머리 배지(있을 때만) */
function ScheduleItemDialogBadge({ className }: { className?: string }) {
  const { badge } = useScheduleItemDialog('Badge');
  return badge ? <div className={cn('self-start', className)}>{badge}</div> : null;
}

/** 제목 */
function Title({ className, children }: { className?: string; children?: ReactNode }) {
  const { title } = useScheduleItemDialog('Title');
  return <DialogTitle className={className}><Text as="span" variant="section">{children ?? title}</Text></DialogTitle>;
}

/** 시각 */
function When({ className, children }: { className?: string; children?: ReactNode }) {
  const { when } = useScheduleItemDialog('When');
  const node = children ?? when;
  return node ? <DialogDescription className={className}>{node}</DialogDescription> : null;
}

/** 태그(민트 배지) */
function Tags({ className }: { className?: string }) {
  const { tags } = useScheduleItemDialog('Tags');
  return tags.length > 0 ? <div className={cn('flex flex-wrap gap-1', className)}>{tags.map((t) => <Badge key={t} variant="mint" size="sm">{t}</Badge>)}</div> : null;
}

/** 이끄는 사람 */
function People({ className }: { className?: string }) {
  const { people } = useScheduleItemDialog('People');
  return people.length > 0 ? (
    <ItemGroup variant="plain" className={className}>
      {people.map((p) => (
        <Item key={p.name} size="sm" className="px-0">
          <ItemMedia><Avatar fallback={p.initial} /></ItemMedia>
          <ItemContent><ItemTitle><Text variant="innerTitle">{p.name}</Text></ItemTitle>{p.role && <ItemDescription>{p.role}</ItemDescription>}</ItemContent>
        </Item>
      ))}
    </ItemGroup>
  ) : null;
}

/** 상세 설명(줄인 마크다운) */
function Description({ className, children }: { className?: string; children?: ReactNode }) {
  const { description } = useScheduleItemDialog('Description');
  const node = children ?? (description && renderLite(description));
  return node ? <Text variant="body" pre className={className}>{node}</Text> : null;
}

/** 동작(찜 같은 버튼) */
function Action() {
  const { action } = useScheduleItemDialog('Action');
  return <>{action}</>;
}

/** 머리 칸: 배지 · 제목 · 시각. children을 주면 그 조립으로 바꾼다 */
function Header({ className, children }: { className?: string; children?: ReactNode }) {
  return <DialogHeader className={cn('gap-1.5', className)}>{children ?? <><ScheduleItemDialogBadge /><Title /><When /></>}</DialogHeader>;
}

/** 내용 칸(스크롤): 태그 · 이끄는 사람 · 상세 설명 · 동작. children을 주면 그 조립으로 바꾼다 */
function Body({ className, children }: { className?: string; children?: ReactNode }) {
  return <div className={cn('flex flex-col gap-4 overflow-y-auto px-6 pb-6 pt-1', className)}>{children ?? <><Tags /><People /><Description /><Action /></>}</div>;
}

function ScheduleItemDialogRoot({ open, onOpenChange, badge, title, when, people = [], tags = [], description, action, children }: {
  open: boolean; onOpenChange: (o: boolean) => void; badge?: ReactNode; title: string; when?: string; people?: Leader[]; tags?: string[]; description?: string; action?: ReactNode; children?: ReactNode;
}) {
  return (
    <ScheduleItemDialogContext.Provider value={{ badge, title, when, people, tags, description, action }}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="h-auto max-h-[80vh] max-w-[480px]">{children ?? <><Header /><Body /></>}</DialogContent>
      </Dialog>
    </ScheduleItemDialogContext.Provider>
  );
}

/**
 * 시간표 항목 상세(shadcn Dialog, 컴파운드): Header(Badge · Title · When) + Body(Tags · People 이끄는 사람 · Description 상세 설명 · Action 동작).
 * 시간표 모달 위에 겹쳐 열려도 Esc·바깥 누르기는 이 창만 닫는다.
 * 기본 조립은 `<ScheduleItemDialog open={open} onOpenChange={setOpen} title="특강" … />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<ScheduleItemDialog …><ScheduleItemDialog.Header /><ScheduleItemDialog.Body><ScheduleItemDialog.Description /><ScheduleItemDialog.People /></ScheduleItemDialog.Body></ScheduleItemDialog>`
 */
export const ScheduleItemDialog = Object.assign(ScheduleItemDialogRoot, { Header, Body, Badge: ScheduleItemDialogBadge, Title, When, Tags, People, Description, Action });
