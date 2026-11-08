import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Molecules/WeekdayPicker' } satisfies Meta;

export const Default: S = { render: function R() { const [v, setV] = useState(['월', '화', '목']); return <div className="w-[345px]"><X.WeekdayPicker value={v} onChange={setV} /></div>; } };
