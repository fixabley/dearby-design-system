import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Templates/ThreeColumnEditor', parameters: { layout: 'fullscreen' } } satisfies Meta;

const Ph = ({ t, h = 120 }: { t: string; h?: number }) => <div className="grid place-items-center rounded-lg border-[1.5px] border-dashed border-border text-caption font-semibold text-muted-foreground" style={{ height: h }}>{t}</div>;
const Shell = ({ children, title = 'Title' }: { children: React.ReactNode; title?: string }) => (
  <X.WebShell height={600} sidebar={<div className="p-3"><Ph t="Sidebar 220" h={576} /></div>}><X.TopBar title={title} right={<div className="w-[120px]"><Ph t="GlassGroup" h={44} /></div>} />{children}</X.WebShell>
);
export const Default: S = { render: () => <Shell><X.ThreeColumnEditor left={<Ph t="Settings 280" h={460} />} center={<Ph t="Grid" h={460} />} right={<Ph t="Selected 300" h={460} />} /></Shell> };
