import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { AGE, CONDITION_KEYS, STATUS_GROUP, SWIFT } from '@/stories/conditions';

const NODES: X.ConditionNode[] = [AGE, STATUS_GROUP, SWIFT];

const meta: Meta<typeof X.ConditionList> = {
  title: 'Organisms/Condition/ConditionList',
  id: 'organisms-conditionlist',
  component: X.ConditionList,
  args: {
    value: NODES,
    title: '자격',
    onEdit: fn(),
    onAdd: fn(),
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** ㉙-c2: 자격 구역. 조건 행들과 끝의 `자격 추가` */
export const Playground: Story = {};

/** 조건이 없으면 `자격 추가` 행만 */
export const Empty: Story = { args: { value: [] } };

/** ㉙-l4: 아이콘 없는 모양(묶음 안) */
export const NoIcons: Story = { args: { icons: false, title: undefined } };

/** 컴파운드로 바꿔 조립: 행들만 */
export const RowsOnly: Story = {
  render: (args) => (
    <X.ConditionList {...args}>
      <X.ConditionList.Rows />
    </X.ConditionList>
  ),
};

type Page = 'main' | 'search' | 'value' | 'group';

/** 안쪽 묶음을 바꾸고 맨 위 목록에 돌려놓는다(깊이 1~2만 편집한다) */
function Flow() {
  const [page, setPage] = useState<Page>('main');
  const [nodes, setNodes] = useState<X.ConditionNode[]>(NODES);
  const [query, setQuery] = useState('');
  const [picked, setPicked] = useState<X.ConditionKey | null>(null);
  const [value, setValue] = useState<X.ConditionValue | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  // 묶음에서 키를 골라 안에 더할 때만 있다
  const [groupIndex, setGroupIndex] = useState<number | null>(null);

  const startValue = (key: X.ConditionKey, v?: X.ConditionValue) => {
    setQuery('');
    setPicked(key);
    setValue(v ?? X.emptyConditionValue(key));
    setPage('value');
  };
  const close = () => {
    setQuery('');
    setPage(groupIndex != null && page === 'search' ? 'group' : 'main');
  };
  const group =
    groupIndex != null ? (nodes[groupIndex] as X.ConditionGroup) : null;
  const commit = () => {
    if (!picked || !value) return;
    const node: X.Condition = { key: picked, value };
    if (groupIndex != null && group) {
      const items =
        editing != null
          ? group.items.map((n, i) => (i === editing ? node : n))
          : [...group.items, node];
      setNodes(
        nodes.map((n, i) => (i === groupIndex ? { ...group, items } : n)),
      );
      setPage('group');
    } else {
      setNodes(
        editing != null
          ? nodes.map((n, i) => (i === editing ? node : n))
          : [...nodes, node],
      );
      setPage('main');
    }
    setEditing(null);
    setQuery('');
  };
  // 고치던 조건을 지운다(고치기 시트의 휴지통)
  const remove = () => {
    if (editing == null) return;
    if (groupIndex != null && group) {
      const items = group.items.filter((_, i) => i !== editing);
      setNodes(
        nodes.map((n, i) => (i === groupIndex ? { ...group, items } : n)),
      );
      setPage('group');
    } else {
      setNodes(nodes.filter((_, i) => i !== editing));
      setPage('main');
    }
    setEditing(null);
  };
  const edit = (node: X.ConditionNode, i: number) => {
    if (page === 'main') {
      if (X.isGroup(node)) {
        setGroupIndex(i);
        setPage('group');
      } else {
        setEditing(i);
        startValue(node.key, node.value);
      }
    } else if (!X.isGroup(node)) {
      setEditing(i);
      startValue(node.key, node.value);
    }
  };
  return (
    <X.Sheet
      open
      modal={false}
      onOpenChange={(open) => {
        if (open) return;
        // 닫기: 값 시트는 그 키를 고르기 전 목록(묶음 안이면 묶음)으로, 키 검색과 묶음은 한 단계 위로, 맨 위에서는 아무 일 없음
        if (page === 'value') {
          setEditing(null);
          setPage(groupIndex != null ? 'group' : 'main');
        } else if (page === 'search') {
          close();
        } else if (page === 'group') {
          setGroupIndex(null);
          setPage('main');
        }
      }}
    >
      <X.SheetContent className="min-h-[60dvh]">
        {page === 'main' && (
          <>
            <X.SheetHeader title="참여 조건" />
            <div className="overflow-y-auto pb-1">
              <X.ConditionList
                title="자격"
                value={nodes}
                onEdit={edit}
                onAdd={() => setPage('search')}
              />
              <X.Text
                as="p"
                variant="caption"
                tone="muted"
                className="mx-1 mt-2"
              >
                고른 조건을 모두 충족해야 참여할 수 있어요
              </X.Text>
            </div>
          </>
        )}
        {page === 'search' && (
          <>
            <X.SheetHeader title="자격 추가" />
            <X.KeySearch
              className="overflow-y-auto pb-1"
              keys={CONDITION_KEYS}
              query={query}
              onQueryChange={setQuery}
              onSelect={(k) => startValue(k)}
              onPropose={() =>
                alert('새 자격 제안 화면으로 갑니다(㉙-l5, 이 부품 범위 밖)')
              }
            />
          </>
        )}
        {page === 'value' && picked && value && (
          <>
            <X.SheetHeader title={picked.label} />
            <X.ConditionValueInput
              keyDef={picked}
              value={value}
              onChange={setValue}
              className="mt-3.5"
            />
            <div className="mt-4 flex gap-2.5">
              {editing != null && (
                <X.Button
                  variant="outline"
                  size="icon-lg"
                  icon="trash"
                  aria-label={`${picked.label} 지우기`}
                  onClick={remove}
                />
              )}
              <X.Button
                size="lg"
                className="flex-1"
                disabled={!X.isConditionValueComplete(value)}
                onClick={commit}
              >
                {editing != null ? '완료' : '추가'}
              </X.Button>
            </div>
          </>
        )}
        {page === 'group' && group && groupIndex != null && (
          <>
            <X.SheetHeader title="자격 묶음" />
            <X.ConditionGroupEditor
              className="overflow-y-auto pb-1"
              value={group}
              onChange={(g) =>
                setNodes(nodes.map((n, i) => (i === groupIndex ? g : n)))
              }
              onEdit={edit}
              onAdd={() => setPage('search')}
            />
          </>
        )}
      </X.SheetContent>
    </X.Sheet>
  );
}

/** 참여 조건 시트 전체 흐름(㉙-c2 → l → l2 · l3, 묶음 ㉙-l4): 자격 추가에서 키를 찾아 값을 넣고 추가하면 목록에 더해진다. 묶음 행을 누르면 묶음 편집으로 간다. 닫기는 한 단계 위로(값 시트에서는 키 검색을 건너뛰고 연 목록으로) */
export const InSheet: Story = {
  parameters: { layout: 'fullscreen', width: undefined },
  render: () => <Flow />,
};
