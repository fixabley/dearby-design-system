import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Organisms/ActivityRow' } satisfies Meta;

export const List: S = { render: function R() { const [s, setS] = useState('1287'); return <div className="w-[480px]"><X.RowList>{D.ACTIVITIES.map((a) => <X.ActivityRow key={a.id} a={a} selected={s === a.id} onSelect={(x) => setS(x.id)} />)}</X.RowList></div>; } };
