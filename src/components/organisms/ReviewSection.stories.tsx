import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Organisms/ReviewSection' } satisfies Meta;

export const Default: S = { render: () => <div className="w-[560px]"><X.ReviewSection r={D.MOGAKCO.reviews!} /></div> };
