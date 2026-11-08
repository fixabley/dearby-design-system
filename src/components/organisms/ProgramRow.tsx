import type { Program } from '@/types';
import { KindLabel } from '@/components/atoms/KindLabel';
import { Thumbnail } from '@/components/atoms/Thumbnail';
import { HostLine } from '@/components/molecules/HostLine';
import { cn } from '@/lib/utils';

/** 발견의 프로그램 행 */
export function ProgramRow({ p, selected, onSelect }: { p: Program; selected?: boolean; onSelect?: (p: Program) => void }) {
  return (
    <a href={`/programs/${p.id}`} aria-current={selected || undefined} onClick={(e) => { e.preventDefault(); onSelect?.(p); }}
      className={cn('grid cursor-pointer grid-cols-[64px_minmax(0,1fr)] gap-x-3.5 rounded-2xl py-3.5 outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring',
        selected && '-mx-3 bg-accent px-3')}>
      <span className="flex flex-col items-center gap-[5px]"><KindLabel kind={p.kind} /><Thumbnail thumb={p.thumb} /></span>
      <div className="min-w-0">
        <HostLine {...p.host} count={p.count} />
        <div className="mt-[3px] line-clamp-2 text-headline leading-tight">{p.title}</div>
        <p className="mt-0.5 line-clamp-2 text-caption text-muted-foreground">{p.desc}</p>
      </div>
    </a>
  );
}
