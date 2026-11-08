import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Templates/SidebarDetail', parameters: { layout: 'fullscreen' } } satisfies Meta;

const Ph = ({ t, h = 120 }: { t: string; h?: number }) => <div className="grid place-items-center rounded-lg border-[1.5px] border-dashed border-border text-caption font-semibold text-muted-foreground" style={{ height: h }}>{t}</div>;
const Shell = ({ children, title = 'Title' }: { children: React.ReactNode; title?: string }) => (
  <X.WebShell height={600} sidebar={<div className="p-3"><Ph t="Sidebar 220" h={576} /></div>}><X.TopBar title={title} right={<div className="w-[120px]"><Ph t="GlassGroup" h={44} /></div>} />{children}</X.WebShell>
);
export const Default: S = { render: () => <Shell><X.SidebarDetail side={<Ph t="Profile header 360" h={320} />}><Ph t="Tabs + content" h={700} /></X.SidebarDetail></Shell> };
