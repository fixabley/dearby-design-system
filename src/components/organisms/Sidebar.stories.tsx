import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Organisms/Sidebar' } satisfies Meta;

export const Default: S = { render: function R() { const [a, setA] = useState('home'); return <X.Sidebar active={a} onNavigate={setA} hosted={['온디바이스 AI 앱 만들기']} />; } };
