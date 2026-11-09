import { Children, type ReactNode } from 'react';
import { Separator } from '@/components/ui/separator';

/** 행 목록: 행 사이 구분선은 썸네일 열 다음(글 시작선)부터 */
export function RowList({
  children,
  inset = 78,
  columns,
}: {
  children: ReactNode;
  inset?: number;
  columns?: 2;
}) {
  const items = Children.toArray(children);
  if (columns === 2)
    return (
      <div className="grid grid-cols-2 gap-x-12">
        {items.map((c, i) => (
          <div key={i} className={i > 1 ? 'border-t border-border' : ''}>
            {c}
          </div>
        ))}
      </div>
    );
  return (
    <div>
      {items.map((c, i) => (
        <div key={i}>
          {i > 0 && (
            <Separator
              style={{ marginLeft: inset, width: `calc(100% - ${inset}px)` }}
            />
          )}
          {c}
        </div>
      ))}
    </div>
  );
}
