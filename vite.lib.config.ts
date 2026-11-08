import path from 'node:path';
import dts from 'unplugin-dts/vite';
import { defineConfig } from 'vite';
import pkg from './package.json' with { type: 'json' };

// 라이브러리 빌드(npm run build · prepare). Storybook은 이 파일을 읽지 않고 .storybook/main.ts로 따로 설정한다.
// 의존성은 받아 쓰는 쪽이 설치하니 묶지 않고, 파일 구조를 그대로 내보내 쓰지 않는 컴포넌트는 받아 쓰는 쪽 번들에서 빠지게 한다.
const deps = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies });

export default defineConfig({
  resolve: { alias: { '@': path.resolve(import.meta.dirname, 'src') } },
  plugins: [dts({ entryRoot: 'src', include: ['src'], exclude: ['src/**/*.stories.tsx', 'src/stories/**'] })],
  build: {
    lib: { entry: { index: 'src/index.ts', data: 'src/data.ts' }, formats: ['es'] },
    minify: false,
    rollupOptions: {
      external: (id) => deps.some((d) => id === d || id.startsWith(`${d}/`)),
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        // 컴포넌트는 훅·Radix를 쓰니 Next 서버 컴포넌트에서 부르면 클라이언트 경계가 되게 한다. lib·data·icons는 서버에서도 쓴다
        banner: (chunk) => (/\/src\/components\/.+\.tsx$/.test(chunk.facadeModuleId ?? '') ? "'use client';" : ''),
      },
    },
  },
});
