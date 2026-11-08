import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Atoms/StatusGlyph' } satisfies Meta;

export const All: S = { render: () => <div className="flex flex-col items-start gap-2">{(Object.keys(X.STATUS) as X.StatusKind[]).map((k) => <X.StatusGlyph key={k} status={k} />)}</div> };
