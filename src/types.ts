import { type IconName, type ActivityKind, type StatusKind } from './icons';

export type Step = { name: string; state: 'past' | 'cur' | 'up' };

export type Rating = 'recommend' | 'neutral' | 'disappointed';

export type TimelineGroup = { title: string; items: { title: string; when: string; dday?: string }[] };

export type Thumb = { cover: string } | { logo?: string; color: string; letter?: string };

export type ActivityMeta = { icon?: IconName; label: string; value?: string; dday?: string };

export type Activity = {
  id: string; kind: ActivityKind; status?: StatusKind; thumb: Thumb; host: { logo?: string; initial?: string; text: string };
  title: string; metas: ActivityMeta[]; steps?: Step[]; more?: number; timetable?: boolean;
};

export type Program = { id: string; kind: ActivityKind; thumb: Thumb; host: { logo?: string; initial?: string; text: string }; count: number; title: string; desc: string };

export type ActivityDetailData = {
  kind: ActivityKind; host: { logo?: string; text: string }; title: string; cover?: string; dday?: string; state?: string;
  picker?: boolean; metas: ActivityMeta[]; schedule: TimelineGroup[]; note?: string;
};

export type Block = { day: number; from: number; to: number; name: string; shape: 'class' | 'rest' | 'special'; who?: string; desc?: boolean };

export type Person = { initial: string; name: string; handle: string; job: string; bio?: string; joined: string };

export type Submission = { initial: string; name: string; sub: string; state: 'pass' | 'retry' | 'pending' | 'none' };

export type Team = { name: string; members: { initial: string; name: string; roles?: string[] }[] };

export type ChannelType = 'forum' | 'text' | 'voice';

export type Channel = { name: string; type: ChannelType };

export type Track = { name: string; color: string };

export type Session = { track: number; title: string; who: string; tags: string[]; saved?: boolean };

export type TimeSlot = { from: string; to: string; now?: boolean } & ({ sessions: (Session | null)[] } | { band: string } | { gap: string });

export type CohortReviews = { cohort: string; count: number; ratio?: number };

export type ProgramDetailData = Program & { cover?: string; chips: string[]; counts: [number, number, number]; open: Activity[]; past: Activity[];
  reviews?: { ratio: number; count: number; items: { initial: string; name: string; meta: string; rating: Rating; body: string; verified?: boolean }[]; cohorts: CohortReviews[] } };
