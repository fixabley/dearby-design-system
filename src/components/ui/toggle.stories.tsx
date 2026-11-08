import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'UI (shadcn)/Toggle' } satisfies Meta;

export const Chip: S = { render: () => <div className="flex flex-wrap gap-2"><X.Toggle defaultPressed>지원 가능<small className="text-caption font-normal text-muted-foreground">7</small></X.Toggle><X.Toggle>진행·예정<small className="text-caption font-normal text-muted-foreground">12</small></X.Toggle><X.Toggle disabled>해커톤<small className="text-caption font-normal text-muted-foreground">0</small></X.Toggle></div> };
