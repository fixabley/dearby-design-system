import path from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs'],
  // 글꼴은 styles.css가 번들로 부르니 예시 이미지와, 글꼴과 함께 내야 하는 라이선스 원문만 그대로 낸다
  staticDirs: [{ from: '../static/img', to: '/img' }, { from: '../static/fonts/pretendard/LICENSE.txt', to: '/licenses/Pretendard-LICENSE.txt' }],
  core: { disableTelemetry: true },
  viteFinal: async (c) => {
    c.plugins = [...(c.plugins ?? []), tailwindcss()];
    c.resolve = { ...c.resolve, alias: { ...(c.resolve?.alias ?? {}), '@': path.resolve(import.meta.dirname, '../src') } };
    return c;
  },
};
export default config;
