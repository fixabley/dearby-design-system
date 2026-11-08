import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Organisms/BlockEditor' } satisfies Meta;

export const Default: S = { render: () => <div className="w-[300px]"><X.BlockEditor name="특강" kind="class" days={['수']} from="15:00" to="17:00" leaders={[{ initial: '한', name: '한유진', role: '멘토 · @yujin' }]} desc="오전 강의 내용으로 화면 하나를 직접 만들어요." /></div> };
