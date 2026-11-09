import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ProgramDetailData } from '@/types';
import { HostLine } from '@/components/molecules/program/HostLine';
import { KindLabel } from '@/components/atoms/activity/KindLabel';
import { RowList } from '@/components/atoms/shared/RowList';
import { Text } from '@/components/atoms/shared/Text';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import { ActivityRow } from '@/components/organisms/activity/ActivityRow';
import { ReviewSection } from '@/components/organisms/review/ReviewSection';

const COUNTS = ['모집 중', '모집 예정', '지난 활동'];

type ProgramDetailContextValue = {
  p: ProgramDetailData;
  follow: boolean;
  setFollow: (v: boolean) => void;
};
const ProgramDetailContext = createContext<ProgramDetailContextValue | null>(
  null,
);

function useProgramDetail(part: string) {
  const ctx = useContext(ProgramDetailContext);
  if (!ctx)
    throw new Error(`ProgramDetail.${part}는 <ProgramDetail> 안에서 쓴다`);
  return ctx;
}

/** 배너(커버 사진, 없으면 청록 그러데이션) */
function Banner({ className }: { className?: string }) {
  const { p } = useProgramDetail('Banner');
  return (
    <div
      className={cn('h-[180px] rounded-xl bg-cover bg-center', className)}
      style={{
        backgroundImage: p.cover
          ? `url(${p.cover})`
          : 'linear-gradient(135deg,#0E5E66,#2FB3B4)',
      }}
    />
  );
}

/** 로고 + 팔로우(배너 아래에 걸친다) */
function Identity({ className }: { className?: string }) {
  const { p, follow, setFollow } = useProgramDetail('Identity');
  return (
    <div
      className={cn('-mt-10 flex items-end justify-between px-4', className)}
    >
      <Avatar
        size="lg"
        src={p.host.logo}
        fallback={p.host.initial ?? ''}
        className="rounded-[18px] border-4 border-background"
      />
      <Toggle
        variant="follow"
        size="auto"
        pressed={follow}
        onPressedChange={setFollow}
        icon={follow ? 'check' : 'add'}
      >
        {follow ? '팔로우 중' : '팔로우'}
      </Toggle>
    </div>
  );
}

/** 프로그램 이름 */
function Title({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { p } = useProgramDetail('Title');
  return (
    <Text as="h2" variant="title" className={cn('mt-3', className)}>
      {children ?? p.title}
    </Text>
  );
}

/** 조직 */
function Host({ className }: { className?: string }) {
  const { p } = useProgramDetail('Host');
  return <HostLine text={p.host.text} className={cn('mt-1', className)} />;
}

/** 활동 종류 */
function Kind({ className }: { className?: string }) {
  const { p } = useProgramDetail('Kind');
  return <KindLabel kind={p.kind} className={cn('mt-1.5', className)} />;
}

/** 태그(민트 배지) */
function Tags({ className }: { className?: string }) {
  const { p } = useProgramDetail('Tags');
  return (
    <div className={cn('mt-3 flex flex-wrap gap-1.5', className)}>
      {p.chips.map((c) => (
        <Badge key={c} variant="mint">
          {c}
        </Badge>
      ))}
    </div>
  );
}

/** 모집 중 · 모집 예정 · 지난 활동 개수 */
function Counts({ className }: { className?: string }) {
  const { p } = useProgramDetail('Counts');
  return (
    <Text
      as="p"
      variant="caption"
      tone="muted"
      className={cn('mt-3 flex gap-3', className)}
    >
      {COUNTS.map((l, i) => (
        <span key={l}>
          <Text
            as="b"
            variant="body"
            weight="bold"
            tone="default"
            className="mr-0.5"
          >
            {p.counts[i]}
          </Text>
          {l}
        </span>
      ))}
    </Text>
  );
}

/** 모집 중 활동 카드(있을 때만) */
function Open({ className }: { className?: string }) {
  const { p } = useProgramDetail('Open');
  return p.open.length > 0 ? (
    <Card className={className}>
      <CardTitle>모집 중</CardTitle>
      <RowList>
        {p.open.map((a) => (
          <ActivityRow key={a.id} a={a} />
        ))}
      </RowList>
    </Card>
  ) : null;
}

/** 지난 활동 카드(있을 때만) */
function Past({ className }: { className?: string }) {
  const { p } = useProgramDetail('Past');
  return p.past.length > 0 ? (
    <Card className={className}>
      <CardTitle>지난 활동</CardTitle>
      <RowList>
        {p.past.map((a) => (
          <ActivityRow key={a.id} a={a} />
        ))}
      </RowList>
    </Card>
  ) : null;
}

/** 지난 기수 후기(있을 때만) */
function Reviews({ className }: { className?: string }) {
  const { p } = useProgramDetail('Reviews');
  return p.reviews ? (
    <ReviewSection r={p.reviews} className={className} />
  ) : null;
}

function ProgramDetailRoot({
  p,
  children,
}: {
  p: ProgramDetailData;
  children?: ReactNode;
}) {
  const [follow, setFollow] = useState(false);
  return (
    <ProgramDetailContext.Provider value={{ p, follow, setFollow }}>
      <article className="flex flex-col gap-7 pb-32">
        {children ?? (
          <>
            <div>
              <Banner />
              <Identity />
              <Title />
              <Host />
              <Kind />
              <Tags />
              <Counts />
            </div>
            <Open />
            <Past />
            <Reviews />
          </>
        )}
      </article>
    </ProgramDetailContext.Provider>
  );
}

/**
 * 프로그램 화면(컴파운드): 머리(Banner · Identity 로고 + 팔로우 · Title · Host · Kind · Tags · Counts) · Open(모집 중) · Past(지난 활동) · Reviews(후기).
 * 기본 조립은 `<ProgramDetail p={program} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<ProgramDetail p={program}><div><ProgramDetail.Title /><ProgramDetail.Host /></div><ProgramDetail.Open /></ProgramDetail>`
 */
export const ProgramDetail = Object.assign(ProgramDetailRoot, {
  Banner,
  Identity,
  Title,
  Host,
  Kind,
  Tags,
  Counts,
  Open,
  Past,
  Reviews,
});
