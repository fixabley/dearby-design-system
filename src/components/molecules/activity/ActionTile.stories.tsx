import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';
import { content, event, iconArgType, look, state } from '@/stories/argTypes';

const meta: Meta = {
  title: 'Molecules/Activity/ActionTile',
  id: 'molecules-actiontile',
  component: X.ActionTile,
  args: { icon: 'addCircle', label: '내 활동에 추가', primary: true, pressed: false, onClick: fn() },
  argTypes: { label: content('글자'), icon: iconArgType(false, '위에 놓일 아이콘'), primary: look('민트 면'), pressed: state('켜짐(넣으면 Toggle로 동작)'), onClick: event() },
  
  parameters: { width: 170 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};
export const Pair: Story = { render: function R() { const [a, setA] = useArgs(); return <div className="w-[345px]"><X.ActionTiles added={!!a.pressed} onAdd={() => setA({ pressed: !a.pressed })} /></div>; } };

/** 컴파운드로 바꿔 조립: 캘린더 대신 공유 타일 */
export const Composed: Story = { render: function R() { const [a, setA] = useArgs(); return <div className="w-[345px]"><X.ActionTiles added={!!a.pressed} onAdd={() => setA({ pressed: !a.pressed })}><X.ActionTiles.Add /><X.ActionTile icon="share" label="공유" /></X.ActionTiles></div>; } };
