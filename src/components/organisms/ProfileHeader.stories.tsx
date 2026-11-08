import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Organisms/ProfileHeader' } satisfies Meta;

export const Default: S = { render: () => <div className="w-[360px]"><X.ProfileHeader p={D.SEOYEON} /></div> };
