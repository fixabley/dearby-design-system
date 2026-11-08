import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Molecules/ReviewSummary' } satisfies Meta;

export const Variants: S = { render: () => <div className="flex flex-col gap-2"><X.ReviewSummary ratio={75} count={16} /><X.ReviewSummary ratio={60} count={5} /><X.ReviewSummary ratio={100} count={2} /></div> };
