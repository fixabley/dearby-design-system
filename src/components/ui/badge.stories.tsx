import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'UI (shadcn)/Badge', component: X.Badge } satisfies Meta;

export const Playground: StoryObj<typeof X.Badge> = { args: { children: 'D-6', variant: 'default', size: 'default' }, argTypes: { variant: { control: 'select', options: ['default', 'mint', 'outline', 'muted', 'destructive'] }, size: { control: 'inline-radio', options: ['default', 'sm'] } } };
export const All: S = { render: () => <div className="flex flex-col gap-3"><div className="flex gap-2"><X.Badge>D-6</X.Badge><X.Badge variant="mint">추천 75%</X.Badge><X.Badge variant="outline">다시 해 보기</X.Badge><X.Badge variant="muted">모집 중</X.Badge><X.Badge variant="destructive">오류</X.Badge></div>
  <div className="flex gap-2"><X.Badge size="sm">D-6</X.Badge><X.Badge variant="mint" size="sm"><X.Icon name="check" />확인됨</X.Badge><X.Badge variant="outline" size="sm">발표자</X.Badge></div></div> };
