import type { Program } from '@/types';
import { KindLabel } from '@/components/atoms/KindLabel';
import { Thumbnail } from '@/components/atoms/Thumbnail';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { HostLine } from '@/components/atoms/HostLine';
import { cn } from '@/lib/utils';

/** 발견의 프로그램 행(shadcn Item 링크) */
export function ProgramRow({ p, selected, onSelect }: { p: Program; selected?: boolean; onSelect?: (p: Program) => void }) {
  return (
    <Item asChild size="row" selected={selected} className={cn('py-3.5', selected && '-mx-3 w-[calc(100%+24px)] px-3')}>
      <a href={`/programs/${p.id}`} aria-current={selected || undefined} onClick={(e) => { e.preventDefault(); onSelect?.(p); }}>
        <ItemMedia className="w-16 flex-col gap-[5px]"><KindLabel kind={p.kind} /><Thumbnail thumb={p.thumb} /></ItemMedia>
        <ItemContent>
          <HostLine {...p.host} count={p.count} />
          <ItemTitle className="mt-[3px] line-clamp-2 whitespace-normal text-headline leading-tight">{p.title}</ItemTitle>
          <ItemDescription className="mt-0.5 line-clamp-2 whitespace-normal text-caption">{p.desc}</ItemDescription>
        </ItemContent>
      </a>
    </Item>
  );
}
