import type { Dayjs } from 'dayjs';

export type TagType =
  | 'frontend'
  | 'backend'
  | 'devops/sre'
  | 'tech-health'
  | 'consulting'
  | 'other'
  | 'non-tech';

type LevelType =
  | 'been confronted'
  | 'used before'
  | 'familiar'
  | 'well-versed'
  | 'expert';

export type LanguageType = 'en' | 'de';
type MultiLanguageContent<T> = {
  [key in LanguageType]: T;
};

export type IntlContentType<T> = MultiLanguageContent<T>;

type ListItemType = {
  label: IntlContentType<string>;
  tags?: TagType[];
};

type TimeType = {
  from: Dayjs;
  to?: Dayjs;
};

export type CvItemType = {
  label: IntlContentType<string>;
  time?: TimeType;
  tagLine?: IntlContentType<string>;
  list?: ListItemType[];
  tags?: TagType[];
  level?: LevelType;
};

export type CvSectionType = {
  heading: IntlContentType<string>;
  items: CvItemType[];
};

