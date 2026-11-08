import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Templates/Pane' } satisfies Meta;

const Ph = ({ t, h = 120 }: { t: string; h?: number }) => <div className="grid place-items-center rounded-lg border-[1.5px] border-dashed border-border text-caption font-semibold text-muted-foreground" style={{ height: h }}>{t}</div>;
const Shell = ({ children, title = 'Title' }: { children: React.ReactNode; title?: string }) => (
  <X.WebShell height={600} sidebar={<div className="p-3"><Ph t="Sidebar 220" h={576} /></div>}><X.TopBar title={title} right={<div className="w-[120px]"><Ph t="GlassGroup" h={44} /></div>} />{children}</X.WebShell>
);
export const FloatingBarMoves: S = { name: 'FloatingBar', render: function R() { const [l, setL] = useState(false); return <div className="relative h-[200px] w-[1060px] rounded-lg bg-muted"><X.Button variant="outline" className="m-4" onClick={() => setL(!l)}>칸 열기·닫기</X.Button><X.FloatingBar align={l ? 'left-pane' : 'center'}><X.SearchBar /></X.FloatingBar></div>; } };
