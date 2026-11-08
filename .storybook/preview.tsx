import { useEffect } from 'react';
import type { Preview } from '@storybook/react-vite';
import '../src/globals.css';

const preview: Preview = {
  globalTypes: {
    theme: { description: 'Color scheme', toolbar: { title: 'Theme', icon: 'mirror', items: [{ value: 'light', title: 'Light' }, { value: 'dark', title: 'Dark' }], dynamicTitle: true } },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, ctx) => {
      const dark = ctx.globals.theme === 'dark';
      // 포털(모달·메뉴·시트)까지 테마가 이어지도록 문서 루트에 붙인다
      useEffect(() => { document.documentElement.classList.toggle('dk', dark); }, [dark]);
      const w = ctx.parameters.width as number | undefined;
      return <div className={ctx.parameters.layout === 'fullscreen' ? '' : 'p-6'}><div style={w ? { width: w } : undefined}><Story /></div></div>;
    },
  ],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    backgrounds: { disable: true },
    options: { storySort: { order: ['Introduction', 'Foundations', 'Atoms', 'Molecules', 'Organisms', 'Templates'] } },
  },
};
export default preview;
