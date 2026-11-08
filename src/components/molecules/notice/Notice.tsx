import { createContext, useContext, type ReactNode } from 'react';
import { Text } from '@/components/atoms/shared/Text';
import { renderLite } from '@/lib/markdown';
import { cn } from '@/lib/utils';

type NoticeContextValue = { title: string; body: string; byline?: string };
const NoticeContext = createContext<NoticeContextValue | null>(null);

function useNotice(part: string) {
  const ctx = useContext(NoticeContext);
  if (!ctx) throw new Error(`Notice.${part}는 <Notice> 안에서 쓴다`);
  return ctx;
}

/** 제목 */
function Title({ className, children }: { className?: string; children?: ReactNode }) {
  const { title } = useNotice('Title');
  return <Text as="b" variant="innerTitle" block className={className}>{children ?? title}</Text>;
}

/** 본문(줄인 마크다운 렌더) */
function Body({ className, children }: { className?: string; children?: ReactNode }) {
  const { body } = useNotice('Body');
  return <Text variant="body" className={cn('mt-1', className)}>{children ?? renderLite(body)}</Text>;
}

/** 쓴 사람 · 시각 */
function Byline({ className, children }: { className?: string; children?: ReactNode }) {
  const { byline } = useNotice('Byline');
  const node = children ?? byline;
  return node ? <Text as="small" variant="caption" tone="muted" block className={cn('mt-1.5', className)}>{node}</Text> : null;
}

function NoticeRoot({ title, body, byline, children }: { title: string; body: string; byline?: string; children?: ReactNode }) {
  return (
    <NoticeContext.Provider value={{ title, body, byline }}>
      <div>{children ?? <><Title /><Body /><Byline /></>}</div>
    </NoticeContext.Provider>
  );
}

/**
 * 공지 한 개(컴파운드): Title · Body(줄인 마크다운 렌더) · Byline.
 * 기본 조립은 `<Notice title={…} body={…} byline={…} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<Notice title={…} body={…} byline={…}><Notice.Title /><Notice.Byline className="mt-0.5" /></Notice>`
 */
export const Notice = Object.assign(NoticeRoot, { Title, Body, Byline });
