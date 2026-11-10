// 디자인 시스템 층 규칙 검사(규칙 B).
// 1) 참조 방향: 기반 0 < 아톰 1 < 분자 2 < 유기체 3 < 템플릿 4. 위 층은 참조하지 않는다.
//    같은 층에서는 shadcn 원본만 감싸 쓸 수 있다. 유기체는 다른 유기체를 품을 수 있되 순환은 금지.
//    shadcn 키트(components/ui) 파일의 층은 옆 스토리 제목(Atoms/… · Molecules/…)으로 정한다.
//    components 밖(lib · icons · types · data)은 층이 없는 재료라 검사하지 않는다.
// 2) 글자 스타일: 분자 이상(shadcn 원본 제외)은 글자 크기·굵기·줄 높이·자간 클래스를 쓰지 않고 Text 아톰으로.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';

const ROOT = new URL('../src/components/', import.meta.url).pathname;
const LAYERS = [
  'foundations',
  'ui',
  'atoms',
  'molecules',
  'organisms',
  'templates',
];
const RANK = {
  foundations: 0,
  atoms: 1,
  molecules: 2,
  organisms: 3,
  templates: 4,
};
const KIT_RANK = { Atoms: 1, Molecules: 2 };
const NAME = { 0: '기반', 1: '아톰', 2: '분자', 3: '유기체', 4: '템플릿' };
const TYPO =
  /(?<![\w-])(text-(?:display|title|section|headline|body-lg|body|caption|badge|micro)|text-\[\d+(?:\.\d+)?(?:px|rem)\]|font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)|leading-[\w.[\]-]+|tracking-[\w.[\]-]+)(?![\w-])/g;

const walk = (d) =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)],
  );
const files = LAYERS.flatMap((l) =>
  existsSync(join(ROOT, l)) ? walk(join(ROOT, l)) : [],
).filter((f) => f.endsWith('.tsx') && !f.endsWith('.stories.tsx'));
const short = (p) => relative(ROOT, p);
const layerOf = (p) => short(p).split('/')[0];
const isKit = (p) => layerOf(p) === 'ui';
const errors = [];

// shadcn 원본의 층: 옆 스토리 제목의 첫 칸
const kitRank = new Map();
for (const f of files.filter(isKit)) {
  const story = f.replace(/\.tsx$/, '.stories.tsx');
  if (!existsSync(story)) {
    errors.push(
      `shadcn 층  ${short(f)}  옆 스토리(${short(story)})가 없어 층을 정할 수 없다`,
    );
    continue;
  }
  const title = /title:\s*'([^']+)'/.exec(readFileSync(story, 'utf8'))?.[1];
  const rank = KIT_RANK[title?.split('/')[0]];
  if (rank === undefined) {
    errors.push(
      `shadcn 층  ${short(f)}  스토리 제목 '${title ?? '없음'}'이 Atoms/… 도 Molecules/… 도 아니다`,
    );
    continue;
  }
  kitRank.set(f, rank);
}
const rankOf = (p) => (isKit(p) ? kitRank.get(p) : RANK[layerOf(p)]);
const label = (p) => `${NAME[rankOf(p)]}${isKit(p) ? ' · shadcn' : ''}`;

// import 대상: '@/components/…', './x', '../x'. components 밖이면 null
const target = (from, spec) => {
  const base = spec.startsWith('@/components/')
    ? join(ROOT, spec.slice('@/components/'.length))
    : spec.startsWith('.')
      ? resolve(dirname(from), spec)
      : null;
  if (!base || !base.startsWith(ROOT)) return null;
  return existsSync(`${base}.tsx`) ? `${base}.tsx` : base; // .tsx가 아니면 경로 앞부분만으로 층을 정한다
};

const orgEdges = new Map();
for (const f of files) {
  const me = rankOf(f);
  if (me === undefined) continue; // 층을 못 정한 shadcn 파일(위에서 알렸다)
  const src = readFileSync(f, 'utf8');
  for (const [, spec] of src.matchAll(/from ['"]([^'"]+)['"]/g)) {
    const to = target(f, spec);
    if (!to) continue;
    const t = rankOf(to);
    if (t === undefined) continue;
    if (t > me)
      errors.push(
        `위 층 참조  ${short(f)} (${label(f)}) → ${short(to)} (${label(to)})`,
      );
    else if (t < me || isKit(to)) continue;
    else if (me === 3) orgEdges.set(f, [...(orgEdges.get(f) ?? []), to]);
    else
      errors.push(
        `같은 층 참조  ${short(f)} → ${short(to)} (${label(f)} → ${label(to)}, 같은 층은 shadcn 원본만)`,
      );
  }
  if (me >= 2 && !isKit(f)) {
    src.split('\n').forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
      const hits = [...line.matchAll(TYPO)].map((x) => x[1]);
      if (hits.length)
        errors.push(
          `글자 스타일  ${short(f)}:${i + 1}  ${[...new Set(hits)].join(' ')}`,
        );
    });
  }
}

// 유기체 순환 찾기
const state = new Map();
const visit = (n, path) => {
  if (state.get(n) === 1) {
    errors.push(
      `순환 참조  ${[...path.slice(path.indexOf(n)), n].map(short).join(' → ')}`,
    );
    return;
  }
  if (state.get(n) === 2) return;
  state.set(n, 1);
  for (const m of orgEdges.get(n) ?? []) visit(m, [...path, n]);
  state.set(n, 2);
};
for (const n of orgEdges.keys()) visit(n, []);

if (errors.length) {
  const groups = errors.reduce(
    (a, e) => ((a[e.split('  ')[0]] ??= []).push(e), a),
    {},
  );
  for (const [k, list] of Object.entries(groups))
    console.log(
      `\n[${k}] ${list.length}\n` +
        list.map((e) => '  ' + e.split('  ').slice(1).join('  ')).join('\n'),
    );
  console.log(`\n위반 ${errors.length}건`);
  process.exit(1);
}
console.log(
  `층 규칙 통과: 컴포넌트 ${files.length}개(shadcn 원본 ${kitRank.size}개 포함)`,
);
