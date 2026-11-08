import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Templates/PhoneFrame' } satisfies Meta;

const Ph = ({ t, h = 120 }: { t: string; h?: number }) => <div className="grid place-items-center rounded-lg border-[1.5px] border-dashed border-border text-caption font-semibold text-muted-foreground" style={{ height: h }}>{t}</div>;
const Shell = ({ children, title = 'Title' }: { children: React.ReactNode; title?: string }) => (
  <X.WebShell height={600} sidebar={<div className="p-3"><Ph t="Sidebar 220" h={576} /></div>}><X.TopBar title={title} right={<div className="w-[120px]"><Ph t="GlassGroup" h={44} /></div>} />{children}</X.WebShell>
);
export const Default: S = { render: () => <X.PhoneFrame title="홈" actions={<X.GlassGroup unread={2} />} tabBar={<X.TabBar active="home" />}><X.QueueCard covers={['img/cover-22.jpg', 'img/cover-13.jpg', 'img/cover-42.jpg']} sub="프로그램 7개 중 3개 봤어요" /><h2 className="mb-1 mt-4 text-section">내 활동</h2><X.RowList>{D.ACTIVITIES.map((a) => <X.ActivityRow key={a.id} a={a} />)}</X.RowList></X.PhoneFrame> };
