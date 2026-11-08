import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'UI (shadcn)/Avatar' } satisfies Meta;

export const Sizes: S = { render: () => <div className="flex items-end gap-3"><X.Avatar size="mark" fallback="현" /><X.Avatar size="dot" fallback="김" /><X.Avatar size="sm" fallback="김" /><X.Avatar size="md" fallback="김" /><X.Avatar size="lg" fallback="김" /><X.Avatar size="sm" src="img/logo-13.png" fallback="S" /></div> };
