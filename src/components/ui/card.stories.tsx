import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'UI (shadcn)/Card' } satisfies Meta;

export const Default: S = { render: () => <X.Card className="w-[345px]"><X.CardTitle>소개</X.CardTitle><p className="text-body leading-relaxed">서류 통과한 17기끼리 모의 면접을 돌려요.</p></X.Card> };
