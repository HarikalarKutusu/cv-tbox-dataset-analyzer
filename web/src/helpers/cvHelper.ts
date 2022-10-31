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
