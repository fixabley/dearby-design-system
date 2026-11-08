import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Molecules/Timeline' } satisfies Meta;

export const Default: S = { render: () => <div className="w-[345px]"><X.Timeline groups={D.SSAFY.schedule} /></div> };
