import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Organisms/EvaluationForm' } satisfies Meta;

export const Default: S = { render: () => <div className="w-[480px]"><X.EvaluationForm repo="doyun/ondevice-study #7" submitted="11월 28일 (토) 22:10 제출" feedback="모델 불러오기를 따로 뺀 구조가 깔끔해요." /></div> };
