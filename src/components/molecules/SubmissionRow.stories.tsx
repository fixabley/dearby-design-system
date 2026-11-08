import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Molecules/SubmissionRow' } satisfies Meta;

export const States: S = { render: () => <div className="w-[393px]"><X.ListGroup>{D.SUBMISSIONS.map((s, i) => <X.SubmissionRow key={s.name} s={s} selected={i === 0} />)}</X.ListGroup></div> };
