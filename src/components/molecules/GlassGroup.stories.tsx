import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Molecules/GlassGroup' } satisfies Meta;

export const Default: S = { render: () => <div className="flex flex-col items-start gap-3"><X.GlassGroup unread={2} /><X.GlassGroup unread={2} actions={[{ icon: 'share', label: '공유' }]} /><X.GlassGroup actions={[{ icon: 'share', label: '공유' }, { icon: 'add', label: '만들기' }]} /></div> };
