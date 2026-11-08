import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Molecules/ReviewCard' } satisfies Meta;

export const Default: S = { render: () => <div className="w-[393px] divide-y divide-border">{D.MOGAKCO.reviews!.items.map((r) => <X.ReviewCard key={r.name} {...r} />)}</div> };
