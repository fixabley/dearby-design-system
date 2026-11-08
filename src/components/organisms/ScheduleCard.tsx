import type { TimelineGroup } from '@/types';
import { Card, CardTitle } from '@/components/ui/card';
import { Timeline } from '@/components/molecules/Timeline';

/** 일정 카드: 선발 과정 / 활동 일정 */
export function ScheduleCard({ groups, note }: { groups: TimelineGroup[]; note?: string }) {
  return <Card><CardTitle>일정</CardTitle><Timeline groups={groups} />{note && <p className="text-caption text-muted-foreground">{note}</p>}</Card>;
}
