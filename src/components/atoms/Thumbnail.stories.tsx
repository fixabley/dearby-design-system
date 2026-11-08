import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Atoms/Thumbnail' } satisfies Meta;

export const Variants: S = { render: () => <div className="flex items-end gap-3"><X.Thumbnail thumb={{ cover: 'img/cover-13.jpg' }} size="lg" /><X.Thumbnail thumb={{ color: '#04122B', logo: 'img/logo-depromeet.png' }} /><X.Thumbnail thumb={{ color: '#0E5E66', letter: '모' }} size="sm" /><X.Thumbnail thumb={{ cover: 'img/cover-22.jpg' }} size="xl" /></div> };
