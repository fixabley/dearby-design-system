import type { ReactNode } from 'react';

/** 줄인 마크다운: **굵게** · `코드` */
export function renderLite(md: string): ReactNode[] {
  return md.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((p, i) =>
    p.startsWith('**') ? <b key={i}>{p.slice(2, -2)}</b> : p.startsWith('`') ? <code key={i} className="rounded-[4px] bg-muted px-1 font-mono text-[13px]">{p.slice(1, -1)}</code> : p);
}
