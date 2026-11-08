import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Organisms/WeeklyTimetable' } satisfies Meta;

export const Default: S = { render: function R() { const [s, setS] = useState(14); return <div className="w-[560px]"><X.WeeklyTimetable blocks={D.BLOCKS} selected={s} onSelect={setS} hourHeight={52} /></div>; } };
