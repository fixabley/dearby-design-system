import type { ReactNode } from 'react';
import type { IconName } from '@/icons';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/lib/utils';

/** iOS 묶음 목록(inset grouped). 행 사이 구분선은 글자 시작선부터 */
export function ListGroup({ title, children, className }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={className}>
      {title && <h4 className="mb-1.5 mt-5 px-4 text-caption text-muted-foreground">{title}</h4>}
      <div className="overflow-hidden rounded-md bg-muted [&>*+*]:border-t [&>*+*]:border-border">{children}</div>
    </section>
  );
}

/** 묶음 목록의 행: 아이콘 · 제목/보조 줄 · 오른쪽(값·스위치·라디오) */
export function ListRow({ icon, title, subtitle, trailing, add, selected, onClick, className, children }: {
  icon?: IconName; title: ReactNode; subtitle?: ReactNode; trailing?: ReactNode; add?: boolean; selected?: boolean; onClick?: () => void; className?: string; children?: ReactNode;
}) {
  const Comp = onClick ? 'button' : 'div';
  return (
    <Comp type={onClick ? 'button' : undefined} onClick={onClick} className={cn(
      'flex min-h-11 w-full items-center gap-3 px-4 py-2 text-left outline-none transition-colors duration-200 focus-visible:bg-accent/60 [&_svg]:size-[22px]',
      selected && 'bg-accent', className)}>
      {icon && <span className="text-accent-foreground"><Icon name={icon} /></span>}
      {children}
      <span className="min-w-0 flex-1">
        <b className={cn('block truncate text-[17px] font-normal', add && 'text-accent-foreground')}>{title}</b>
        {subtitle && <small className="block truncate text-[12px] text-muted-foreground">{subtitle}</small>}
      </span>
      {typeof trailing === 'string' ? <span className="shrink-0 text-body text-muted-foreground">{trailing}</span> : trailing}
    </Comp>
  );
}
