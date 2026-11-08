import path from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs'],
  staticDirs: ['../static'],
  core: { disableTelemetry: true },
  viteFinal: async (c) => {
    c.plugins = [...(c.plugins ?? []), tailwindcss()];
    c.resolve = { ...c.resolve, alias: { ...(c.resolve?.alias ?? {}), '@': path.resolve(import.meta.dirname, '../src') } };
    return c;
  },
};
export default config;
