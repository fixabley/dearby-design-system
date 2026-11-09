import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ActivityDetailData as ActivityDetail } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ActionTiles } from '@/components/molecules/activity/ActionTile';
import { MetaList } from '@/components/molecules/shared/MetaLine';
import { cn } from '@/lib/utils';

type ApplyCardContextValue = {
  d: ActivityDetail;
  added: boolean;
  setAdded: (v: boolean) => void;
};
const ApplyCardContext = createContext<ApplyCardContextValue | null>(null);

function useApplyCard(part: string) {
  const ctx = useContext(ApplyCardContext);
  if (!ctx) throw new Error(`ApplyCard.${part}는 <ApplyCard> 안에서 쓴다`);
  return ctx;
}

/** D-day · 모집 상태 배지 */
function Badges({ className }: { className?: string }) {
  const { d } = useApplyCard('Badges');
  return (
    <div className={cn('flex gap-2', className)}>
      {d.dday && <Badge>{d.dday}</Badge>}
      {d.state && <Badge variant="muted">{d.state}</Badge>}
    </div>
  );
}

/** 날짜·장소 메타 */
function Metas({ className }: { className?: string }) {
  const { d } = useApplyCard('Metas');
  return <MetaList items={d.metas} className={className} />;
}

/** 행동 타일(내 활동에 추가 · 캘린더 구독) */
function Actions({ className }: { className?: string }) {
  const { added, setAdded } = useApplyCard('Actions');
  return (
    <ActionTiles
      added={added}
      onAdd={() => setAdded(!added)}
      className={className}
    />
  );
}

/** 신청하러 가기 */
function Cta({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Button size="lg" block className={className}>
      {children ?? '신청하러 가기'}
    </Button>
  );
}

function ApplyCardRoot({
  d,
  children,
}: {
  d: ActivityDetail;
  children?: ReactNode;
}) {
  const [added, setAdded] = useState(false);
  return (
    <ApplyCardContext.Provider value={{ d, added, setAdded }}>
      <Card className="sticky top-0 flex flex-col gap-4 p-5">
        {children ?? (
          <>
            <Badges />
            <Metas />
            <Actions />
            <Cta />
          </>
        )}
      </Card>
    </ApplyCardContext.Provider>
  );
}

/**
 * 링크로 바로 들어온 상세의 오른쪽 고정 카드(컴파운드): Badges(D-day · 모집 상태) · Metas · Actions(행동 타일) · Cta(신청하러 가기).
 * 기본 조립은 `<ApplyCard d={d} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<ApplyCard d={d}><ApplyCard.Badges /><ApplyCard.Cta /></ApplyCard>`
 */
export const ApplyCard = Object.assign(ApplyCardRoot, {
  Badges,
  Metas,
  Actions,
  Cta,
});
