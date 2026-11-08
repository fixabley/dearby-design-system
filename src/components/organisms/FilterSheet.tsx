import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SheetHeader } from '@/components/ui/sheet';
import { Toggle } from '@/components/ui/toggle';

export type FilterGroup = { title: string; hint?: string; options: { label: string; count?: number; on?: boolean; disabled?: boolean }[] };

/** 필터 시트 내용(shadcn Sheet 안에 넣는다): 묶음마다 칩(Toggle) · 전체 지우기 · 결과 보기 */
export function FilterSheet({ groups, resultLabel, onApply }: { groups: FilterGroup[]; resultLabel: string; onApply?: () => void }) {
  const [sel, setSel] = useState(() => groups.map((g) => g.options.map((o) => !!o.on)));
  return (
    <>
      <SheetHeader title="필터" />
      <div className="-mx-5 flex-1 overflow-y-auto px-5">
        {groups.map((g, gi) => (
          <section key={g.title}>
            {gi > 0 && <Separator className="my-4" />}
            <h4 className="mb-2.5 text-body font-semibold">{g.title}{g.hint && <small className="ml-2 text-caption font-normal text-muted-foreground">{g.hint}</small>}</h4>
            <div className="flex flex-wrap gap-2">
              {g.options.map((o, oi) => (
                <Toggle key={o.label} pressed={sel[gi][oi]} disabled={o.disabled} onPressedChange={(v) => setSel(sel.map((r, i) => (i === gi ? r.map((x, j) => (j === oi ? v : x)) : r)))}>
                  {o.label}{o.count != null && <small className="text-caption font-normal text-muted-foreground">{o.count}</small>}
                </Toggle>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <Button variant="ghost" onClick={() => setSel(groups.map((g) => g.options.map(() => false)))}>전체 지우기</Button>
        <Button onClick={onApply}>{resultLabel}</Button>
      </div>
    </>
  );
}
