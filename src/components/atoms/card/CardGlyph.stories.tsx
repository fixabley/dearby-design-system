import type { Meta, StoryObj } from '@storybook/react-vite';
import * as X from '@/index';

const meta: Meta = {
  title: 'Atoms/Card/CardGlyph',
  id: 'atoms-cardglyph',
  component: X.CardGlyph,
};
export default meta;
type Story = StoryObj<typeof meta>;

/** 명함 글리프 34 x 22. 목록 행의 앞과 명함 고르기 시트의 줄 앞에 쓴다. 꾸밈이라 화면 읽기에서는 숨는다 */
export const Playground: Story = {};
