import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Molecules/QueueCard' } satisfies Meta;

export const Default: S = { render: () => <div className="w-[393px]"><X.QueueCard covers={['img/cover-22.jpg', 'img/cover-13.jpg', 'img/cover-42.jpg']} sub="프로그램 7개 중 3개 봤어요" /></div> };
