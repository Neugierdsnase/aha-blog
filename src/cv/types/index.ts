import type { Dayjs } from 'dayjs';

export type TagType =
  | 'frontend'
  | 'backend'
  | 'devops/sre'
  | 'tech-health'
  | 'consulting'
  | 'other'
  | 'non-tech';

export type LevelType =
  | 'been confronted'
  | 'used before'
  | 'familiar'
  | 'well-versed'
  | 'expert';

export type ModalContentType = {
  heading: string;
  list: ListItemType[];
  time: TimeType;
  tags: TagType[];
};

export type LanguageType = 'en' | 'de';
type MultiLanguageContent<T> = {
  [key in LanguageType]: T;
};

export type IntlContentType<T> = MultiLanguageContent<T>;

export type ListItemType = {
  label: IntlContentType<string>;
  tags?: TagType[];
};

export type TimeType = {
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

export type SkillSectionType = {
  heading: IntlContentType<string>;
  items: CvSectionType[];
};
