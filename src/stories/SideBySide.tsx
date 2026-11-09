import type { ReactNode } from 'react';

/** 불러온 부품과 스켈레톤을 같은 폭으로 나란히 둔다. 바뀔 때 높이가 같은지 비교한다 */
export function SideBySide({
  width,
  children,
}: {
  width: number;
  children: [ReactNode, ReactNode];
}) {
  return (
    <div className="flex items-start gap-8">
      {children.map((c, i) => (
        <div key={i} style={{ width }}>
          <p className="mb-2 text-micro text-muted-foreground">
            {i ? '스켈레톤' : '불러온 뒤'}
          </p>
          <div data-compare={i ? 'skeleton' : 'loaded'}>{c}</div>
        </div>
      ))}
    </div>
  );
}
