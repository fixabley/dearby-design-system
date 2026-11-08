import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Molecules/Field' } satisfies Meta;

export const Default: S = { render: () => <div className="w-[345px]"><X.ListGroup><X.Field label="이름" value="실습" /><X.Field label="얻어 가는 것" /></X.ListGroup></div> };
