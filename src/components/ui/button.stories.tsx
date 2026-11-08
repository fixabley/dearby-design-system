import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'UI (shadcn)/Button', component: X.Button } satisfies Meta;

export const Playground: StoryObj<typeof X.Button> = { args: { children: '신청하러 가기', variant: 'default', size: 'lg' },
  argTypes: { variant: { control: 'select', options: ['default', 'mint', 'outline', 'ghost', 'destructive', 'glass'] }, size: { control: 'inline-radio', options: ['lg', 'default', 'sm', 'icon'] } } };
export const Sizes: S = { render: () => <div className="flex flex-col items-start gap-3">{(['default', 'mint', 'outline', 'ghost', 'destructive'] as const).map((v) => (
  <div key={v} className="flex items-center gap-3">{(['lg', 'default', 'sm'] as const).map((s) => <X.Button key={s} variant={v} size={s}>{v === 'destructive' ? '블록 지우기' : '후기 모두 보기'}</X.Button>)}
    <X.Button variant={v}><X.Icon name="calendarAdd" />캘린더 구독</X.Button></div>))}
  <div className="flex gap-2"><X.Button variant="glass" size="icon" aria-label="뒤로"><X.Icon name="back" /></X.Button><X.Button variant="glass" size="icon" aria-label="공유"><X.Icon name="share" /></X.Button></div>
  <div className="w-[345px]"><X.Button size="lg" block>승인 요청 보내기</X.Button></div></div> };
