// State management / store using zustand
import create, { StoreApi, UseBoundStore } from "zustand";

// App
import {
  DATASET_INFO_ROW_TYPE, DATASET_INFO_VIEW_TYPE, SUPPORT_MATRIX_ROW_TYPE,
  // CV_METADATATABLE_TYPE,
  // TOTALS_TABLE_TYPE,
} from "../helpers/tableHelper";
import {
  LanguageCodesType,
  DEFAULT_UI_LOCALE,
} from "../helpers/localeHelper";

export type StoreType = {
  // Init Done
  initDone: boolean;
  setInitDone: (status: boolean) => void;

  // UI language
  langCode: LanguageCodesType;
  setLangCode: (langCode: LanguageCodesType) => void;

  // Support Matrix
  matrixLoaded: boolean;
  setMatrixLoaded: (status: boolean) => void;

  // Support Matrix
  supportMatrix: SUPPORT_MATRIX_ROW_TYPE[];
  setSupportMatrix: (matrix: SUPPORT_MATRIX_ROW_TYPE[]) => void;

  // Which Dataset is selected? Kept in "<lc>_<ver>" format
  // TODO : Expand to multiple datasets for comparison
  selectedDataset: string;
  setSelectedDataset: (dsver: string) => void;

  // Split Stats
  datasetInfo: DATASET_INFO_ROW_TYPE[] | undefined;
  setDatasetInfo: (di: DATASET_INFO_ROW_TYPE[] | undefined) => void;

  // Table View (same as tabs in Analyzer)
  datasetInfoView: DATASET_INFO_VIEW_TYPE;
  setDatasetInfoView: (view: DATASET_INFO_VIEW_TYPE) => void;

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

    // Support Matrix
    matrixLoaded: false,
    setMatrixLoaded: (status) =>
      set((state) => ({ ...state, matrixLoaded: status })),

    // Support Matrix
    supportMatrix: [],
    setSupportMatrix: (matrix) =>
      set((state) => ({ ...state, supportMatrix: matrix })),

    // Which Dataset is selected? Kept in "<lc>_<ver>" format
    // TODO : Expand to multiple datasets for comparison
    selectedDataset: "",
    setSelectedDataset: (dsver: string) =>
      set((state) => ({ ...state, selectedDataset: dsver })),

    // Split Stats
    datasetInfo: undefined,
    setDatasetInfo: (dt) => set((state) => ({ ...state, datasetInfo: dt })),

    // Table View (same as tabs in Analyzer)
    datasetInfoView: "general",
    setDatasetInfoView: (view: DATASET_INFO_VIEW_TYPE) =>
      set((state) => ({ ...state, datasetInfoView: view })),

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
