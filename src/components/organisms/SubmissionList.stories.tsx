import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Organisms/SubmissionList' } satisfies Meta;

export const Default: S = { render: function R() { const [s, setS] = useState(0); return <div className="w-[420px]"><X.SubmissionList items={D.SUBMISSIONS} selected={s} onSelect={setS} /></div>; } };
