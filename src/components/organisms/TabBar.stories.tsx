import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Organisms/TabBar' } satisfies Meta;

export const Default: S = { render: function R() { const [a, setA] = useState<X.NavKey>('home'); return <div className="w-[361px]"><X.TabBar active={a} onNavigate={setA} /></div>; } };
