import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Organisms/TopBar' } satisfies Meta;

export const Title: S = { render: () => <div className="w-[1060px]"><X.TopBar title="홈" right={<X.GlassGroup unread={2} />} /></div> };
export const Centered: S = { render: function R() { const [v, setV] = useState<'program' | 'event'>('program'); return <div className="w-[1060px]"><X.TopBar center={<div className="w-[220px]"><X.Segmented items={['program', 'event'] as const} labels={{ program: '프로그램', event: '이벤트' }} value={v} onChange={setV} /></div>} right={<X.GlassGroup unread={2} actions={[{ icon: 'add', label: '만들기' }]} />} /></div>; } };
