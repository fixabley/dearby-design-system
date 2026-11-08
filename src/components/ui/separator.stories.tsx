import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'UI (shadcn)/Separator' } satisfies Meta;

export const Default: S = { render: () => <div className="w-[345px]"><p>위</p><X.Separator className="my-3" /><p>아래</p></div> };
