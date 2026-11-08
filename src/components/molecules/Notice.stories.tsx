import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Molecules/Notice' } satisfies Meta;

export const Default: S = { render: () => <div className="w-[393px]"><X.Notice title="목요일 모임은 21:00에 시작해요" body="11월 19일 (목)만 **한 시간 늦게** 시작해요. 회의 링크는 같아요." byline="김도윤 · 11월 18일 (수) 14:20" /></div> };
