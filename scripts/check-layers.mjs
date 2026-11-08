// 디자인 시스템 층 규칙 검사.
// 1) 참조 방향: 위 층 참조 금지. 아톰·분자·템플릿은 같은 층도 금지, 유기체는 다른 유기체를 품을 수 있되 순환은 금지.
//    기반 층(foundations · ui(shadcn 키트) · lib · icons · types · data)은 어느 층에서든 참조할 수 있다.
// 2) 글자 스타일: 글자 크기·굵기·줄 높이·자간 클래스는 기반 층과 아톰에서만 쓴다. 분자 이상은 Text 아톰으로.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';

const ROOT = new URL('../src/components/', import.meta.url).pathname;
const RANK = { foundations: 0, ui: 0, atoms: 1, molecules: 2, organisms: 3, templates: 4 };
const NAME = { 0: '기반', 1: '아톰', 2: '분자', 3: '유기체', 4: '템플릿' };
const TYPO = /(?<![\w-])(text-(?:title|section|headline|body-lg|body|caption|badge|micro)|text-\[\d+(?:\.\d+)?(?:px|rem)\]|font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)|leading-[\w.[\]-]+|tracking-[\w.[\]-]+)(?![\w-])/g;

const files = Object.keys(RANK).flatMap((d) => (existsSync(join(ROOT, d)) ? readdirSync(join(ROOT, d)) : [])
  .filter((f) => f.endsWith('.tsx') && !f.endsWith('.stories.tsx')).map((f) => join(ROOT, d, f)));
const layerOf = (p) => basename(dirname(p));
const short = (p) => p.slice(ROOT.length);
const errors = [];
const orgEdges = new Map();

for (const f of files) {
  const src = readFileSync(f, 'utf8');
  const me = RANK[layerOf(f)];
  for (const m of src.matchAll(/from '(?:@\/components\/([\w-]+)\/([\w-]+)|\.\/([\w-]+))'/g)) {
    const target = m[1] ? join(ROOT, m[1], `${m[2]}.tsx`) : join(dirname(f), `${m[3]}.tsx`);
    const t = RANK[layerOf(target)];
    if (t === undefined) continue;
    if (t > me) errors.push(`위 층 참조  ${short(f)} (${NAME[me]}) → ${short(target)} (${NAME[t]})`);
    else if (t === me && me !== 0 && me !== 3) errors.push(`같은 층 참조  ${short(f)} → ${short(target)} (${NAME[me]})`);
    else if (t === me && me === 3) orgEdges.set(f, [...(orgEdges.get(f) ?? []), target]);
  }
  if (me >= 2) {
    src.split('\n').forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
      const hits = [...line.matchAll(TYPO)].map((x) => x[1]);
      if (hits.length) errors.push(`글자 스타일  ${short(f)}:${i + 1}  ${[...new Set(hits)].join(' ')}`);
    });
  }
}

// 유기체 순환 찾기
const state = new Map();
const visit = (n, path) => {
  if (state.get(n) === 1) { errors.push(`순환 참조  ${[...path.slice(path.indexOf(n)), n].map(short).join(' → ')}`); return; }
  if (state.get(n) === 2) return;
  state.set(n, 1);
  for (const m of orgEdges.get(n) ?? []) visit(m, [...path, n]);
  state.set(n, 2);
};
for (const n of orgEdges.keys()) visit(n, []);

if (errors.length) {
  const groups = errors.reduce((a, e) => ((a[e.split('  ')[0]] ??= []).push(e), a), {});
  for (const [k, list] of Object.entries(groups)) console.log(`\n[${k}] ${list.length}\n` + list.map((e) => '  ' + e.split('  ').slice(1).join('  ')).join('\n'));
  console.log(`\n위반 ${errors.length}건`);
  process.exit(1);
}
console.log(`층 규칙 통과: 컴포넌트 ${files.length}개`);
