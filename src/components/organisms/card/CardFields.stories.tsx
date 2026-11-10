import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import * as X from '@/index';

const FIXED: X.CardFixedFields = {
  name: '김도윤',
  handle: 'doyun',
  job: 'iOS 개발자',
  bio: 'iOS와 온디바이스 AI를 만들어요',
};

/** 시안 ㉗-j의 항목 묶음(꺼짐 상태). 켜짐은 `on`으로 정한다 */
const GROUPS = (on: (key: string) => boolean): X.CardFieldGroup[] => {
  const item = (
    key: string,
    label: string,
    icon?: X.CardFieldItem['icon'],
  ): X.CardFieldItem => ({ key, label, icon, checked: on(key) });
  return [
    { title: '프로필', items: [item('joined', '가입 시기')] },
    {
      title: '연락처·링크',
      items: [
        item('mail', 'doyun@example.com', 'mail'),
        item('phone', '010-1234-5678', 'phone'),
        item('github', 'GitHub', 'github'),
        item('instagram', '인스타그램', 'instagram'),
      ],
    },
    {
      title: '이력',
      items: [
        item('career1', '디프만 19기 · iOS 개발자', 'group'),
        item('career2', 'UMC 8기 · iOS', 'group'),
      ],
    },
    {
      title: '활동',
      items: [
        item('joining', '참여 중인 활동', 'joined'),
        item('past', '지난 활동', 'checkmark'),
        item('follows', '팔로우 목록', 'heart'),
      ],
    },
    { title: '프로젝트', items: [item('moa', '모아 가계부', 'books')] },
  ];
};

const meta: Meta = {
  title: 'Organisms/Card/CardFields',
  id: 'organisms-cardfields',
  component: X.CardFields,
  parameters: { width: 393 },
};
export default meta;
type Story = StoryObj<typeof meta>;

function Demo({ on }: { on: (key: string) => boolean }) {
  const [groups, setGroups] = useState(() => GROUPS(on));
  return (
    <X.CardFields
      fixed={FIXED}
      groups={groups}
      onCheckedChange={(key, checked) =>
        setGroups(
          groups.map((g) => ({
            ...g,
            items: g.items.map((it) =>
              it.key === key ? { ...it, checked } : it,
            ),
          })),
        )
      }
    />
  );
}

/** 새 명함(㉗-j4): 늘 보이는 네 항목 말고는 모두 꺼진 채 시작. 자물쇠를 눌러 켜 본다 */
export const NewCard: Story = { render: () => <Demo on={() => false} /> };

/** 기본 명함 전체(㉗-j): 모두 켜짐 */
export const AllOn: Story = { render: () => <Demo on={() => true} /> };

/** 기본 명함 SNS(㉗-j3): 소셜 링크 둘만 켜짐 */
export const SnsOnly: Story = {
  render: () => <Demo on={(k) => k === 'github' || k === 'instagram'} />,
};

/** 비활성 항목과 긴 값 */
export const Disabled: Story = {
  render: () => (
    <X.CardFields
      fixed={{
        ...FIXED,
        bio: '웹 접근성과 디자인 시스템, 그리고 온디바이스 AI에 관심이 많은 개발자입니다',
      }}
      groups={[
        {
          title: '연락처·링크',
          items: [
            {
              key: 'mail',
              label: 'doyun@example.com',
              icon: 'mail',
              checked: true,
              disabled: true,
            },
          ],
        },
      ]}
      onCheckedChange={fn()}
    />
  ),
};

/** 컴파운드로 바꿔 조립: 항상 보임 없이 첫 묶음 하나만 */
export const Composed: Story = {
  render: () => (
    <X.CardFields fixed={FIXED} groups={GROUPS(() => true)}>
      <X.CardFields.Group index={1} />
    </X.CardFields>
  ),
};
