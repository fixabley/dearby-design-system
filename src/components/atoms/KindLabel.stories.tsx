import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Atoms/KindLabel' } satisfies Meta;

export const All: S = { render: () => <div className="flex flex-wrap gap-4">{(Object.keys(X.KINDS) as X.ActivityKind[]).map((k) => <X.KindLabel key={k} kind={k} />)}</div> };
