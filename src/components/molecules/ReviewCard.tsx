import type { Rating } from '@/types';
import { Icon } from '@/components/atoms/Icon';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const RATING_LABEL: Record<Rating, string> = { recommend: '추천해요', neutral: '보통이에요', disappointed: '아쉬워요' };

/** 후기 한 개: 이름·기수·연월 + 평가 세 단계 + 글(3줄까지) */
export function ReviewCard({ initial, name, meta, rating, body, verified }: { initial: string; name: string; meta: string; rating: Rating; body?: string; verified?: boolean }) {
  return (
    <article className="py-3.5">
      <header className="flex items-center gap-2.5">
        <Avatar fallback={initial} />
        <span className="min-w-0 flex-1"><b className="block text-body font-semibold">{name}</b><small className="text-[12px] text-muted-foreground">{meta}</small></span>
        {verified && <Badge variant="mint" size="sm"><Icon name="check" />참여 인증</Badge>}
      </header>
      <p className={cn('mt-2 text-caption font-semibold', rating === 'recommend' ? 'text-accent-foreground' : 'text-muted-foreground')}>{RATING_LABEL[rating]}</p>
      {body && <p className="mt-1 line-clamp-3 text-[14px] leading-relaxed">{body}</p>}
    </article>
  );
}
