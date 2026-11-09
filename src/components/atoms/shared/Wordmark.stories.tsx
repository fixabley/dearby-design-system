import type { Meta, StoryObj } from '@storybook/react-vite';
import * as X from '@/index';

const meta: Meta = {
  title: 'Atoms/Shared/Wordmark',
  id: 'atoms-wordmark',
  component: X.Wordmark,
};
export default meta;

/** dearby 글자 로고(글자 계층 밖의 브랜드 표시) */
export const Playground: StoryObj<typeof meta> = {};
