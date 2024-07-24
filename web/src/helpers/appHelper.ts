//
// App related / app-wide stuff
//
import { CV_LANGUAGE_ROW } from "./cvHelper";
import { SUPPORT_MATRIX_ROW_TYPE } from "./tableHelper";

// App Version
import packageJson from "./../../package.json";
export const appVersion: string = packageJson.version;
export const isAlpha: boolean = appVersion.endsWith("a");
export const isBeta: boolean = appVersion.endsWith("b");

//
// Static Data Api
//
export const ANALYZER_DATA_URL = isBeta
  ? "https://static.cv-toolbox.web.tr/public/cv-processed-beta/analyzer"
  : "https://static.cv-toolbox.web.tr/public/cv-processed/analyzer";
export const CV_DATA_URL =
  "https://static.cv-toolbox.web.tr/public/cv-api-cache";

// LoaderDataType
export interface ILoaderData {
  cvLanguages: CV_LANGUAGE_ROW[] | null;
  analyzerConfig: CONFIG_TYPE | null;
  supportMatrix: SUPPORT_MATRIX_ROW_TYPE[] | null;
}

// config

export type CONFIG_TYPE = {
  date: string;
  cv_versions: string[];
  cv_dates: string[];
  cv_locales: string[];
  algorithms: string[];
  bins_duration: number[];
  bins_voices: number[];
  bins_votes_up: number[];
  bins_votes_down: number[];
  bins_sentences: number[];
  cs_threshold: number;
  bins_cs_low: number[];
  bins_cs_high: number[];
  ch_threshold: number;
  bins_chars_short: number[];
  bins_chars_long: number[];
  bins_words: number[];
  bins_tokens: number[];
  bins_reported: number[];
  bins_reasons: string[];
};
// Versioning
// export const appVersion = "v0.8.2b";
// export const appDataDate = CONF.date;

// URLs
export const appCommonVoiceURL = "https://commonvoice.mozilla.org/";
export const appGithubURL =
  "https://github.com/HarikalarKutusu/cv-tbox-dataset-analyzer";
export const appLicenseURL =
  "https://github.com/HarikalarKutusu/cv-tbox-dataset-analyzer/blob/main/LICENSE";
export const appMetadataViewerURL = "https://cv-metadata-viewer.netlify.app/";

// Fisher-Yates (aka Knuth) Shuffle
export const shuffle = (arr: any[]): any[] => {
  let currentIndex = arr.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
};

export const cleanFn = (s: string | undefined): string => {
  if (!s) return "";
  const toReplace = [
    " ",
    "?",
    "[",
    "]",
    "/",
    "\\",
    "=",
    "<",
    ">",
    ":",
    ";",
    ",",
    "'",
    '"',
    "&",
    "$",
    "#",
    "*",
    "(",
    ")",
    "|",
    "~",
    "`",
    "!",
    "{",
    "}",
    "%",
    "+",
    String.fromCharCode(0),
  ];
  let fn = s.toLowerCase();
  toReplace.forEach((ch) => (fn = fn.replaceAll(ch, "_")));
  return fn;
};
