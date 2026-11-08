import type { Activity, ActivityDetailData, Block, Channel, Program, ProgramDetailData, TimeSlot, Submission, Team, Track, Person } from './types';

// 시안 아티팩트의 예시 데이터. 동아리·사람·후기는 예시다.
export const ACTIVITIES: Activity[] = [
  { id: '1201', kind: 'CLUB', status: 'participating', thumb: { color: '#04122B', logo: 'img/logo-depromeet.png' }, host: { logo: 'img/logo-depromeet.png', text: '디프만 · 디프만' },
    title: '디프만 19기', metas: [{ label: '종료', dday: 'D-123' }], steps: [{ name: '지원', state: 'past' }, { name: '면접', state: 'past' }, { name: 'OT', state: 'past' }, { name: '활동', state: 'cur' }], more: 1 },
  { id: '1287', kind: 'BOOTCAMP', status: 'applying', thumb: { cover: 'img/cover-13.jpg' }, host: { logo: 'img/logo-13.png', text: '삼성 · SSAFY' },
    title: 'SSAFY 17기', metas: [{ label: '마감', dday: 'D-6' }, { icon: 'place', label: '장소', value: '서울 관악구' }],
    steps: [{ name: '지원', state: 'cur' }, { name: '적성진단', state: 'up' }, { name: '인터뷰', state: 'up' }, { name: '교육 시작', state: 'up' }] },
  { id: '1302', kind: 'CONFERENCE', status: 'waiting', thumb: { color: '#1C49B4', logo: 'img/logo-pytorch.png' }, host: { logo: 'img/logo-pytorch.png', text: '파이토치 한국 사용자 모임 · 파이토치 코리아 컨퍼런스' },
    title: '파이토치 데이 코리아 2026', metas: [{ label: '행사', dday: 'D-18' }, { icon: 'place', label: '장소', value: '서울' }], steps: [{ name: '등록', state: 'past' }, { name: '행사', state: 'up' }], timetable: true },
  { id: '1288', kind: 'BOOTCAMP', status: 'waiting', thumb: { cover: 'img/cover-22.jpg' }, host: { logo: 'img/logo-22.png', text: '카카오 · 카카오테크 부트캠프' },
    title: '카카오테크 부트캠프 5기', metas: [{ label: '교육 시작', dday: 'D-55' }, { icon: 'place', label: '장소', value: '성남 분당구' }],
    steps: [{ name: '지원', state: 'past' }, { name: '1차 발표', state: 'past' }, { name: '면접', state: 'past' }, { name: '교육 시작', state: 'up' }], more: 1 },
  { id: '1290', kind: 'BOOTCAMP', status: 'applying', thumb: { color: '#EAAB4A', logo: 'img/logo-41.png' }, host: { logo: 'img/logo-41.png', text: 'SK텔레콤 · SKT FLY AI Challenger' },
    title: 'FLY AI Challenger 10기', metas: [{ label: '마감', dday: 'D-5' }, { icon: 'place', label: '장소', value: '서울 관악구' }],
    steps: [{ name: '지원', state: 'cur' }, { name: '면접·코딩평가', state: 'up' }, { name: '발표', state: 'up' }, { name: '교육기간', state: 'up' }], more: 1 },
];

export const SSAFY: ActivityDetailData = {
  kind: 'BOOTCAMP', host: { logo: 'img/logo-13.png', text: '삼성 · SSAFY' }, title: 'SSAFY 17기', cover: 'img/cover-13.jpg', dday: 'D-6', state: '모집 중', picker: true,
  metas: [{ label: '모집', value: '11월 9일 (월) 17:00 마감' }, { icon: 'clock', label: '활동', value: '2027년 1월 1일 (금) 교육 시작' }, { icon: 'place', label: '장소', value: '캠퍼스를 선택하면 볼 수 있어요' }],
  schedule: [
    { title: '선발 과정', items: [{ title: '모집 마감', when: '11월 9일 (월) 17:00 마감', dday: 'D-6' }, { title: 'SSAFY 적성진단 (SW 비전공/마이스터고)', when: '11월 14일 (토)' },
      { title: 'SSAFY 적성진단 (SW 전공)', when: '11월 21일 (토)' }, { title: '면접', when: '12월 1일 (화)' }] },
    { title: '활동 일정', items: [{ title: '교육 시작', when: '2027년 1월 1일 (금)' }] },
  ],
  note: '이 활동은 시간이 정해진 일정이 없어 겹침을 확인할 수 없어요',
};

export const PROGRAMS: Program[] = [
  { id: '77', kind: 'CLUB', thumb: { color: '#0E5E66', letter: '모' }, host: { initial: '모', text: '모각코 클럽' }, count: 1, title: '모각코 클럽', desc: '매주 모여 각자 코딩하고 코드 리뷰를 주고받는 연합 동아리' },
  { id: '21', kind: 'BOOTCAMP', thumb: { cover: 'img/cover-21.jpg' }, host: { initial: '현', text: '현대자동차그룹' }, count: 1, title: '현대자동차그룹 소프티어 부트캠프', desc: '현대자동차그룹 SW 인재 양성 부트캠프, 수료 뒤 현대차그룹 채용 전형 연계' },
  { id: '41', kind: 'BOOTCAMP', thumb: { color: '#EAAB4A', logo: 'img/logo-41.png' }, host: { logo: 'img/logo-41.png', text: 'SK텔레콤' }, count: 1, title: 'SKT FLY AI Challenger', desc: 'SK텔레콤 AI 인재 양성 10주 집중 과정, 이론·실습과 해커톤' },
  { id: '13', kind: 'BOOTCAMP', thumb: { cover: 'img/cover-13.jpg' }, host: { logo: 'img/logo-13.png', text: '삼성' }, count: 1, title: 'SSAFY', desc: '삼성 청년 SW·AI 아카데미, 1년 무료 교육과 월 지원금, 수료 뒤 취업 지원까지' },
  { id: '22', kind: 'BOOTCAMP', thumb: { cover: 'img/cover-22.jpg' }, host: { logo: 'img/logo-22.png', text: '카카오' }, count: 1, title: '카카오테크 부트캠프', desc: '카카오 현업 멘토와 6개월 풀스택·AI·클라우드 집중 과정, 수료 뒤 채용 연계' },
  { id: '42', kind: 'BOOTCAMP', thumb: { cover: 'img/cover-42.jpg' }, host: { initial: '크', text: '크래프톤' }, count: 3, title: '크래프톤 정글', desc: '크래프톤이 만든 5개월 합숙 SW 개발자 양성 과정, 대전 유성 캠퍼스' },
];

const club = (id: string, title: string, metas: Activity['metas'], status?: Activity['status']): Activity =>
  ({ id, kind: 'CLUB', status, thumb: { color: '#0E5E66', letter: '모' }, host: { initial: '모', text: '모각코 클럽 · 모각코 클럽' }, title, metas });
export const MOGAKCO: ProgramDetailData = {
  ...PROGRAMS[0], chips: ['웹·앱', '프로젝트', '네트워킹'], counts: [1, 0, 2],
  open: [club('2201', '모각코 클럽 8기', [{ label: '모집', value: '11월 20일 (금) 23:59 마감' }, { icon: 'place', label: '장소', value: '서울 마포구' }], 'waiting')],
  past: [club('2101', '모각코 클럽 7기', [{ label: '활동 종료', value: '8월 30일 (일)' }, { icon: 'place', label: '장소', value: '서울 마포구' }])],
  reviews: {
    ratio: 75, count: 16, cohorts: [{ cohort: '7기', count: 9, ratio: 78 }, { cohort: '6기', count: 4, ratio: 75 }, { cohort: '5기', count: 2 }, { cohort: '4기', count: 1 }],
    items: [
      { initial: '박', name: '박서준', meta: '7기 · 2026년 9월', rating: 'recommend', verified: true, body: '매주 코드 리뷰를 주고받으면서 PR 쓰는 법이 많이 늘었어요. 기수 안에서 사이드 프로젝트 팀이 꾸려져서 끝나고도 같이 만들고 있어요.' },
      { initial: '최', name: '최민재', meta: '7기 · 2026년 9월', rating: 'neutral', body: '프로젝트 위주라 이론을 기대하면 아쉬울 수 있어요. 사람은 좋았어요.' },
    ],
  },
};

export const TRACKS: Track[] = [{ name: '트랙 A', color: '#2F6FED' }, { name: '트랙 B', color: '#E0862A' }, { name: '트랙 C', color: '#8E5BD7' }];
export const SLOTS: TimeSlot[] = [
  { from: '13:30', to: '14:10', sessions: [
    { track: 0, title: 'PyTorch 2.x 컴파일러, 무엇이 빨라졌나', who: '김하늘 · 메타', tags: ['데이터·AI'], saved: true },
    { track: 1, title: 'LLM 파인튜닝을 하루 만에 끝내기', who: '박서준 · 업스테이지', tags: ['데이터·AI', '실무'] },
    { track: 2, title: '온디바이스 추론 최적화 실전', who: '이도윤 · 삼성리서치', tags: ['모바일'] }] },
  { from: '', to: '', gap: '10분' },
  { from: '14:20', to: '15:00', now: true, sessions: [
    { track: 0, title: 'torch.compile 내부 들여다보기', who: '정민재 · 네이버', tags: ['데이터·AI'] },
    { track: 1, title: 'RAG 파이프라인 평가 방법론', who: '최유진 · 카카오', tags: ['데이터·AI'], saved: true }, null] },
  { from: '15:00', to: '15:20', band: '쉬는시간' },
  { from: '15:20', to: '16:00', sessions: [
    { track: 0, title: '분산 학습 FSDP2 적용기', who: '한지우 · 서울대', tags: ['데이터·AI', '연구'] },
    { track: 1, title: 'GPU 비용 절반으로 줄인 스케줄링', who: '오세훈 · 토스', tags: ['클라우드'] },
    { track: 2, title: 'ExecuTorch로 iOS 앱에 모델 싣기', who: '서하은 · 당근', tags: ['모바일', '데이터·AI'], saved: true }] },
];

export const SEOYEON: Person = { initial: '이', name: '이서연', handle: 'seoyeon', job: '프론트엔드 개발자', bio: '웹 접근성과 디자인 시스템에 관심이 많아요.', joined: '2026년 10월' };
export const DOYUN: Person = { initial: '김', name: '김도윤', handle: 'doyun', job: 'iOS 개발자 · 디프만 19기', bio: 'iOS와 온디바이스 AI를 만들어요. 동아리·해커톤에서 같이 만들 사람을 찾고 있어요.', joined: '2026년 10월' };

export const SUBMISSIONS: Submission[] = [
  { initial: '이', name: '이서연', sub: 'PR #7 · 11월 28일 (토) 22:10', state: 'pending' },
  { initial: '박', name: '박지후', sub: 'PR #8 · 11월 29일 (일) 09:42', state: 'pass' },
  { initial: '한', name: '한유진', sub: 'PR #9 · 11월 29일 (일) 23:05', state: 'retry' },
  { initial: '최', name: '최민재', sub: '11월 30일 (월) 23:30 마감', state: 'none' },
  { initial: '정', name: '정하은', sub: '11월 30일 (월) 23:30 마감', state: 'none' },
];

export const BLOCKS: Block[] = [
  ...[0, 1, 2, 3, 4].map((d): Block => ({ day: d, from: 10, to: 12, name: '강의', shape: 'class', who: '김도윤', desc: true })),
  ...[0, 1, 2, 3, 4].map((d): Block => ({ day: d, from: 12, to: 13, name: '점심', shape: 'rest' })),
  ...[0, 1, 3].map((d): Block => ({ day: d, from: 13, to: 17, name: '실습', shape: 'class', who: '이서연 외 1', desc: true })),
  { day: 2, from: 13, to: 15, name: '실습', shape: 'class', who: '이서연 외 1', desc: true },
  { day: 2, from: 15, to: 17, name: '특강', shape: 'special', who: '한유진', desc: true },
  { day: 4, from: 13, to: 16, name: '실습', shape: 'class', who: '이서연 외 1', desc: true },
  { day: 4, from: 16, to: 17, name: '회고', shape: 'class' },
];

export const TEAMS: Team[] = [
  { name: '1팀', members: [{ initial: '이', name: '이서연', roles: ['발표자'] }, { initial: '박', name: '박지후' }, { initial: '정', name: '정하은' }] },
  { name: '2팀', members: [{ initial: '한', name: '한유진', roles: ['발표자'] }, { initial: '최', name: '최민재' }, { initial: '오', name: '오세훈' }] },
  { name: '3팀', members: [{ initial: '강', name: '강민서' }, { initial: '윤', name: '윤재원', roles: ['발표자'] }] },
];
export const UNASSIGNED: Team = { name: '팀 없음', members: [{ initial: '조', name: '조하린' }] };

export const SERVERS = [{ name: 'SSAFY 스터디 서버', sub: '서버 관리자 승인 필요' }, { name: '도윤의 작업실', sub: '바로 만들 수 있어요' }];
export const CHANNELS: Channel[] = [{ name: '과제 제출', type: 'forum' }, { name: '자유 대화', type: 'text' }, { name: '질문', type: 'forum' }, { name: '음성 대화', type: 'voice' }];
