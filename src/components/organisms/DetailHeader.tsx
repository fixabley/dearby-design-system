import type { ActivityDetailData as ActivityDetail } from '@/types';
import { KindLabel } from '@/components/atoms/KindLabel';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HostLine } from '@/components/molecules/HostLine';
import { TrackPicker } from '@/components/molecules/TrackPicker';
import { useState } from 'react';

/** 상세 머리: 종류 · 조직 줄 · 제목 · 구분 고르기 | 오른쪽 D-day·모집 상태 */
export function DetailHeader({ d, badges = true }: { d: ActivityDetail; badges?: boolean }) {
  const [track, setTrack] = useState<string>();
  return (
    <div className="mt-5 flex gap-4">
      <div className="min-w-0 flex-1">
        <KindLabel kind={d.kind} className="mb-1" />
        <HostLine {...d.host} />
        <h2 className="mb-1 mt-0.5 text-section leading-tight">{d.title}</h2>
        {d.picker && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild><TrackPicker value={track} /></DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuRadioGroup value={track} onValueChange={setTrack}>
                {['서울 · AI 애플리케이션', '서울 · 피지컬 AI', '대전 · AI 애플리케이션', '광주 · AI 애플리케이션'].map((x) => <DropdownMenuRadioItem key={x} value={x}>{x}</DropdownMenuRadioItem>)}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {badges && <div className="flex w-14 shrink-0 flex-col gap-2">
        {d.dday && <Badge className="w-full">{d.dday}</Badge>}{d.state && <Badge variant="muted" className="w-full">{d.state}</Badge>}
      </div>}
    </div>
  );
}
