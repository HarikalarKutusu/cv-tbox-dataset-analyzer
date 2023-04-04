// State management / store using zustand
import { create, StoreApi, UseBoundStore } from "zustand";

// App
import { DATASET_INFO_ROW_TYPE } from "../helpers/tableHelper";

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

  //
  // Smaller Data
  //

  // Which Dataset is selected? Kept in "<lc>_<ver>" format
  // TODO : Expand to multiple datasets for comparison
  selectedDataset: string;
  setSelectedDataset: (dsver: string) => void;

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

    //
    // Smaller Data
    //

    // Which Dataset is selected? Kept in "<lc>_<ver>" format
    // TODO : Expand to multiple datasets for comparison
    selectedDataset: "",
    setSelectedDataset: (dsver) =>
      set((state) => ({ ...state, selectedDataset: dsver })),

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
