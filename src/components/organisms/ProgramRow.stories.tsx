import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Organisms/ProgramRow' } satisfies Meta;

export const List: S = { render: function R() { const [s, setS] = useState('77'); return <div className="w-[480px]"><X.RowList>{D.PROGRAMS.map((p) => <X.ProgramRow key={p.id} p={p} selected={s === p.id} onSelect={(x) => setS(x.id)} />)}</X.RowList></div>; } };
