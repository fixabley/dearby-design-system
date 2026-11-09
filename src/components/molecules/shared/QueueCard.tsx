import { createContext, useContext, type ReactNode } from 'react';
import { Text, TextSkeleton } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

/** 카드 면(원래 부품과 스켈레톤이 함께 쓴다) */
const SURFACE =
  'flex w-full items-center gap-3.5 rounded-xl bg-gradient-to-br from-[#E3F3F2] to-[#F4F8F8] px-4 py-[18px] dark:from-card dark:to-card';

type QueueCardContextValue = { covers: string[]; title: string; sub: string };
const QueueCardContext = createContext<QueueCardContextValue | null>(null);

function useQueueCard(part: string) {
  const ctx = useContext(QueueCardContext);
  if (!ctx) throw new Error(`QueueCard.${part}는 <QueueCard> 안에서 쓴다`);
  return ctx;
}

/** 겹친 커버 묶음 */
function Covers({ className }: { className?: string }) {
  const { covers } = useQueueCard('Covers');
  return (
    <span className={cn('flex shrink-0 pl-3', className)}>
      {covers.map((c) => (
        <i
          key={c}
          className="-ml-3 h-11 w-[34px] rounded-sm border-2 border-white bg-cover bg-center shadow-[0_1px_3px_rgba(0,0,0,.12)]"
          style={{ backgroundImage: `url(${c})` }}
        />
      ))}
    </span>
  );
}

/** 제목 · 보조 줄(넘치면 말줄임) */
function QueueCardText({ className }: { className?: string }) {
  const { title, sub } = useQueueCard('Text');
  return (
    <span className={cn('min-w-0', className)}>
      <Text as="b" variant="innerTitle" block truncate>
        {title}
      </Text>
      <Text as="small" variant="caption" tone="muted" block truncate>
        {sub}
      </Text>
    </span>
  );
}

/** 오른쪽 화살표 */
function Chevron({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'ml-auto shrink-0 text-[#b8b8bc] [&_svg]:size-4',
        className,
      )}
    >
      <Icon name="chevronRight" />
    </span>
  );
}

function QueueCardRoot({
  covers,
  title = '오늘의 맞춤 대기열',
  sub,
  onClick,
  children,
}: {
  covers: string[];
  title?: string;
  sub: string;
  onClick?: () => void;
  children?: ReactNode;
}) {
  return (
    <QueueCardContext.Provider value={{ covers, title, sub }}>
      <Card
        asChild
        className={cn(
          SURFACE,
          'text-left outline-none transition-transform active:scale-[.99] focus-visible:ring-2 focus-visible:ring-ring',
        )}
      >
        <button type="button" onClick={onClick}>
          {children ?? (
            <>
              <Covers />
              <QueueCardText />
              <Chevron />
            </>
          )}
        </button>
      </Card>
    </QueueCardContext.Provider>
  );
}

/**
 * 오늘의 맞춤 대기열 진입 카드(shadcn Card를 버튼으로, 컴파운드): Covers · Text(제목 · 보조 줄) · Chevron.
 * 기본 조립은 `<QueueCard covers={[…]} sub="프로그램 7개 중 3개 봤어요" />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<QueueCard covers={[…]} sub="…"><QueueCard.Text /><QueueCard.Chevron /></QueueCard>`
 */
export const QueueCard = Object.assign(QueueCardRoot, {
  Covers,
  Text: QueueCardText,
  Chevron,
});

/** 불러오는 동안의 대기열 카드: 같은 면과 간격(겹친 커버 세 장 자리 · 제목 · 보조 줄) */
export function QueueCardSkeleton() {
  return (
    <Card aria-hidden className={SURFACE}>
      <Skeleton className="h-11 w-[78px] shrink-0 rounded-sm" />
      <div className="min-w-0 flex-1">
        <TextSkeleton variant="innerTitle" className="w-1/2" />
        <TextSkeleton variant="caption" className="w-3/4" />
      </div>
    </Card>
  );
}
