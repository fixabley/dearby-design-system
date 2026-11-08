import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Organisms/ServerPicker' } satisfies Meta;

export const Default: S = { render: function R() { const [v, setV] = useState(D.SERVERS[0].name); return <div className="w-[420px]"><X.ServerPicker servers={D.SERVERS} value={v} onChange={setV} /></div>; } };
