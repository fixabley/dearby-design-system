import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Molecules/ProgressTrack' } satisfies Meta;

export const Default: S = { render: () => <div className="w-[280px]"><X.ProgressTrack steps={[{ name: '지원', state: 'past' }, { name: '면접', state: 'past' }, { name: 'OT', state: 'past' }, { name: '활동', state: 'cur' }]} more={1} /></div> };
