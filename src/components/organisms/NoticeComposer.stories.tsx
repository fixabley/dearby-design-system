import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Organisms/NoticeComposer' } satisfies Meta;

export const Default: S = { render: function R() { const [t, setT] = useState('목요일 모임은 21:00에 시작해요'); const [b, setB] = useState('11월 19일 (목)만 **한 시간 늦게** 시작해요. 회의 링크는 `meet.google.com/abc`'); return <div className="grid w-[960px] grid-cols-2 gap-12"><X.NoticeForm title={t} body={b} onTitle={setT} onBody={setB} discord /><X.NoticePreview title={t} body={b} /></div>; } };
