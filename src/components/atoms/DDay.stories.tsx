import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Atoms/DDay' } satisfies Meta;

export const Default: S = { render: () => <p className="flex gap-4 text-caption"><X.DDay>D-6</X.DDay><X.DDay past>8월 29일 (토)</X.DDay></p> };
