import type { TimelineGroup } from '@/types';
import { Badge } from '@/components/ui/badge';

/** 일정 타임라인: 묶음 머리(민트 캡슐) + 점 + 제목·날짜 */
export function Timeline({ groups }: { groups: TimelineGroup[] }) {
  return (
    <ol className="relative">
      {groups.map((g) => (
        <li key={g.title}>
          <div className="relative flex items-center gap-2.5 pb-3.5 pt-0.5 after:absolute after:bottom-0 after:left-1.5 after:top-6 after:border-l after:border-border">
            <span className="size-3.5 rounded-full bg-primary ring-[3px] ring-accent" />
            <Badge variant="mint" className="h-auto px-2.5 py-[5px] text-caption font-semibold">{g.title}</Badge>
          </div>
          <ol>
            {g.items.map((it, i) => (
              <li key={it.title} className="relative grid grid-cols-[14px_minmax(0,1fr)] items-start gap-3 pb-[18px] after:absolute after:bottom-0 after:left-1.5 after:top-[17px] after:border-l after:border-border last:[&:is(:last-child)]:after:hidden">
                <span className="ml-[3px] mt-[7px] size-[7px] rounded-full bg-primary" />
                <div><b className="block text-body font-semibold leading-snug">{it.title}</b>
                  <span className="text-caption text-muted-foreground">{it.when}</span>{it.dday && <Badge size="sm" className="ml-1.5 align-[1px]">{it.dday}</Badge>}</div>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
