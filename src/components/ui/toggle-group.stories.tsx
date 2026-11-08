import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'UI (shadcn)/ToggleGroup' } satisfies Meta;

export const Segmented: S = { render: function R() { const items = ['activity', 'follow', 'projects']; const [v, setV] = useState('activity'); return <div className="w-[345px]"><X.ToggleGroup type="single" value={v} onValueChange={(x) => x && setV(x)} count={3} index={items.indexOf(v)}>{items.map((i) => <X.ToggleGroupItem key={i} value={i}>{{ activity: '활동', follow: '팔로우', projects: '프로젝트' }[i]}</X.ToggleGroupItem>)}</X.ToggleGroup></div>; } };
