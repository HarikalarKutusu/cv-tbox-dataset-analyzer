//======================================
//== CV Related
//======================================

export const CV_VERSIONS: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5.1",
  "6.1",
  "7.0",
  "8.0",
  "9.0",
  "10.0",
  "11.0",
];

export const CV_DATES: string[] = [
  "2019-02-25",
  "2019-06-11",
  "2019-06-24",
  "2019-12-10",
  "2020-06-22",
  "2020-12-11",
  "2021-07-21",
  "2022-01-19",
  "2022-04-27",
  "2022-07-04",
  "2022-09-21",
];

export const CV_LOCALES: string[] = [
  "ab",
  "ar",
  "as",
  "ast",
  "az",
  "ba",
  "bas",
  "be",
  "bg",
  "bn",
  "br",
  "ca",
  "ckb",
  "cnh",
  "cs",
  "cv",
  "cy",
  "da",
  "de",
  "dv",
  "el",
  "en",
  "eo",
  "es",
  "et",
  "eu",
  "fa",
  "fi",
  "fr",
  "fy-NL",
  "ga-IE",
  "gl",
  "gn",
  "ha",
  "hi",
  "hsb",
  "hu",
  "hy-AM",
  "ia",
  "id",
  "ig",
  "it",
  "ja",
  "ka",
  "kab",
  "kk",
  "kmr",
  "ky",
  "lg",
  "lt",
  "lv",
  "mdf",
  "mhr",
  "mk",
  "ml",
  "mn",
  "mr",
  "mrj",
  "mt",
  "myv",
  "nan-tw",
  "ne-NP",
  "nl",
  "nn-NO",
  "or",
  "pa-IN",
  "pl",
  "pt",
  "rm-sursilv",
  "rm-vallader",
  "ro",
  "ru",
  "rw",
  "sah",
  "sat",
  "sc",
  "sk",
  "skr",
  "sl",
  "sr",
  "sv-SE",
  "sw",
  "ta",
  "th",
  "ti",
  "tig",
  "tok",
  "tr",
  "tt",
  "tw",
  "ug",
  "uk",
  "ur",
  "uz",
  "vi",
  "vot",
  "yue",
  "zh-CN",
  "zh-HK",
  "zh-TW",
];

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
