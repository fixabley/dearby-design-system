import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import reactHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// ESLint는 코드 문제만 본다. 모양은 Prettier(.prettierrc)가 맡는다
export default defineConfig([
  globalIgnores(['dist', 'storybook-static']),
  js.configs.recommended,
  tseslint.configs.recommended,
  storybook.configs['flat/recommended'],
  // Storybook 설정이 스토리 파일의 rules-of-hooks를 끄므로 뒤에 두어 스토리에서도 켠다. 웹(eslint-config-next)과 같은 recommended
  reactHooks.configs.flat.recommended,
  // 노드에서 도는 스크립트
  { files: ['scripts/**'], languageOptions: { globals: globals.node } },
  // Prettier와 겹치는 모양 규칙을 끈다. 앞 설정을 덮어야 하니 맨 뒤에 둔다
  prettier,
]);
