import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'UI (shadcn)/RadioGroup' } satisfies Meta;

export const Default: S = { render: function R() { const [v, setV] = useState('a'); return <X.RadioGroup value={v} onValueChange={setV} className="flex gap-3"><X.RadioGroupItem value="a" aria-label="가" /><X.RadioGroupItem value="b" aria-label="나" /><X.RadioGroupItem value="c" aria-label="다" /></X.RadioGroup>; } };
