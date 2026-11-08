import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'UI (shadcn)/Dialog' } satisfies Meta;

export const Default: S = { render: () => <X.Dialog><X.DialogTrigger asChild><X.Button variant="mint">모달 열기</X.Button></X.DialogTrigger><X.DialogContent className="h-[480px] max-w-[720px]"><X.DialogHeader><X.DialogTitle>파이토치 데이 코리아 2026 · 오후 세션</X.DialogTitle><X.DialogDescription>11월 21일 (토) 13:30 ~ 17:30 · 코엑스 그랜드볼룸</X.DialogDescription></X.DialogHeader><div className="px-6 text-body text-muted-foreground">내용</div></X.DialogContent></X.Dialog> };
