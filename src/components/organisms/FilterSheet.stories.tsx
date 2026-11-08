import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Organisms/FilterSheet' } satisfies Meta;

const G: X.FilterGroup[] = [{ title: '활동 상태', hint: '여러 개 고를 수 있어요', options: [{ label: '지원 가능', count: 7, on: true }, { label: '진행·예정', count: 12 }, { label: '지난 활동', count: 21 }] }, { title: '종류', options: [{ label: '부트캠프', count: 5, on: true }, { label: '동아리', count: 1 }, { label: '해커톤', count: 0, disabled: true }] }];
export const Default: S = { render: function R() { const [o, setO] = useState(false); return <X.Sheet open={o} onOpenChange={setO}><X.SheetTrigger asChild><X.Button variant="mint">필터</X.Button></X.SheetTrigger><X.SheetContent floating><X.FilterSheet groups={G} resultLabel="프로그램 3개 보기" onApply={() => setO(false)} /></X.SheetContent></X.Sheet>; } };
export const Opened: S = { render: () => <X.Sheet open><X.SheetContent floating><X.FilterSheet groups={G} resultLabel="프로그램 3개 보기" /></X.SheetContent></X.Sheet> };
