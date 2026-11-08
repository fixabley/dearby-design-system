import { useState } from 'react';
import type { ProgramDetailData } from '@/types';
import { KindLabel } from '@/components/atoms/KindLabel';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Toggle } from '@/components/ui/toggle';
import { Card, CardTitle } from '@/components/ui/card';
import { HostLine } from '@/components/atoms/HostLine';
import { ActivityRow } from './ActivityRow';
import { ReviewSection } from './ReviewSection';
import { RowList } from '@/components/atoms/RowList';

/** 프로그램 화면: 배너 · 로고 + 팔로우 · 이름 · 조직 · 종류 · 태그 · 개수 · 모집 중 · 지난 활동 · 후기 */
export function ProgramDetail({ p }: { p: ProgramDetailData }) {
  const [follow, setFollow] = useState(false);
  return (
    <article className="flex flex-col gap-7 pb-32">
      <div>
        <div className="h-[180px] rounded-xl bg-cover bg-center" style={{ backgroundImage: p.cover ? `url(${p.cover})` : 'linear-gradient(135deg,#0E5E66,#2FB3B4)' }} />
        <div className="-mt-10 flex items-end justify-between px-4">
          <Avatar size="lg" src={p.host.logo} fallback={p.host.initial ?? ''} className="rounded-[18px] border-4 border-background" />
          <Toggle variant="follow" size="auto" pressed={follow} onPressedChange={setFollow} icon={follow ? 'check' : 'add'}>{follow ? '팔로우 중' : '팔로우'}</Toggle>
        </div>
        <h2 className="mt-3 text-title">{p.title}</h2>
        <HostLine text={p.host.text} className="mt-1" />
        <KindLabel kind={p.kind} className="mt-1.5" />
        <div className="mt-3 flex flex-wrap gap-1.5">{p.chips.map((c) => <Badge key={c} variant="mint">{c}</Badge>)}</div>
        <p className="mt-3 flex gap-3 text-caption text-muted-foreground">{['모집 중', '모집 예정', '지난 활동'].map((l, i) => <span key={l}><b className="mr-0.5 text-body font-bold text-foreground">{p.counts[i]}</b>{l}</span>)}</p>
      </div>
      {p.open.length > 0 && <Card><CardTitle>모집 중</CardTitle><RowList>{p.open.map((a) => <ActivityRow key={a.id} a={a} />)}</RowList></Card>}
      {p.past.length > 0 && <Card><CardTitle>지난 활동</CardTitle><RowList>{p.past.map((a) => <ActivityRow key={a.id} a={a} />)}</RowList></Card>}
      {p.reviews && <ReviewSection r={p.reviews} />}
    </article>
  );
}
