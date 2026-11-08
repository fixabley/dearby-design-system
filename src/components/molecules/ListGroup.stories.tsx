import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import * as X from '@/index';
import * as D from '@/data';

type S = StoryObj;
export default { title: 'Molecules/ListGroup' } satisfies Meta;

export const Default: S = { render: () => <div className="w-[345px]"><X.ListGroup title="기간"><X.ListRow icon="calendar" title="시작" trailing="11월 30일 (월)" /><X.ListRow icon="repeat" title="반복" trailing="매주" /><X.ListRow title="참여자에게 알림 보내기" trailing={<X.Switch defaultChecked />} /><X.ListRow icon="add" title="사람 추가" add onClick={() => {}} /></X.ListGroup></div> };
