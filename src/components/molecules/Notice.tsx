import { renderLite } from '@/lib/markdown';

/** 공지 한 개(줄인 마크다운 렌더) */
export function Notice({ title, body, byline }: { title: string; body: string; byline?: string }) {
  return (
    <div>
      <b className="block text-body font-semibold leading-snug">{title}</b>
      <p className="mt-1 text-[14px] leading-relaxed">{renderLite(body)}</p>
      {byline && <small className="mt-1.5 block text-[12px] text-muted-foreground">{byline}</small>}
    </div>
  );
}
