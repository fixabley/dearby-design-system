// 시안 아티팩트에서 가져온 아이콘(SVG 원문). 키는 계약의 아이콘 의미표를 따른 영문
// 시안에 없는 서비스 로고는 각 회사의 공식 자료에서 가져왔다(README 서비스 로고)
export const ICONS = {
  close:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  heart:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7.6-4.5-7.6-10.1A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.6 2.6C19.6 15.5 12 20 12 20z"/></svg>',
  heartFill:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path fill="currentColor" d="M12 20s-7.6-4.5-7.6-10.1A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.6 2.6C19.6 15.5 12 20 12 20z"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1H15v-6H9v6H4.5a1 1 0 0 1-1-1z"/></svg>',
  explore:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M15.6 8.4 13.5 13.5 8.4 15.6 10.5 10.5z"/></svg>',
  card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="11" r="2"/><path d="M6.3 16.2c.6-1.3 1.6-2 2.7-2s2.1.7 2.7 2M14 10h4M14 13.5h4"/></svg>',
  profile:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.6 18.3c1.3-1.9 3.2-2.9 5.4-2.9s4.1 1 5.4 2.9"/></svg>',
  settings:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3.1"/><circle cx="12" cy="12" r="6.8"/><path d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6M5.4 5.4l1.8 1.8M16.8 16.8l1.8 1.8M5.4 18.6l1.8-1.8M16.8 7.2l1.8-1.8"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.6 2H4.4z"/><path d="M10 20.5a2.1 2.1 0 0 0 4 0"/></svg>',
  share:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5v11M8 7.3l4-3.8 4 3.8"/><path d="M7 10.5H6a1 1 0 0 0-1 1V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8.5a1 1 0 0 0-1-1h-1"/></svg>',
  add: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5.5 8.5 12 15 18.5"/></svg>',
  check:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="currentColor" stroke="none"/><path d="M8 12.3l2.8 2.8L16.2 9.6" stroke="#fff" stroke-width="2.2"/></svg>',
  checkmark:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  github:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.6-.2.6-.5v-1.7c-2.6.6-3.2-1.2-3.2-1.2-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.1-.2-4.3-1-4.3-4.7 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.6 1a9 9 0 0 1 4.8 0c1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.6 0 3.7-2.2 4.5-4.3 4.7.3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5z"/></svg>',
  discord:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7.5c3.2-1.3 6.8-1.3 10 0l1.6 8.4c-1.3 1.2-2.7 1.9-4.2 2.1l-.8-1.6M7 7.5 5.4 15.9c1.3 1.2 2.7 1.9 4.2 2.1l.8-1.6"/><circle cx="9.5" cy="12.5" r="1" fill="currentColor"/><circle cx="14.5" cy="12.5" r="1" fill="currentColor"/></svg>',
  hash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4 7 20M17 4l-2 16M4.5 9h16M3.5 15h16"/></svg>',
  forum:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h11v8H8l-4 3z"/><path d="M15 9h5v8l-3-2h-6v-2"/></svg>',
  voice:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10v4h3l5 4V6L7 10z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  repeat:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 11V9.5a3 3 0 0 1 3-3h11l-3-3M19.5 13v1.5a3 3 0 0 1-3 3h-11l3 3"/></svg>',
  group:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.4"/><path d="M3.5 19c.8-3 2.9-4.5 5.5-4.5s4.7 1.5 5.5 4.5M14.6 15.1c2.6-.6 5 .8 5.9 3.9"/></svg>',
  books:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4.5h4v15H5zM10 4.5h4v15h-4zM15.5 5.6l3.9-1 3.7 14.5-3.9 1z"/></svg>',
  calendarAlt:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.8h17M8 3v4M16 3v4"/></svg>',
  place:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6.5-5.9-6.5-11a6.5 6.5 0 0 1 13 0c0 5.1-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>',
  description:
    '<svg class="lp-di" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-label="상세 설명 있음"><path d="M5 7h14M5 12h14M5 17h9"/></svg>',
  calendar:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.8h17M8 3v4M16 3v4"/></svg>',
  clock:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/></svg>',
  addCircle:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>',
  calendarAdd:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.8h17M8 3v4M16 3v4M12 12.5v5M9.5 15h5"/></svg>',
  timetable:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.8h17M8 3v4M16 3v4"/></svg>',
  chevronRight:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5.5 15.5 12 9 18.5"/></svg>',
  chevronDown:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5.5 9 12 15.5 18.5 9"/></svg>',
  search:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M15.8 15.8 20 20"/></svg>',
  filter:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M7.5 9.5h9M9 12.5h6M10.5 15.5h3"/></svg>',
  joined:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.8h17M8 3v4M16 3v4"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10l-4 3.5v-3.5a2 2 0 0 1-2-2z"/></svg>',
  githubMark:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.6-.2.6-.5v-1.7c-2.6.6-3.2-1.2-3.2-1.2-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.1-.2-4.3-1-4.3-4.7 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.6 1a9 9 0 0 1 4.8 0c1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.6 0 3.7-2.2 4.5-4.3 4.7.3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5z"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.5 16.5 16.5 7.5M9.5 7.5h7v7"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 19.5l1-4.2L15.8 5a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.7 18.5z"/><path d="M13.8 7l3.2 3.2"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><svg x="3" y="3" width="18" height="18" viewBox="0 0 28 28"><path d="m25.9 0h-23.8c-1.2 0-2.1 0.9-2.1 2v24c0 1.1 0.9 2 2.1 2h23.9c1.1 0 2.1-0.9 2.1-2v-24c-0.1-1.1-1-2-2.2-2zm-17.6 23.9h-4.1v-13.4h4.2v13.4zm-2.1-15.2c-1.3 0-2.4-1.1-2.4-2.4s1.1-2.4 2.4-2.4 2.4 1.1 2.4 2.4-1 2.4-2.4 2.4zm17.7 15.2h-4.1v-6.5c0-1.5 0-3.5-2.2-3.5s-2.5 1.7-2.5 3.4v6.6h-4.1v-13.4h4v1.8h0.1c0.6-1 1.9-2.2 3.9-2.2 4.2 0 5 2.8 5 6.4v7.4z"/></svg></svg>',
  pinterest:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><svg x="2.5" y="2.5" width="19" height="19" viewBox="0 0 24 24"><path d="M7.54467 23.1456C7.39492 21.7804 7.49955 20.4758 7.79953 19.2157L8.99946 14.0408C8.80459 13.411 8.65436 12.6905 8.65436 11.9705C8.65436 10.2904 9.46455 9.09042 10.7394 9.09042C11.6244 9.09042 12.2695 9.70531 12.2695 10.8905C12.2695 11.2653 12.1946 11.6854 12.0444 12.1654L11.5193 13.8905C11.4142 14.2208 11.3696 14.5357 11.3696 14.8054C11.3696 16.0054 12.2844 16.6803 13.4546 16.6803C15.5395 16.6803 17.0246 14.5203 17.0246 11.7151C17.0246 8.59505 14.9847 6.60013 11.97 6.60013C8.6102 6.60013 6.48057 8.79042 6.48057 11.8351C6.48057 13.0649 6.85543 14.2049 7.59074 14.9849C7.35076 15.3901 7.09589 15.4649 6.70568 15.4649C5.50575 15.4649 4.36582 13.77 4.36582 11.4598C4.36582 7.46943 7.56051 4.28985 12.0454 4.28985C16.7548 4.28985 19.71 7.57503 19.71 11.6249C19.71 15.6747 16.8302 18.765 13.7253 18.765C12.4951 18.765 11.4152 18.2399 10.6654 17.2947L10.0506 19.785C9.72038 21.0748 9.22553 22.2902 8.43069 23.46C9.55575 23.8051 10.6654 24 12.0007 24C18.6301 24 24 18.6297 24 11.9998C24 5.36987 18.6291 0 11.9993 0C5.36944 0 0 5.37035 0 12.0002C0 17.0255 3.09005 21.3604 7.54467 23.1456Z"/></svg></svg>',
} as const;
export type IconName = keyof typeof ICONS;
export const STATUS = {
  participating: {
    svg: '<svg class="sg" viewBox="0 0 14 14" width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="5.4" fill="var(--teal)"/></svg>',
    label: '참여 중',
    cls: 'on',
  },
  waiting: {
    svg: '<svg class="sg" viewBox="0 0 14 14" width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="6.3" fill="none" stroke="var(--teal)" stroke-width="1.2"/><circle cx="7" cy="7" r="3.6" fill="var(--teal)"/></svg>',
    label: '대기 중',
    cls: 'wait',
  },
  selecting: {
    svg: '<svg class="sg" viewBox="0 0 14 14" width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="4.6" fill="none" stroke="var(--amber)" stroke-width="1.6"/><path d="M7 2.4a4.6 4.6 0 0 0 0 9.2z" fill="var(--amber)"/></svg>',
    label: '지원',
    cls: 'sel',
  },
  ended: {
    svg: '<svg class="sg" viewBox="0 0 14 14" width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="5.4" fill="#8E8E93"/></svg>',
    label: '끝남',
    cls: 'end',
  },
  applying: {
    svg: '<svg class="sg" viewBox="0 0 14 14" width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="4.6" fill="none" stroke="#8E8E93" stroke-width="1.6"/></svg>',
    label: '찜',
    cls: 'pick',
  },
} as const;
export type StatusKind = keyof typeof STATUS;
export const KINDS = {
  CLUB: {
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.4"/><path d="M3.5 19c.8-3 2.9-4.5 5.5-4.5s4.7 1.5 5.5 4.5M14.6 15.1c2.6-.6 5 .8 5.9 3.9"/></svg>',
    label: '동아리',
  },
  CONFERENCE: {
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="9" r="3"/><circle cx="16.5" cy="10" r="2.4"/><path d="M3.5 19c.8-2.9 2.9-4.4 5.5-4.4s4.7 1.5 5.5 4.4M14.6 15.1c2.6-.6 5 .8 5.9 3.9"/></svg>',
    label: '컨퍼런스',
  },
  BOOTCAMP: {
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 9 12 4.5 21.5 9 12 13.5z"/><path d="M6.5 11v4.6c1.7 1.5 3.5 2.2 5.5 2.2s3.8-.7 5.5-2.2V11M21.5 9v5"/></svg>',
    label: '부트캠프',
  },
  CONTEST: {
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M7 5.5H4.5v1.5a3 3 0 0 0 3 3M17 5.5h2.5v1.5a3 3 0 0 1-3 3M12 13v3.5M8.5 20h7M9.5 16.5h5"/></svg>',
    label: '공모전',
  },
  MEETUP: {
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10l-4 3.5v-3.5a2 2 0 0 1-2-2z"/></svg>',
    label: '밋업',
  },
  WORKSHOP: {
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="11" rx="2.5"/><path d="M7 11h.01M11 11h.01M15 11h.01M7 14.5h10"/></svg>',
    label: '워크숍',
  },
  STUDY: {
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4.5h4v15H5zM10 4.5h4v15h-4zM15.5 5.6l3.9-1 3.7 14.5-3.9 1z"/></svg>',
    label: '스터디',
  },
} as const;
export type ActivityKind = keyof typeof KINDS;
