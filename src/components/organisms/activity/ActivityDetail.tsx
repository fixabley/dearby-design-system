import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ActivityDetailData as Detail } from '@/types';
import { ActionTiles } from '@/components/molecules/activity/ActionTile';
import { MetaList } from '@/components/molecules/shared/MetaLine';
import { cn } from '@/lib/utils';
import { DetailHeader } from '@/components/organisms/activity/DetailHeader';
import { ScheduleCard } from '@/components/organisms/activity/ScheduleCard';

type ActivityDetailContextValue = {
  d: Detail;
  inline: boolean;
  added: boolean;
  setAdded: (v: boolean) => void;
};
const ActivityDetailContext = createContext<ActivityDetailContextValue | null>(
  null,
);

function useActivityDetail(part: string) {
  const ctx = useContext(ActivityDetailContext);
  if (!ctx)
    throw new Error(`ActivityDetail.${part}는 <ActivityDetail> 안에서 쓴다`);
  return ctx;
}

/** 커버 사진(있을 때만) */
function Cover({ className }: { className?: string }) {
  const { d } = useActivityDetail('Cover');
  return d.cover ? (
    <div
      role="img"
      aria-label={`${d.title} 커버`}
      className={cn(
        'h-[260px] rounded-xl bg-cover bg-center shadow-[0_10px_30px_rgba(20,32,31,.14)]',
        className,
      )}
      style={{ backgroundImage: `url(${d.cover})` }}
    />
  ) : null;
}

/** 머리(DetailHeader). inline이 아니면 오른쪽 배지는 고정 카드가 맡는다 */
function Header({ className }: { className?: string }) {
  const { d, inline } = useActivityDetail('Header');
  return <DetailHeader d={d} badges={inline} className={className} />;
}

/** 날짜·장소 메타 */
function Metas({ className }: { className?: string }) {
  const { d } = useActivityDetail('Metas');
  return (
    <div className={cn('mt-2.5', className)}>
      <MetaList items={d.metas} />
    </div>
  );
}

/** 행동 타일(내 활동에 추가 · 캘린더 구독) */
function Actions({ className }: { className?: string }) {
  const { added, setAdded } = useActivityDetail('Actions');
  return (
    <div className={cn('mt-6', className)}>
      <ActionTiles added={added} onAdd={() => setAdded(!added)} />
    </div>
  );
}

/** 일정 카드 */
function Schedule({ className }: { className?: string }) {
  const { d } = useActivityDetail('Schedule');
  return (
    <div className={cn('mt-7', className)}>
      <ScheduleCard groups={d.schedule} note={d.note} />
    </div>
  );
}

function ActivityDetailRoot({
  d,
  inline = true,
  children,
}: {
  d: Detail;
  inline?: boolean;
  children?: ReactNode;
}) {
  const [added, setAdded] = useState(false);
  return (
    <ActivityDetailContext.Provider value={{ d, inline, added, setAdded }}>
      <article className="pb-32">
        {children ?? (
          <>
            <Cover />
            <Header />
            {inline && <Metas />}
            {inline && <Actions />}
            <Schedule />
          </>
        )}
      </article>
    </ActivityDetailContext.Provider>
  );
}

/**
 * 활동 상세 본문(컴파운드): Cover · Header · Metas(날짜) · Actions(행동) · Schedule(일정).
 * inline이 아니면 날짜·행동은 오른쪽 고정 카드(ApplyCard)가 맡아 기본 조립에서 빠진다.
 * 기본 조립은 `<ActivityDetail d={d} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<ActivityDetail d={d}><ActivityDetail.Header /><ActivityDetail.Schedule /></ActivityDetail>`
 */
export const ActivityDetail = Object.assign(ActivityDetailRoot, {
  Cover,
  Header,
  Metas,
  Actions,
  Schedule,
});
