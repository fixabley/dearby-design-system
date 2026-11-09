import { createContext, useContext, type ReactNode } from 'react';
import type { Rating } from '@/types';
import { Text, TextSkeleton } from '@/components/atoms/shared/Text';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { cn } from '@/lib/utils';

export const RATING_LABEL: Record<Rating, string> = {
  recommend: '추천해요',
  neutral: '보통이에요',
  disappointed: '아쉬워요',
};

type ReviewCardContextValue = {
  initial: string;
  name: string;
  meta: string;
  rating: Rating;
  body?: string;
  verified?: boolean;
};
const ReviewCardContext = createContext<ReviewCardContextValue | null>(null);

function useReviewCard(part: string) {
  const ctx = useContext(ReviewCardContext);
  if (!ctx) throw new Error(`ReviewCard.${part}는 <ReviewCard> 안에서 쓴다`);
  return ctx;
}

/** 쓴 사람: 아바타 · 이름 · 기수 */
function Author() {
  const { initial, name, meta } = useReviewCard('Author');
  return (
    <>
      <ItemMedia>
        <Avatar fallback={initial} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <Text variant="innerTitle">{name}</Text>
        </ItemTitle>
        <ItemDescription>{meta}</ItemDescription>
      </ItemContent>
    </>
  );
}

/** 참여 인증 배지 */
function Verified({ className }: { className?: string }) {
  const { verified } = useReviewCard('Verified');
  return verified ? (
    <ItemActions className={className}>
      <Badge variant="mint" size="sm" icon="check">
        참여 인증
      </Badge>
    </ItemActions>
  ) : null;
}

/** 머리 줄(shadcn Item): 쓴 사람 · 참여 인증. children을 주면 그 조립으로 바꾼다 */
function Header({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Item className={cn('min-h-0 p-0', className)}>
      {children ?? (
        <>
          <Author />
          <Verified />
        </>
      )}
    </Item>
  );
}

/** 평가(추천이면 청록) */
function Rating({ className }: { className?: string }) {
  const { rating } = useReviewCard('Rating');
  return (
    <Text
      as="p"
      variant="control"
      tone={rating === 'recommend' ? 'accent' : 'muted'}
      className={cn('mt-2', className)}
    >
      {RATING_LABEL[rating]}
    </Text>
  );
}

/** 글(3줄까지) */
function Body({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { body } = useReviewCard('Body');
  const node = children ?? body;
  return node ? (
    <Text variant="body" lines={3} className={cn('mt-1', className)}>
      {node}
    </Text>
  ) : null;
}

function ReviewCardRoot({
  initial,
  name,
  meta,
  rating,
  body,
  verified,
  children,
}: {
  initial: string;
  name: string;
  meta: string;
  rating: Rating;
  body?: string;
  verified?: boolean;
  children?: ReactNode;
}) {
  return (
    <ReviewCardContext.Provider
      value={{ initial, name, meta, rating, body, verified }}
    >
      <article className="py-3.5">
        {children ?? (
          <>
            <Header />
            <Rating />
            <Body />
          </>
        )}
      </article>
    </ReviewCardContext.Provider>
  );
}

/**
 * 후기 한 개(컴파운드): Header(shadcn Item: Author = Avatar · 이름·기수, Verified = 참여 인증 Badge) · Rating · Body(3줄까지).
 * 기본 조립은 `<ReviewCard {...review} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<ReviewCard {...review}><ReviewCard.Rating className="mt-0" /><ReviewCard.Body /><ReviewCard.Header className="mt-2" /></ReviewCard>`
 */
export const ReviewCard = Object.assign(ReviewCardRoot, {
  Header,
  Author,
  Verified,
  Rating,
  Body,
});

/** 불러오는 동안의 후기 한 개: 같은 칸과 간격(아바타 · 이름 · 기수, 평가, 글 세 줄). 참여 인증은 있을 때만이라 뺀다 */
export function ReviewCardSkeleton() {
  return (
    <div aria-hidden className="py-3.5">
      <Item className="min-h-0 p-0">
        <ItemMedia>
          <Skeleton className="size-9 rounded-full" />
        </ItemMedia>
        <ItemContent>
          {/* 이름 칸은 ItemTitle(입력·목록 행 줄 높이) 안의 행 안 제목이라 bodyLarge 줄 높이를 쓴다 */}
          <TextSkeleton variant="bodyLarge" className="w-16" />
          <TextSkeleton variant="caption" className="w-28" />
        </ItemContent>
      </Item>
      <TextSkeleton variant="control" className="mt-2 w-16" />
      <TextSkeleton variant="body" lines={3} className="mt-1" />
    </div>
  );
}
