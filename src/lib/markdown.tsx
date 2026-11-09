import type { ReactNode } from 'react';

/**
 * 줄인 마크다운(공지·상세 설명 공통, 디스코드에도 같은 원본을 보낸다).
 * **굵게** · *기울임* · _기울임_(단어 안 밑줄은 그대로) · ~~취소선~~ · `코드` · [글자](https://…) · 그냥 쓴 https://… 주소.
 * 링크는 http·https만 만든다(javascript: 같은 주소는 글자로 남김). 줄바꿈·• 목록은 감싸는 쪽의 whitespace-pre-line이 맡는다.
 */
const TOKEN = String.raw`(\x60[^\x60\n]+\x60)|\[([^\]\n]+)\]\((https?:\/\/[^)\s]+)\)|\*\*([^*\n]+)\*\*|~~([^~\n]+)~~|\*([^*\n]+)\*|(?<![\p{L}\p{N}_])_([^_\n]+)_(?![\p{L}\p{N}_])|(https?:\/\/[^\s<>()]*[^\s<>().,!?'"])`;
const LINK =
  'font-medium text-accent-foreground underline decoration-current/40 underline-offset-2 transition-colors hover:decoration-current';

export function renderLite(md: string, key = 'm'): ReactNode[] {
  const re = new RegExp(TOKEN, 'gu');
  const out: ReactNode[] = [];
  let last = 0;
  let n = 0;
  for (let m = re.exec(md); m; m = re.exec(md)) {
    if (m.index > last) out.push(md.slice(last, m.index));
    const k = `${key}-${n++}`;
    if (m[1])
      out.push(
        <code
          key={k}
          className="rounded-[4px] bg-muted px-1 font-mono text-[13px]"
        >
          {m[1].slice(1, -1)}
        </code>,
      );
    else if (m[2])
      out.push(
        <a
          key={k}
          href={m[3]}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK}
        >
          {renderLite(m[2], k)}
        </a>,
      );
    else if (m[4])
      out.push(
        <b key={k} className="font-semibold">
          {renderLite(m[4], k)}
        </b>,
      );
    else if (m[5]) out.push(<s key={k}>{renderLite(m[5], k)}</s>);
    else if (m[6] ?? m[7])
      out.push(<em key={k}>{renderLite((m[6] ?? m[7])!, k)}</em>);
    else if (m[8])
      out.push(
        <a
          key={k}
          href={m[8]}
          target="_blank"
          rel="noopener noreferrer"
          className={cn2(LINK, 'break-all')}
        >
          {m[8].replace(/^https?:\/\//, '')}
        </a>,
      );
    last = re.lastIndex;
  }
  if (last < md.length) out.push(md.slice(last));
  return out;
}

const cn2 = (...c: string[]) => c.join(' ');
