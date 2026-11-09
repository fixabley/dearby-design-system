import { createContext, useContext, useState, type ReactNode } from 'react';
import { Text } from '@/components/atoms/shared/Text';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SheetHeader } from '@/components/ui/sheet';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

export type FilterGroup = {
  title: string;
  hint?: string;
  options: {
    label: string;
    count?: number;
    on?: boolean;
    disabled?: boolean;
  }[];
};

type FilterSheetContextValue = {
  groups: FilterGroup[];
  sel: boolean[][];
  toggle: (gi: number, oi: number, v: boolean) => void;
  clear: () => void;
  resultLabel: string;
  onApply?: () => void;
};
const FilterSheetContext = createContext<FilterSheetContextValue | null>(null);

function useFilterSheet(part: string) {
  const ctx = useContext(FilterSheetContext);
  if (!ctx) throw new Error(`FilterSheet.${part}는 <FilterSheet> 안에서 쓴다`);
  return ctx;
}

/** 머리: 제목 + 닫기 */
function Header({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return <SheetHeader title={children ?? '필터'} className={className} />;
}

/** 묶음 하나(index번째): 제목(· 힌트) + 칩(Toggle). 두 번째 묶음부터 위에 구분선 */
function Group({ index, className }: { index: number; className?: string }) {
  const { groups, sel, toggle } = useFilterSheet('Group');
  const g = groups[index];
  return (
    <section className={className}>
      {index > 0 && <Separator className="my-4" />}
      <Text as="h4" variant="innerTitle" className="mb-2.5">
        {g.title}
        {g.hint && (
          <Text
            as="small"
            variant="caption"
            weight="regular"
            tone="muted"
            className="ml-2"
          >
            {g.hint}
          </Text>
        )}
      </Text>
      <div className="flex flex-wrap gap-2">
        {g.options.map((o, oi) => (
          <Toggle
            key={o.label}
            pressed={sel[index][oi]}
            disabled={o.disabled}
            onPressedChange={(v) => toggle(index, oi, v)}
          >
            {o.label}
            {o.count != null && (
              <Text as="small" variant="caption" weight="regular" tone="muted">
                {o.count}
              </Text>
            )}
          </Toggle>
        ))}
      </div>
    </section>
  );
}

/** 아래: 전체 지우기 · 결과 보기 */
function Footer({ className }: { className?: string }) {
  const { clear, resultLabel, onApply } = useFilterSheet('Footer');
  return (
    <div className={cn('mt-5 flex items-center justify-between', className)}>
      <Button variant="ghost" onClick={clear}>
        전체 지우기
      </Button>
      <Button onClick={onApply}>{resultLabel}</Button>
    </div>
  );
}

function FilterSheetRoot({
  groups,
  resultLabel,
  onApply,
  children,
}: {
  groups: FilterGroup[];
  resultLabel: string;
  onApply?: () => void;
  children?: ReactNode;
}) {
  const [sel, setSel] = useState(() =>
    groups.map((g) => g.options.map((o) => !!o.on)),
  );
  const toggle = (gi: number, oi: number, v: boolean) =>
    setSel(
      sel.map((r, i) => (i === gi ? r.map((x, j) => (j === oi ? v : x)) : r)),
    );
  const clear = () => setSel(groups.map((g) => g.options.map(() => false)));
  return (
    <FilterSheetContext.Provider
      value={{ groups, sel, toggle, clear, resultLabel, onApply }}
    >
      {children ?? (
        <>
          <Header />
          <div className="-mx-5 flex-1 overflow-y-auto px-5">
            {groups.map((g, gi) => (
              <Group key={g.title} index={gi} />
            ))}
          </div>
          <Footer />
        </>
      )}
    </FilterSheetContext.Provider>
  );
}

/**
 * 필터 시트 내용(shadcn Sheet 안에 넣는다, 컴파운드): Header · 묶음마다 Group(칩 Toggle) · Footer(전체 지우기 · 결과 보기).
 * 기본 조립은 `<FilterSheet groups={groups} resultLabel="프로그램 3개 보기" />`(묶음은 따로 스크롤). 바꿔 조립하려면 부품을 직접 놓는다:
 * `<FilterSheet groups={groups} resultLabel="…"><FilterSheet.Header /><FilterSheet.Group index={0} /><FilterSheet.Footer /></FilterSheet>`
 */
export const FilterSheet = Object.assign(FilterSheetRoot, {
  Header,
  Group,
  Footer,
});
