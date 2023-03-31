//======================================
//== CV API Data Types
//======================================

export type CV_LANGUAGE_ROW = {
  id: number;
  name: string;
  target_sentence_count: number;
  native_name: string;
  is_contributable: number;
  is_translated: number;
  text_direction: string;
};

//======================================
//== CV Internal Types
//======================================

export const NODATA = "nodata";

export type CV_GENDER_TYPE = "male" | "female" | "other" | "nodata" | "total";

export const CV_GENDERS: CV_GENDER_TYPE[] = [
  "male",
  "female",
  "other",
  "nodata",
  "total",
];

export type CV_AGE_TYPE =
  | "teens"
  | "twenties"
  | "thirties"
  | "fourties"
  | "fifties"
  | "sixties"
  | "seventies"
  | "eighties"
  | "nineties"
  | "nodata"
  | "total";

export const CV_AGES: CV_AGE_TYPE[] = [
  "teens",
  "twenties",
  "thirties",
  "fourties",
  "fifties",
  "sixties",
  "seventies",
  "eighties",
  "nineties",
  "nodata",
  "total",
];
