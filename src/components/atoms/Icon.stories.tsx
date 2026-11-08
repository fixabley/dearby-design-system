import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Atoms/Icon' } satisfies Meta;

export const Default: StoryObj<{ name: X.IconName; size: X.IconSize }> = { args: { name: 'calendar', size: 24 }, argTypes: { name: { control: 'select', options: Object.keys(X.ICONS) }, size: { control: 'inline-radio', options: X.ICON_SIZES } }, render: (a) => <X.Icon {...a} /> };
