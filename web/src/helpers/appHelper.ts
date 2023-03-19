//
// App related / app-wide stuff
//
import config from "./../assets/data/$config.json";

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
  bins_chars: number[];
  bins_words: number[];
  bins_tokens: number[];
  bins_reported: number[];
  bins_reasons: string[];
};
export const CONF: CONFIG_TYPE = (config.data as CONFIG_TYPE[])[0];

// Versioning
export const appVersion = "v0.7.5b";
export const appDataDate = CONF.date;

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
