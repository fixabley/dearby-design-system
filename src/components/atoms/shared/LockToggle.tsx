import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import type { AnimationItem } from 'lottie-web';
import { Icon } from '@/components/foundations/Icon';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const K = 2.209; // 반지름 4인 4분원의 베지어 접선 길이(4 × 0.5523)
const fixed = <T,>(k: T) => ({ a: 0, k });
// 층: 축(pivot)을 중심으로 r만큼 도는 도형 하나와 그 선(검정 1.8, 둥근 끝 · 이음)
const layer = (pivot: number[], r: object, shape: object) => ({
  ty: 4,
  ip: 0,
  op: 19,
  st: 0,
  sr: 1,
  ks: {
    o: fixed(100),
    a: fixed(pivot),
    p: fixed(pivot),
    s: fixed([100, 100, 100]),
    r,
  },
  shapes: [
    shape,
    {
      ty: 'st',
      c: fixed([0, 0, 0, 1]),
      o: fixed(100),
      w: fixed(1.8),
      lc: 2,
      lj: 2,
    },
  ],
});

// 자물쇠가 열리는 Lottie(직접 만듦, README 자물쇠 토글): lock 아이콘과 같은 고리 · 몸통(24 격자, 선 1.8, 둥근 끝).
// 고리가 왼발(8,11)을 축으로 25° 젖혀진다. 60fps 18프레임(0.3초), 빠르기는 ease-spring 토큰. 끝 프레임이 unlock 아이콘이다.
// 색은 검정으로 두고 CSS(stroke-current)로 글자색을 입힌다. lottie-web이 받은 자료를 고쳐 쓰므로 부를 때마다 새로 만든다
const lockAnimation = () => ({
  v: '5.13.0',
  fr: 60,
  ip: 0,
  op: 19,
  w: 24,
  h: 24,
  layers: [
    layer(
      [8, 11, 0],
      {
        a: 1,
        k: [
          {
            t: 0,
            s: [0],
            o: { x: [0.3], y: [1.25] },
            i: { x: [0.45], y: [1] },
          },
          { t: 18, s: [-25] },
        ],
      },
      {
        ty: 'sh',
        ks: fixed({
          c: false,
          v: [
            [8, 11],
            [8, 8],
            [12, 4],
            [16, 8],
            [16, 11],
          ],
          i: [
            [0, 0],
            [0, 0],
            [-K, 0],
            [0, -K],
            [0, 0],
          ],
          o: [
            [0, 0],
            [0, -K],
            [K, 0],
            [0, 0],
            [0, 0],
          ],
        }),
      },
    ),
    layer([0, 0, 0], fixed(0), {
      ty: 'rc',
      d: 1,
      p: fixed([12, 15.5]),
      s: fixed([14, 9]),
      r: fixed(2),
    }),
  ],
});

const still = () =>
  !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * 자물쇠 토글(Radix Switch, role="switch"): 잠김 = 꺼짐(비공개), 열림 = 켜짐(공개). Switch와 같은 props라 바꿔 끼울 수 있다:
 * `<LockToggle checked={isPublic} onCheckedChange={setPublic} aria-label="LinkedIn 공개" />`. 이름은 쓰는 쪽이 aria-label로 준다.
 * 상태가 바뀌면 Lottie로 고리가 열리고 닫힌다. 재생기(lottie-web light)는 화면에 놓인 뒤에 따로 불러오고,
 * 불러오기 전 · 실패 · 동작 줄이기 설정에서는 같은 자리에 lock · unlock 정지 아이콘을 그린다
 */
export function LockToggle({
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: Omit<
  React.ComponentProps<typeof SwitchPrimitive.Root>,
  'asChild' | 'children'
>) {
  const [inner, setInner] = React.useState(defaultChecked ?? false);
  const open = checked ?? inner;
  const box = React.useRef<HTMLSpanElement>(null);
  const [anim, setAnim] = React.useState<AnimationItem | null>(null); // 준비된 재생기
  const drawn = React.useRef<AnimationItem | null>(null); // 지금 상태를 이미 그린 재생기

  // 동작 줄이기면 재생기를 불러오지 않는다(lottie-web은 스크립트로 그려 styles.css의 동작 줄이기 규칙이 닿지 않는다).
  // 상자는 지금 잡아 둔다: Suspense가 내용을 가리면 ref가 떼어져, 그 사이 import가 끝나면 box.current가 비어 있다
  React.useEffect(() => {
    const el = box.current;
    if (!el || still()) return;
    let off = false;
    let item: AnimationItem | undefined;
    import('lottie-web/build/player/lottie_light')
      .then(({ default: lottie }) => {
        if (off) return;
        const a = lottie.loadAnimation({
          container: el,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          animationData: lockAnimation(),
        });
        item = a;
        a.addEventListener('DOMLoaded', () => setAnim(a));
      })
      .catch(() => {}); // 못 불러오면 정지 아이콘 그대로
    return () => {
      off = true;
      item?.destroy();
      setAnim(null);
    };
  }, []);

  // 누름이 아니라 상태가 바뀔 때 움직인다(키보드 · 부모가 바꾼 값도 같은 길). 재생기가 처음 그릴 때와 동작 줄이기에서는 그 상태의 정지 그림으로 바로 간다
  React.useLayoutEffect(() => {
    if (!anim) return;
    if (drawn.current !== anim || still()) {
      anim.goToAndStop(open ? anim.totalFrames - 1 : 0, true);
    } else {
      anim.setDirection(open ? 1 : -1);
      anim.play();
    }
    drawn.current = anim;
  }, [open, anim]);

  return (
    <SwitchPrimitive.Root
      data-slot="lock-toggle"
      className={cn(
        buttonVariants({ variant: 'plain', size: 'icon-sm' }),
        className,
      )}
      checked={open}
      onCheckedChange={(v) => {
        setInner(v);
        onCheckedChange?.(v);
      }}
      {...props}
    >
      {!anim && <Icon name={open ? 'unlock' : 'lock'} />}
      <span
        ref={box}
        aria-hidden
        className={cn(
          'block size-[22px] [&_path]:stroke-current',
          !anim && 'hidden',
        )}
      />
    </SwitchPrimitive.Root>
  );
}
