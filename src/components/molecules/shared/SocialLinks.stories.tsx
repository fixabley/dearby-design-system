import type { Meta, StoryObj } from '@storybook/react-vite';
import * as X from '@/index';
import { content } from '@/stories/argTypes';

// ㉘-b 받은 명함 · ㉙-u0 프로필 머리의 소셜 줄: 말풍선 · GitHub · 바깥 링크(↗). 주소는 예시
const LINKS: X.SocialLink[] = [
  { icon: 'chat', href: 'https://example.com/chat', label: '채팅' },
  { icon: 'githubMark', href: 'https://github.com/seoyeon', label: 'GitHub' },
  { icon: 'link', href: 'https://example.com', label: '링크' },
];

const meta: Meta = {
  title: 'Molecules/Shared/SocialLinks',
  id: 'molecules-sociallinks',
  component: X.SocialLinks,
  args: { links: LINKS },
  argTypes: {
    links: content('링크(아이콘 · 주소 · 이름). 웹 주소는 새 탭으로 열고, 이름은 말풍선과 화면 읽기에 쓴다. 비우면 줄을 그리지 않는다'),
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: GitHub와 링크만 */
export const Composed: Story = {
  render: () => (
    <X.SocialLinks>
      <X.SocialLinks.Link {...LINKS[1]} />
      <X.SocialLinks.Link {...LINKS[2]} />
    </X.SocialLinks>
  ),
};
