import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'UI (shadcn)/Sheet' } satisfies Meta;

export const Bottom: S = { render: () => <X.Sheet><X.SheetTrigger asChild><X.Button variant="mint">시트 열기</X.Button></X.SheetTrigger><X.SheetContent><X.SheetHeader title="후기 남기기" /><p className="py-4 text-body text-muted-foreground">내용</p></X.SheetContent></X.Sheet> };
export const Floating: S = { render: () => <X.Sheet><X.SheetTrigger asChild><X.Button variant="mint">떠 있는 시트 열기(넓은 화면)</X.Button></X.SheetTrigger><X.SheetContent floating><X.SheetHeader title="필터" /><p className="py-4 text-body text-muted-foreground">내용</p></X.SheetContent></X.Sheet> };
