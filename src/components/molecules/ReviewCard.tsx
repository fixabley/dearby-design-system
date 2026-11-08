import type { Rating } from '@/types';
import { Icon } from '@/components/atoms/Icon';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { cn } from '@/lib/utils';

export const RATING_LABEL: Record<Rating, string> = { recommend: '추천해요', neutral: '보통이에요', disappointed: '아쉬워요' };

/** 후기 한 개: 머리(shadcn Item: Avatar · 이름·기수 · 참여 인증 Badge) + 평가 + 글(3줄까지) */
export function ReviewCard({ initial, name, meta, rating, body, verified }: { initial: string; name: string; meta: string; rating: Rating; body?: string; verified?: boolean }) {
  return (
    <article className="py-3.5">
      <Item className="min-h-0 p-0">
        <ItemMedia><Avatar fallback={initial} /></ItemMedia>
        <ItemContent><ItemTitle className="text-body font-semibold">{name}</ItemTitle><ItemDescription>{meta}</ItemDescription></ItemContent>
        {verified && <ItemActions><Badge variant="mint" size="sm"><Icon name="check" />참여 인증</Badge></ItemActions>}
      </Item>
      <p className={cn('mt-2 text-caption font-semibold', rating === 'recommend' ? 'text-accent-foreground' : 'text-muted-foreground')}>{RATING_LABEL[rating]}</p>
      {body && <p className="mt-1 line-clamp-3 text-[14px] leading-relaxed">{body}</p>}
    </article>
  );
}
