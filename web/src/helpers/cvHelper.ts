// Data
import CV_LANGUAGES from "./../assets/data/$cv_languages.json";

//======================================
//== CV Internal Types
//======================================

export interface CV_LANGUAGE_ROW {
  lc: string;
  nname: string | null;
}

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


// Methods

export const getCVLanguageRecord = (lc: string): CV_LANGUAGE_ROW => {
  return (CV_LANGUAGES as CV_LANGUAGE_ROW[]).filter((row) => row.lc === lc)[0];
};
