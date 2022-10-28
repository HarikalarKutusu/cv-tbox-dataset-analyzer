// App related / app-wide stuff

export const appVersion = "v0.4.1b";
export const appDataDate = "2022-10-22";
export const appCopyrightText = "Copyright";

// URLs
export const appCommonVoiceURL = "https://commonvoice.mozilla.org/";
export const appGithubURL =
  "https://github.com/HarikalarKutusu/cv-tbox-dataset-analyzer";
export const appLicenseURL =
  "https://github.com/HarikalarKutusu/cv-tbox-dataset-analyzer/blob/main/LICENSE";

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

export const cleanFn = (s: string): string => {
  const toReplace = [
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
