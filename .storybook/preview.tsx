import { useEffect } from 'react';
import type { Preview } from '@storybook/react-vite';
import '../src/globals.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color scheme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, ctx) => {
      const dark = ctx.globals.theme === 'dark';
      // 포털(모달·메뉴·시트)까지 테마가 이어지도록 문서 루트에 붙인다
      useEffect(() => {
        document.documentElement.classList.toggle('dk', dark);
      }, [dark]);
      const w = ctx.parameters.width as number | undefined;
      return (
        <div className={ctx.parameters.layout === 'fullscreen' ? '' : 'p-6'}>
          <div style={w ? { width: w } : undefined}>
            <Story />
          </div>
        </div>
      );
    },
  ],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    backgrounds: { disable: true },
    // Foundations는 재료 순서, 층마다 shadcn 원본 → 도메인 없는 Shared → 나머지 도메인
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          [
            'Colors',
            'Typography',
            'Radius & Shadow',
            'Motion',
            'Icon',
            'Lite Markdown',
          ],
          'Atoms',
          ['shadcn', 'Shared', '*'],
          'Molecules',
          ['shadcn', 'Shared', '*'],
          'Organisms',
          ['Shared', '*'],
          'Templates',
        ],
      },
    },
  },
};
export default preview;
