import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Templates/Modal', parameters: { layout: 'fullscreen' } } satisfies Meta;

const Ph = ({ t, h = 120 }: { t: string; h?: number }) => <div className="grid place-items-center rounded-lg border-[1.5px] border-dashed border-border text-caption font-semibold text-muted-foreground" style={{ height: h }}>{t}</div>;
const Shell = ({ children, title = 'Title' }: { children: React.ReactNode; title?: string }) => (
  <X.WebShell height={600} sidebar={<div className="p-3"><Ph t="Sidebar 220" h={576} /></div>}><X.TopBar title={title} right={<div className="w-[120px]"><Ph t="GlassGroup" h={44} /></div>} />{children}</X.WebShell>
);
export const Default: S = { render: function R() { const [o, setO] = useState(false); return <div><X.Button variant="mint" onClick={() => setO(true)}>시간표 열기</X.Button><X.Modal open={o} onOpenChange={setO} title="파이토치 데이 코리아 2026 · 오후 세션" sub="11월 21일 (토) 13:30 ~ 17:30 · 코엑스 그랜드볼룸" footer={<div className="w-[240px]"><X.Segmented items={['all', 'mine'] as const} labels={{ all: '전체', mine: '내 시간표' }} value="all" /></div>}><X.ConferenceTimetable tracks={D.TRACKS} slots={D.SLOTS} /></X.Modal></div>; } };
export const Opened: S = { render: () => <X.Modal open onOpenChange={() => {}} title="파이토치 데이 코리아 2026 · 오후 세션" sub="11월 21일 (토) 13:30 ~ 17:30 · 코엑스 그랜드볼룸" footer={<div className="w-[240px]"><X.Segmented items={['all', 'mine'] as const} labels={{ all: '전체', mine: '내 시간표' }} value="all" /></div>}><X.ConferenceTimetable tracks={D.TRACKS} slots={D.SLOTS} /></X.Modal> };
