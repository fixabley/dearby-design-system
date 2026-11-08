import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'UI (shadcn)/Switch' } satisfies Meta;

export const Default: S = { render: function R() { const [v, setV] = useState(true); return <div className="flex gap-3"><X.Switch checked={v} onCheckedChange={setV} aria-label="알림" /><X.Switch checked={!v} onCheckedChange={(x) => setV(!x)} aria-label="저장" /><X.Switch disabled aria-label="꺼짐" /></div>; } };
