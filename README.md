# Dearby Design System

Dearby 시안 아티팩트(홈·상세 리뉴얼, Loopers 참고 적용, 웹 시안)의 화면 요소를 **shadcn/ui** 위에 다시 만든 디자인 시스템입니다. 실제 서비스 코드와는 별개입니다.

**Storybook**: https://fixabley.github.io/dearby-design-system/

## 구조

```
src/
  globals.css          Tailwind v4 + Dearby 토큰을 shadcn 이름에 덮어씌움
  components/
    foundations/       Icon(시안 아이콘)
    ui/                shadcn 컴포넌트(Radix + cva) + Dearby 디자인(기반 층)
    atoms/             Text · Wordmark · KindLabel · StatusGlyph · DDay · Thumbnail · HostLine · Segmented · RowList · Pane
    molecules/         MetaLine · ProgressTrack · ListGroup · Field · ReviewCard …
    organisms/         ActivityRow · ProgramDetail · ConferenceTimetable · FilterSheet …
    templates/         WebShell · TwoPane · DetailWithAside · ManageLayout · Modal …
  icons.ts             시안의 아이콘(SVG 원문, 영문 키)
  types.ts · data.ts   예시 데이터 타입과 값
```

컴포넌트 하나당 파일 하나이고, 스토리는 컴포넌트 옆(`*.stories.tsx`)에 있습니다.

## 층 규칙

아톰부터 정하고 나머지는 조립한다. 기반(토큰 · `Icon` · shadcn 키트) < Atoms < Molecules < Organisms < Templates 순서로 아래 층만 참조하고(유기체끼리는 순환 없이 허용), 글자 스타일은 `Text` 아톰에서만 정한다. 분자 이상은 컴파운드 컴포넌트(루트 + 부품, children이 없으면 기본 조립)로 만든다.

```sh
npm run check   # 위 층·같은 층 참조, 유기체 순환, 분자 이상의 글자 스타일 클래스 검사
```

## 실행

```sh
npm ci
npm run storybook        # http://localhost:6008
npm run build-storybook  # dist/
```

`main`에 올리면 GitHub Actions가 Storybook을 빌드해 Pages에 배포합니다.

## 원칙

- 배지는 모두 캡슐. 청록 채움·민트·흰 바탕 테두리만 쓰고 빨강은 오류 전용, 회색 채움 배지는 없습니다.
- 누를 수 있는 컨트롤에만 그림자. 글자 계층은 열 가지(`text-title` … `text-micro`).
- 날짜는 `M월 d일 (요일)`, 실제 시각만 `HH:mm`. `오늘` 같은 상대 표기는 쓰지 않습니다.
- 움직임은 Radix의 `data-state`에 Tailwind 애니메이션을 붙입니다. 동작 줄이기 설정이면 모두 꺼집니다.
- 코드 식별자는 영문, 화면 글자만 한국어.

글꼴은 [Pretendard](https://github.com/orioncactus/pretendard)(SIL OFL 1.1)입니다. 예시에 나오는 기관 이름·로고는 시안 확인용이며 각 기관에 권리가 있습니다.
