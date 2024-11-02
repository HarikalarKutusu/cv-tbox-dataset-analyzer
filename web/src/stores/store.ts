// State management / store using zustand
import { create, StoreApi, UseBoundStore } from "zustand";

// App
import {
  DATASET_INFO_ROW_TYPE,
  REPORTED_STATS_ROW_TYPE,
  TEXT_CORPUS_STATS_ROW_TYPE,
  CHAR_SPEED_ROW_TYPE,
  AUDIO_STATS_ROW_TYPE,
} from "../helpers/tableHelper";

import { LanguageCodesType, DEFAULT_UI_LOCALE } from "../helpers/localeHelper";

export type StoreType = {
  // Init Done
  initDone: boolean;
  setInitDone: (status: boolean) => void;

  // UI language
  langCode: LanguageCodesType;
  setLangCode: (langCode: LanguageCodesType) => void;

  //
  // Big Data which have calculated fields
  //

  // Dataset Info for selected dataset(lc, ver)
  datasetInfo: DATASET_INFO_ROW_TYPE[] | undefined;
  setDatasetInfo: (data: DATASET_INFO_ROW_TYPE[] | undefined) => void;

  // Reported Sentences data for selected language(lc) (combined all versions)
  reportedSentences: REPORTED_STATS_ROW_TYPE[] | undefined;
  setReportedSentences: (data: REPORTED_STATS_ROW_TYPE[] | undefined) => void;

  // Text Corpus data for selected language(lc) + version
  textCorpusStats: TEXT_CORPUS_STATS_ROW_TYPE[] | undefined;
  setTextCorpusStats: (data: TEXT_CORPUS_STATS_ROW_TYPE[] | undefined) => void;

  // Character Speed data for selected language(lc) + version
  charSpeed: CHAR_SPEED_ROW_TYPE[] | undefined;
  setCharSpeed: (data: CHAR_SPEED_ROW_TYPE[] | undefined) => void;

  // Character Speed data for selected language(lc) + version
  audioStats: AUDIO_STATS_ROW_TYPE[] | undefined;
  setAudioStats: (data: AUDIO_STATS_ROW_TYPE[] | undefined) => void;

  //
  // Smaller Data
  //

  // Which Language (lc) is selected?
  selectedLanguage: string | undefined;
  setSelectedLanguage: (lc: string | undefined) => void;

  // Which Dataset is selected? Kept in "<lc>_<ver>" format
  // TODO : Expand to multiple datasets for comparison
  selectedVersion: string | undefined;
  setSelectedVersion: (ver: string | undefined) => void;

  // selected version filter
  versionFilter: string[];
  setVersionFilter: (lst: string[]) => void;

  // selected language filter
  languageFilter: string[];
  setLanguageFilter: (lst: string[]) => void;
};

const useStore: UseBoundStore<StoreApi<StoreType>> = create<StoreType>(
  (set) => ({
    // Init Done
    initDone: false,
    setInitDone: (status) => set((state) => ({ ...state, initDone: status })),

    // language
    langCode: DEFAULT_UI_LOCALE,
    setLangCode: (langCode) =>
      set((state) => ({ ...state, langCode: langCode })),

    //
    // Big Data which have calculated fields
    //

    // Split Stats
    datasetInfo: undefined,
    setDatasetInfo: (data) => set((state) => ({ ...state, datasetInfo: data })),

    // Reported Sentences
    reportedSentences: undefined,
    setReportedSentences: (data) =>
      set((state) => ({ ...state, reportedSentences: data })),

    // Text Corpus Stats
    textCorpusStats: undefined,
    setTextCorpusStats: (data) =>
      set((state) => ({ ...state, textCorpusStats: data })),

    // Char Speed
    charSpeed: undefined,
    setCharSpeed: (data) => set((state) => ({ ...state, charSpeed: data })),

    // Audio Analysis Stats
    audioStats: undefined,
    setAudioStats: (data) => set((state) => ({ ...state, audioStats: data })),

    //
    // Smaller Data
    //

    // Which Language (lc) is selected?
    selectedLanguage: "",
    setSelectedLanguage: (lc) =>
      set((state) => ({ ...state, selectedLanguage: lc })),

    // Which Dataset is selected? Kept in "<lc>_<ver>" format
    // TODO : Expand to multiple datasets for comparison
    selectedVersion: "",
    setSelectedVersion: (ver) =>
      set((state) => ({ ...state, selectedVersion: ver })),

    // selected version filter
    versionFilter: [],
    setVersionFilter: (lst: string[]) =>
      set((state) => ({ ...state, versionFilter: lst })),

    // selected language filter
    languageFilter: [],
    setLanguageFilter: (lst: string[]) =>
      set((state) => ({ ...state, languageFilter: lst })),
  }),
);

export { useStore };
