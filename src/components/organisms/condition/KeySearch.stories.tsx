import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { CONDITION_KEYS } from '@/stories/conditions';

const meta: Meta<typeof X.KeySearch> = {
  title: 'Organisms/Condition/KeySearch',
  id: 'organisms-keysearch',
  component: X.KeySearch,
  args: {
    keys: CONDITION_KEYS,
    query: '',
    onQueryChange: fn(),
    onSelect: fn(),
    onPropose: fn(),
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

function Demo(args: React.ComponentProps<typeof X.KeySearch>) {
  const [query, setQuery] = useState(args.query);
  return <X.KeySearch {...args} query={query} onQueryChange={setQuery} />;
}

/** ㉙-l: 검색 입력 아래 공용 키 목록(오른쪽은 값 종류), 맨 아래 별도 묶음에 `새 자격 제안`. 입력하면 이름으로 거른다 */
export const Playground: Story = { render: (args) => <Demo {...args} /> };

/** 검색어에 맞는 키가 없으면 `새 자격 제안`만 남는다 */
export const NoResult: Story = {
  args: { query: '해커톤' },
  render: (args) => <Demo {...args} />,
};

/** 컴파운드로 바꿔 조립: 입력과 목록만 */
export const Composed: Story = {
  render: (args) => (
    <X.KeySearch keys={args.keys} query="">
      <X.KeySearch.Input />
      <X.CommandList>
        <X.KeySearch.Results />
      </X.CommandList>
    </X.KeySearch>
  ),
};

/** 바텀 시트 안(㉙-l) */
export const InSheet: Story = {
  parameters: { layout: 'fullscreen', width: undefined },
  render: (args) => (
    <X.Sheet open modal={false}>
      <X.SheetContent className="min-h-[70dvh]">
        <X.SheetHeader title="자격 추가" />
        <Demo {...args} className="overflow-y-auto pb-1" />
      </X.SheetContent>
    </X.Sheet>
  ),
};
