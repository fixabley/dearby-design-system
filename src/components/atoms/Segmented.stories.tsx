import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Atoms/Segmented' } satisfies Meta;

export const Default: StoryObj<{ items: string }> = { args: { items: '활동,팔로우,프로젝트' }, render: function R({ items }) { const list = items.split(','); const [v, setV] = useState(list[0]); return <div className="w-[345px]"><X.Segmented items={list} value={list.includes(v) ? v : list[0]} onChange={setV} /></div>; } };
