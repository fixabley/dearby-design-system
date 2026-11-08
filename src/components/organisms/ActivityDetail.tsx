import { useState } from 'react';
import type { ActivityDetailData as Detail } from '@/types';
import { ActionTiles } from '@/components/molecules/ActionTile';
import { MetaList } from '@/components/molecules/MetaLine';
import { DetailHeader } from './DetailHeader';
import { ScheduleCard } from './ScheduleCard';

/** 활동 상세 본문(커버 · 머리 · 날짜 · 행동 · 일정). inline이 아니면 날짜·행동은 오른쪽 고정 카드(ApplyCard)가 맡는다 */
export function ActivityDetail({ d, inline = true }: { d: Detail; inline?: boolean }) {
  const [added, setAdded] = useState(false);
  return (
    <article className="pb-32">
      {d.cover && <div role="img" aria-label={`${d.title} 커버`} className="h-[260px] rounded-xl bg-cover bg-center shadow-[0_10px_30px_rgba(20,32,31,.14)]" style={{ backgroundImage: `url(${d.cover})` }} />}
      <DetailHeader d={d} badges={inline} />
      {inline && <div className="mt-2.5"><MetaList items={d.metas} /></div>}
      {inline && <div className="mt-6"><ActionTiles added={added} onAdd={() => setAdded(!added)} /></div>}
      <div className="mt-7"><ScheduleCard groups={d.schedule} note={d.note} /></div>
    </article>
  );
}
