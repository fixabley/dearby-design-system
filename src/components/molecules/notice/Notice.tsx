import { createContext, useContext, type ReactNode } from 'react';
import { Text, TextSkeleton } from '@/components/atoms/shared/Text';
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
function Title({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { title } = useNotice('Title');
  return (
    <Text as="b" variant="innerTitle" block className={className}>
      {children ?? title}
    </Text>
  );
}

/** 본문(줄인 마크다운 렌더) */
function Body({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { body } = useNotice('Body');
  return (
    <Text variant="body" className={cn('mt-1', className)}>
      {children ?? renderLite(body)}
    </Text>
  );
}

/** 쓴 사람 · 시각 */
function Byline({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { byline } = useNotice('Byline');
  const node = children ?? byline;
  return node ? (
    <Text
      as="small"
      variant="caption"
      tone="muted"
      block
      className={cn('mt-1.5', className)}
    >
      {node}
    </Text>
  ) : null;
}

function NoticeRoot({
  title,
  body,
  byline,
  children,
}: {
  title: string;
  body: string;
  byline?: string;
  children?: ReactNode;
}) {
  return (
    <NoticeContext.Provider value={{ title, body, byline }}>
      <div>
        {children ?? (
          <>
            <Title />
            <Body />
            <Byline />
          </>
        )}
      </div>
    </NoticeContext.Provider>
  );
}

/**
 * 공지 한 개(컴파운드): Title · Body(줄인 마크다운 렌더) · Byline.
 * 기본 조립은 `<Notice title={…} body={…} byline={…} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<Notice title={…} body={…} byline={…}><Notice.Title /><Notice.Byline className="mt-0.5" /></Notice>`
 */
export const Notice = Object.assign(NoticeRoot, { Title, Body, Byline });

/** 불러오는 동안의 공지 한 개: 같은 간격(제목 · 본문 lines줄 · 쓴 사람 줄). 본문 길이는 불러오기 전에는 알 수 없어 lines로 받는다 */
export function NoticeSkeleton({ lines = 2 }: { lines?: number }) {
  return (
    <div aria-hidden>
      <TextSkeleton variant="innerTitle" className="w-2/3" />
      <TextSkeleton variant="body" lines={lines} className="mt-1" />
      <TextSkeleton variant="caption" className="mt-1.5 w-1/2" />
    </div>
  );
}
