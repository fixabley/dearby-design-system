import { useState } from 'react';
import type { ActivityDetailData as ActivityDetail } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ActionTiles } from '@/components/molecules/ActionTile';
import { MetaList } from '@/components/molecules/MetaLine';

/** 링크로 바로 들어온 상세의 오른쪽 고정 카드 */
export function ApplyCard({ d }: { d: ActivityDetail }) {
  const [added, setAdded] = useState(false);
  return (
    <Card className="sticky top-0 flex flex-col gap-4 p-5">
      <div className="flex gap-2">{d.dday && <Badge>{d.dday}</Badge>}{d.state && <Badge variant="muted">{d.state}</Badge>}</div>
      <MetaList items={d.metas} />
      <ActionTiles added={added} onAdd={() => setAdded(!added)} />
      <Button size="lg" block>신청하러 가기</Button>
    </Card>
  );
}
