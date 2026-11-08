import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import * as X from '@/index';
import * as D from '@/data';
import { content, look, state } from '@/stories/argTypes';
import { toDate } from '@/stories/date';

type Mine = { date: string; a: X.Activity };
// ⑧-0 내 활동: 활동 시작일(참여 중·끝남) 또는 다음 일정 날짜(대기 중·지원·찜)로 묶는다. 디프만 18기 · UMC 8기 · SK AIGEN 1기는 시안의 예시
const MINE: Mine[] = [
  { date: '2025-03-01', a: { id: 'dpm18', kind: 'CLUB', status: 'ended', thumb: { color: '#04122B', logo: 'img/logo-depromeet.png' }, host: { logo: 'img/logo-depromeet.png', text: '디프만 · 디프만' }, title: '디프만 18기', metas: [{ label: '활동 종료', value: '2025년 8월 30일 (토)' }] } },
  { date: '2026-03-07', a: { id: 'umc8', kind: 'CLUB', status: 'ended', thumb: { color: '#1C5BFF', letter: 'U' }, host: { initial: 'U', text: 'UMC · UMC' }, title: 'UMC 8기', metas: [{ label: '활동 종료', value: '8월 29일 (토)' }] } },
  { date: '2026-10-31', a: D.ACTIVITIES[0] },
  { date: '2026-11-08', a: D.ACTIVITIES[4] },
  { date: '2026-11-09', a: D.ACTIVITIES[1] },
  { date: '2026-11-15', a: { id: 'aigen1', kind: 'BOOTCAMP', status: 'applying', thumb: { color: '#D0102A', logo: 'img/logo-sk.png' }, host: { logo: 'img/logo-sk.png', text: 'SK · AIGEN' }, title: 'SK AIGEN 1기', metas: [{ label: '마감', dday: 'D-12' }] } },
  { date: '2026-11-21', a: D.ACTIVITIES[2] },
  { date: '2026-12-28', a: D.ACTIVITIES[3] },
];

/** 휴대폰 틀 + 위 제목 줄 + 그 아래를 채우는 목록 */
const Phone = ({ title, children }: { title: string; children: ReactNode }) => (
  <X.PhoneFrame><X.PhoneFrame.Header title={title} />{children}</X.PhoneFrame>
);
const fill = 'absolute inset-x-0 bottom-0 top-[106px] px-6 pb-8';

const meta: Meta = {
  title: 'Organisms/Shared/DateSectionList',
  id: 'organisms-datesectionlist',
  component: X.DateSectionList,
  args: { items: MINE, today: '2026-11-03', pickable: true },
  argTypes: {
    items: content('행 데이터. getDate로 날짜를 읽어 묶고, 묶음 안 행은 renderItem으로 그린다(여기서는 ActivityRow)'),
    pickable: look('맨 위 고정 머리(보이는 맨 위 묶음의 날짜, 누르면 날짜 고르기). 끄면 머리 없이 묶음만'),
    today: { control: 'text', ...state('기준일: 처음 보이는 묶음(이날, 없으면 다음 묶음)과 연도 표시(시안 기준일 11월 3일)') },
    getDate: { table: { disable: true } },
    renderItem: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: ({ items, today, pickable }: Record<string, any>) => (
    <Phone title="내 활동">
      <X.DateSectionList<Mine> items={items} today={toDate(today)} pickable={pickable} className={fill}
        getDate={(m) => toDate(m.date)} renderItem={(m) => <X.ActivityRow a={m.a} />} />
    </Phone>
  ),
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="p-8"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다(⑧-0: 과거가 위, 처음에는 기준일 다음 묶음 11월 8일이 고정 머리 바로 아래) */
export const Playground: Story = {};

// ㉗-g 알림 목록: 굵은 주어 문장 + 시각, 안 읽음은 왼쪽 청록 점
type Note = { logo: string; who: string; text: string; time: string; unread?: boolean };
const NOTES: { date: string; items: Note[] }[] = [
  { date: '2026-11-09', items: [
    { logo: 'img/logo-13.png', who: 'SSAFY 17기', text: ' 서류 발표일이에요. 결과를 남겨 주세요', time: '17:02', unread: true },
    { logo: 'img/logo-22.png', who: '카카오', text: '에서 새 모집을 열었어요 · 카카오테크 부트캠프 6기', time: '09:00', unread: true },
  ] },
  { date: '2026-11-08', items: [
    { logo: 'img/logo-41.png', who: 'FLY AI Challenger 10기', text: ' 모집 마감 D-DAY 23:59', time: '08:00' },
    { logo: 'img/logo-pytorch.png', who: '파이토치 데이 코리아 2026', text: ' 행사 D-13', time: '08:00' },
  ] },
];

/** 컴파운드로 바꿔 조립(㉗-g 알림 목록): 고정 머리 없이, 최근 날짜가 위로 오게 Section을 직접 놓는다 */
export const Composed: Story = {
  args: { today: '2026-11-09' },
  argTypes: { items: { table: { disable: true } }, pickable: { table: { disable: true } } },
  render: ({ today }: Record<string, any>) => (
    <Phone title="알림">
      <X.DateSectionList today={toDate(today)} className={fill}>
        {NOTES.map((g) => (
          <X.DateSectionList.Section key={g.date} date={toDate(g.date)}>
            {g.items.map((n) => (
              <div key={n.who} className="relative flex gap-3 py-3">
                {n.unread && <span role="img" aria-label="안 읽음" className="absolute -left-3.5 top-7 size-2 rounded-full bg-primary" />}
                <X.Avatar src={n.logo} fallback={n.who[0]} className="bg-card shadow-control" />
                <div className="min-w-0 flex-1">
                  <X.Text variant="body" block><X.Text as="b" weight="semibold">{n.who}</X.Text>{n.text}</X.Text>
                  <X.Text variant="caption" tone="muted" block>{n.time}</X.Text>
                </div>
              </div>
            ))}
          </X.DateSectionList.Section>
        ))}
      </X.DateSectionList>
    </Phone>
  ),
};
