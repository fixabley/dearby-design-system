import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Molecules/HostLine' } satisfies Meta;

export const Default: S = { render: () => <div className="flex w-[300px] flex-col gap-2"><X.HostLine logo="img/logo-13.png" text="삼성 · SSAFY" /><X.HostLine initial="현" text="현대자동차그룹" count={1} /><X.HostLine logo="img/logo-pytorch.png" text="파이토치 한국 사용자 모임 · 파이토치 코리아 컨퍼런스" /></div> };
