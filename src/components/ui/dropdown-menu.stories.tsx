import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'UI (shadcn)/DropdownMenu' } satisfies Meta;

export const Default: S = { render: function R() { const [v, setV] = useState('all'); return <X.DropdownMenu><X.DropdownMenuTrigger asChild><X.TrackPicker value={{ all: '전체 기수', '7': '7기', '6': '6기' }[v]} /></X.DropdownMenuTrigger>
  <X.DropdownMenuContent align="start"><X.DropdownMenuRadioGroup value={v} onValueChange={setV}><X.DropdownMenuRadioItem value="all" sub="후기 16개 · 추천 75%">전체 기수</X.DropdownMenuRadioItem><X.DropdownMenuSeparator />
  <X.DropdownMenuRadioItem value="7" sub="후기 9개 · 추천 78%">7기</X.DropdownMenuRadioItem><X.DropdownMenuRadioItem value="6" sub="후기 2개">6기</X.DropdownMenuRadioItem></X.DropdownMenuRadioGroup></X.DropdownMenuContent></X.DropdownMenu>; } };
