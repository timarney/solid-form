export type DateFormat = "YYYY-MM-DD" | "DD-MM-YYYY" | "MM-DD-YYYY";

export interface DateObject {
  YYYY: number;
  MM: number;
  DD: number;
}

export enum DatePart {
  DD = "day",
  MM = "month",
  YYYY = "year",
}

export type Group = {
  name: string;
  titleEn: string;
  titleFr: string;
  nextAction?: string | NextActionRule[];
  elements: string[]; // NOTE: these are elementIds
  autoFlow?: boolean;
  exitUrlEn?: string; // Used when a nextAction is set to "exit"
  exitUrlFr?: string; // Used when a nextAction is set to "exit"
};

export type NextActionRule = { groupId: string; choiceId: string };
export type GroupsType = Record<string, Group>;
export type FormValues = Record<string, string | string[]>;

export type ConditionalRule = {
  choiceId: string;
};
