import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'UI (shadcn)/ScrollArea' } satisfies Meta;

export const Default: S = { render: () => <X.ScrollArea className="h-[240px] w-[393px]"><X.RowList>{D.ACTIVITIES.map((a) => <X.ActivityRow key={a.id} a={a} />)}</X.RowList></X.ScrollArea> };
