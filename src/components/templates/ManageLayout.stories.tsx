import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Templates/ManageLayout', parameters: { layout: 'fullscreen' } } satisfies Meta;

const Ph = ({ t, h = 120 }: { t: string; h?: number }) => <div className="grid place-items-center rounded-lg border-[1.5px] border-dashed border-border text-caption font-semibold text-muted-foreground" style={{ height: h }}>{t}</div>;
const Shell = ({ children, title = 'Title' }: { children: React.ReactNode; title?: string }) => (
  <X.WebShell height={600} sidebar={<div className="p-3"><Ph t="Sidebar 220" h={576} /></div>}><X.TopBar title={title} right={<div className="w-[120px]"><Ph t="GlassGroup" h={44} /></div>} />{children}</X.WebShell>
);
export const Default: S = { render: function R() { const [t, setT] = useState<X.ManageTab>('assignments'); return <Shell title="Group name"><X.ManageLayout tab={t} onTab={setT}><X.TwoPane list={<Ph t={`${X.MANAGE_TAB_LABEL[t]} list`} h={400} />} detail={<Ph t="Edit" h={400} />} /></X.ManageLayout></Shell>; } };
