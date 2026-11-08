import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Molecules/MetaLine' } satisfies Meta;

export const Default: S = { render: () => <div className="flex w-[300px] flex-col gap-1.5"><X.MetaLine label="모집" value="11월 9일 (월) 17:00 마감" /><X.MetaLine label="마감" dday="D-6" /><X.MetaLine icon="place" label="장소" value="서울 관악구" /></div> };
