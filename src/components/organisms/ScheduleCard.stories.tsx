import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Organisms/ScheduleCard' } satisfies Meta;

export const Default: S = { render: () => <div className="w-[480px]"><X.ScheduleCard groups={D.SSAFY.schedule} note={D.SSAFY.note} /></div> };
