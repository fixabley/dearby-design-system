import { createContext, useContext, type ReactNode } from 'react';
import type { TimelineGroup } from '@/types';
import { Text, TextSkeleton } from '@/components/atoms/shared/Text';
import { Card, CardTitle } from '@/components/ui/card';
import {
  Timeline,
  TimelineSkeleton,
} from '@/components/molecules/shared/Timeline';

type ScheduleCardContextValue = { groups: TimelineGroup[]; note?: string };
const ScheduleCardContext = createContext<ScheduleCardContextValue | null>(
  null,
);

function useScheduleCard(part: string) {
  const ctx = useContext(ScheduleCardContext);
  if (!ctx)
    throw new Error(`ScheduleCard.${part}는 <ScheduleCard> 안에서 쓴다`);
  return ctx;
}

/** 카드 제목 */
function Title({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return <CardTitle className={className}>{children ?? '일정'}</CardTitle>;
}

/** 일정 타임라인(선발 과정 / 활동 일정) */
function ScheduleCardTimeline({ className }: { className?: string }) {
  const { groups } = useScheduleCard('Timeline');
  return <Timeline groups={groups} className={className} />;
}

/** 아래 안내(있을 때만) */
function Note({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { note } = useScheduleCard('Note');
  const node = children ?? note;
  return node ? (
    <Text as="p" variant="caption" tone="muted" className={className}>
      {node}
    </Text>
  ) : null;
}

function ScheduleCardRoot({
  groups,
  note,
  children,
}: {
  groups: TimelineGroup[];
  note?: string;
  children?: ReactNode;
}) {
  return (
    <ScheduleCardContext.Provider value={{ groups, note }}>
      <Card>
        {children ?? (
          <>
            <Title />
            <ScheduleCardTimeline />
            <Note />
          </>
        )}
      </Card>
    </ScheduleCardContext.Provider>
  );
}

/**
 * 일정 카드(컴파운드): Title · Timeline(선발 과정 / 활동 일정) · Note(안내).
 * 기본 조립은 `<ScheduleCard groups={groups} note={note} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<ScheduleCard groups={groups} note={note}><ScheduleCard.Title>선발 일정</ScheduleCard.Title><ScheduleCard.Timeline /></ScheduleCard>`
 */
export const ScheduleCard = Object.assign(ScheduleCardRoot, {
  Title,
  Timeline: ScheduleCardTimeline,
  Note,
});

/** 불러오는 동안의 일정 카드: 같은 카드 면과 간격(제목 · 타임라인 묶음 하나). 안내는 있을 때만이라 뺀다 */
export function ScheduleCardSkeleton({ items }: { items?: number }) {
  return (
    <Card aria-hidden>
      {/* 카드 제목(CardTitle)과 같은 줄 높이 · 여백 */}
      <TextSkeleton variant="body" className="-mt-0.5 mb-2.5 w-12" />
      <TimelineSkeleton items={items} />
    </Card>
  );
}
