import type { ReactNode } from 'react';
import type { IconName } from '@/icons';
import { Icon } from '@/components/atoms/Icon';
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item';
import { cn } from '@/lib/utils';

/** iOS 묶음 목록(shadcn ItemGroup). 위에 작은 머리 */
export function ListGroup({ title, children, className }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={className}>
      {title && <h4 className="mb-1.5 mt-5 px-4 text-caption text-muted-foreground">{title}</h4>}
      <ItemGroup>{children}</ItemGroup>
    </section>
  );
}

/** 묶음 목록의 행(shadcn Item): 아이콘 또는 앞 요소 · 제목/보조 줄 · 오른쪽 값·스위치·라디오 */
export function ListRow({ icon, title, subtitle, trailing, add, selected, onClick, className, children }: {
  icon?: IconName; title: ReactNode; subtitle?: ReactNode; trailing?: ReactNode; add?: boolean; selected?: boolean; onClick?: () => void; className?: string; children?: ReactNode;
}) {
  const body = (
    <>
      {icon && <ItemMedia variant="icon"><Icon name={icon} /></ItemMedia>}
      {children && <ItemMedia>{children}</ItemMedia>}
      <ItemContent><ItemTitle className={cn(add && 'text-accent-foreground')}>{title}</ItemTitle>{subtitle && <ItemDescription>{subtitle}</ItemDescription>}</ItemContent>
      {trailing != null && <ItemActions>{trailing}</ItemActions>}
    </>
  );
  return onClick ? <Item asChild selected={selected} className={className}><button type="button" onClick={onClick}>{body}</button></Item> : <Item selected={selected} className={className}>{body}</Item>;
}
