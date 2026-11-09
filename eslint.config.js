import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// 모양 규칙은 따옴표만 둔다. 나머지 모양은 .editorconfig를 따른다
export default defineConfig([
  globalIgnores(['dist', 'storybook-static']),
  js.configs.recommended,
  tseslint.configs.recommended,
  storybook.configs['flat/recommended'],
  // Storybook 설정이 스토리 파일의 rules-of-hooks를 끄므로 뒤에 두어 스토리에서도 켠다. 웹(eslint-config-next)과 같은 recommended
  reactHooks.configs.flat.recommended,
  // 노드에서 도는 스크립트
  { files: ['scripts/**'], languageOptions: { globals: globals.node } },
  // 따옴표는 웹과 같다: 문자열은 작은따옴표(이스케이프를 피할 때만 큰따옴표), JSX 속성은 큰따옴표
  {
    plugins: { '@stylistic': stylistic },
    rules: {
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
    },
  },
]);
