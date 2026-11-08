import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'UI (shadcn)/Input' } satisfies Meta;

export const InGroup: S = { render: () => <div className="w-[345px]"><X.ListGroup><X.Field label="제목" value="목요일 모임은 21:00에 시작해요" /><X.Field label="얻어 가는 것" /><X.Field label="내용" multiline value="11월 19일 (목)만 **한 시간 늦게** 시작해요." /></X.ListGroup></div> };
