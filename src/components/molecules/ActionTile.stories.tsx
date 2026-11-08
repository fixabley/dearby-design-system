import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Molecules/ActionTile' } satisfies Meta;

export const Default: S = { render: function R() { const [a, setA] = useState(false); return <div className="w-[345px]"><X.ActionTiles added={a} onAdd={() => setA(!a)} /></div>; } };
