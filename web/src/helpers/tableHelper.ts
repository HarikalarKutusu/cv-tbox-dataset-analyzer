import { ScaleType } from "recharts/types/util/types";

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

//======================================
//== Tab Views
//======================================

export type DATASET_INFO_VIEW_TYPE =
  | "general"
  | "duration"
  | "voices"
  | "gender"
  | "age"
  | "votes"
  | "sentences"
  | "text-corpus";
// | "comperative"
// | "health"

export const DATASET_INFO_VIEW_TYPES: DATASET_INFO_VIEW_TYPE[] = [
  "general",
  "duration",
  "voices",
  "gender",
  "age",
  "votes",
  "sentences",
  "text-corpus",
  // "comperative",
  // "health",
];

//======================================
//== Support Matrix
//======================================

export type SUPPORT_MATRIX_ROW_TYPE = {
  lc: string;
  lang: string;

  v11_0: string | null;
  v10_0: string | null;
  v9_0: string | null;
  v8_0: string | null;
  v7_0: string | null;
  v6_1: string | null;
  v5_1: string | null;
  v4: string | null;
  v3: string | null;
  v2: string | null;
  v1: string | null;
};

//======================================
//== Split Statistics tables
//======================================

export type DATASET_INFO_ROW_TYPE = {
  ver: string;
  lc: string;
  alg: string;
  sp: string;

  clips: number;
  uq_v: number;
  uq_s: number;
  uq_sl: number;
  dup_s: number;
  dup_sl: number;

  dur_total: number;
  dur_mean: number;
  dur_median: number;
  dur_freq: string | number[];

  v_mean: number;
  v_median: number;
  v_freq: string | number[];

  s_mean: number;
  s_median: number;
  s_freq: string | number[];

  votes: string | number[][];

  dem_table: string | number[][];
  dem_uq: string | number[][];
  dem_fix_r: string | number[][];
  dem_fix_v: string | number[][];
};

export const DATASET_INFO_DURATION_BINS: number[] = [
  // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 99,
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 99,
];

export const DATASET_INFO_VOICE_BINS: number[] = [
  1,
  2,
  4,
  8,
  16,
  32,
  64,
  128,
  256,
  512,
  1024,
  2048,
  4096,
  8192,
  16384,
  32768,
  65536, // 999999,
];

export const DATASET_INFO_SENTENCE_BINS: number[] = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  20,
  30,
  40,
  50,
  100, // 999999,
];

//======================================
//== Text Corpus Statistics
//======================================

export type TEXT_CORPUS_STATS_ROW_TYPE = {
  lc: string;
  s_cnt: number;
  uq_s: number;
  uq_n: number;
  has_val: number;
  val: number;

  c_total: number;
  c_mean: number;
  c_median: number;
  c_freq: string | number[];

  w_total: number;
  w_mean: number;
  w_median: number;
  w_freq: string | number[];

  t_total: number;
  t_mean: number;
  t_median: number;
  t_freq: string | number[];
};

export const TEXT_CORPUS_CHAR_BINS: number[] = [
  10,
  20,
  30,
  40,
  50,
  60,
  70,
  80,
  90,
  100,
  110,
  120,
  130,
  140,
  150, //, 99999,
];

export const TEXT_CORPUS_WORD_BINS: number[] = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20, //, 99999,
];

export const TEXT_CORPUS_TOKEN_BINS: number[] = [
  1,
  2,
  4,
  8,
  16,
  32,
  64,
  128,
  256,
  512,
  1024,
  2048,
  4096,
  8192,
  16384,
  32768,
  65536, //, 999999,
];

// SEPARATORS
export const SEP_ROW: string = "|";
export const SEP_COL: string = "#";
export const SEP_ALGO: string = "|";

// Frequency Tables
export interface IFreqTableProps {
  bins: number[] | string[];
  values: number[] | string[];
  title: string;
  yScale: ScaleType;
  mean?: number;
  median?: number;
  dropLastFromGraph?: boolean;
}

export interface IFreqTableRow {
  bin: number | string;
  val: number | string;
}

export interface IFreqTableProps2D {
  data: number[][];
  colHeadings: string[];
  rowHeadings: string[];
  title: string;
}

export interface IFreqTableRow2D {
  val: number | string;
}

//
// Methods
//

export const convertStrList = (s: string) => {
  return s.split(SEP_COL).map((x) => Number(x));
};

export const convertStrArr = (s: string) => {
  return s.split(SEP_ROW).map((s) => convertStrList(s));
};

export const getLastCol = (arr: number[][]): number[] => {
  let res: number[] = [];
  arr.forEach((row) => {
    res.push(row[row.length - 1] as number);
  });
  return res;
};

export const getLastRow = (arr: number[][]): number[] => {
  return arr[arr.length - 1];
};

export const getTotal = (arr: number[][]): number => {
  const lstRow = getLastRow(arr)
  return lstRow[lstRow.length - 1];
};

export const listDivide = (lst1: number[], lst2: number[]): number[] => {
  return lst1.map((val1, index) => lst2[index] === 0 ? 0 : val1 / lst2[index] )
}