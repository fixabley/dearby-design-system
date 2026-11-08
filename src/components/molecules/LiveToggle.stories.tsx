import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Molecules/LiveToggle' } satisfies Meta;

export const Default: S = { render: function R() { const [v, setV] = useState(true); return <X.LiveToggle pressed={v} onPressedChange={setV} />; } };
