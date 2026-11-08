import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ActivityDetailData as ActivityDetail } from '@/types';
import { HostLine } from '@/components/molecules/program/HostLine';
import { KindLabel } from '@/components/atoms/activity/KindLabel';
import { Text } from '@/components/atoms/shared/Text';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TrackPicker } from '@/components/molecules/shared/TrackPicker';
import { cn } from '@/lib/utils';

const TRACKS = ['서울 · AI 애플리케이션', '서울 · 피지컬 AI', '대전 · AI 애플리케이션', '광주 · AI 애플리케이션'];

type DetailHeaderContextValue = { d: ActivityDetail; track?: string; setTrack: (t: string) => void };
const DetailHeaderContext = createContext<DetailHeaderContextValue | null>(null);

function useDetailHeader(part: string) {
  const ctx = useContext(DetailHeaderContext);
  if (!ctx) throw new Error(`DetailHeader.${part}는 <DetailHeader> 안에서 쓴다`);
  return ctx;
}

/** 활동 종류 */
function Kind({ className }: { className?: string }) {
  const { d } = useDetailHeader('Kind');
  return <KindLabel kind={d.kind} className={cn('mb-1', className)} />;
}

/** 조직 줄 */
function Host({ className }: { className?: string }) {
  const { d } = useDetailHeader('Host');
  return <HostLine {...d.host} className={className} />;
}

/** 활동 이름 */
function Title({ className, children }: { className?: string; children?: ReactNode }) {
  const { d } = useDetailHeader('Title');
  return <Text variant="section" className={cn('mb-1 mt-0.5', className)}>{children ?? d.title}</Text>;
}

/** 구분(캠퍼스 · 트랙) 고르기. 고를 것이 있는 활동만 */
function Picker({ className }: { className?: string }) {
  const { d, track, setTrack } = useDetailHeader('Picker');
  if (!d.picker) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><TrackPicker value={track} className={className} /></DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup value={track} onValueChange={setTrack}>
          {TRACKS.map((x) => <DropdownMenuRadioItem key={x} value={x}>{x}</DropdownMenuRadioItem>)}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** 왼쪽 글 열: 종류 · 조직 줄 · 제목 · 구분 고르기. children을 주면 그 조립으로 바꾼다 */
function Body({ className, children }: { className?: string; children?: ReactNode }) {
  return <div className={cn('min-w-0 flex-1', className)}>{children ?? <><Kind /><Host /><Title /><Picker /></>}</div>;
}

/** 오른쪽 D-day · 모집 상태 */
function Badges({ className }: { className?: string }) {
  const { d } = useDetailHeader('Badges');
  return <div className={cn('flex w-14 shrink-0 flex-col gap-2', className)}>{d.dday && <Badge className="w-full">{d.dday}</Badge>}{d.state && <Badge variant="muted" className="w-full">{d.state}</Badge>}</div>;
}

function DetailHeaderRoot({ d, badges = true, className, children }: { d: ActivityDetail; badges?: boolean; className?: string; children?: ReactNode }) {
  const [track, setTrack] = useState<string>();
  return (
    <DetailHeaderContext.Provider value={{ d, track, setTrack }}>
      <div className={cn('mt-5 flex gap-4', className)}>{children ?? <><Body />{badges && <Badges />}</>}</div>
    </DetailHeaderContext.Provider>
  );
}

/**
 * 상세 머리(컴파운드): Body(Kind · Host · Title · Picker 구분 고르기) | 오른쪽 Badges(D-day · 모집 상태, badges가 false면 빠진다).
 * 기본 조립은 `<DetailHeader d={d} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<DetailHeader d={d}><DetailHeader.Body><DetailHeader.Title /><DetailHeader.Picker /></DetailHeader.Body><DetailHeader.Badges /></DetailHeader>`
 */
export const DetailHeader = Object.assign(DetailHeaderRoot, { Body, Kind, Host, Title, Picker, Badges });
