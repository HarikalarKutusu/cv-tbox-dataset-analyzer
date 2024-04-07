import { ScaleType } from "recharts/types/util/types";
import {
  CROSSTAB_ROW_TYPE,
  DATASET_INFO_ROW_TYPE,
  DATASET_INFO_VIEW_TYPE,
  IFreqTableRow,
} from "./tableHelper";

export const GRAPH_COLORS = [
  "#4e79a7",
  "#f28e2c",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc949",
  "#af7aa1",
  "#ff9da7",
  "#9c755f",
  "#bab0ab",
];

export type CHART_TYPES =
  | "area"
  | "bar"
  | "line"
  | "composed"
  | "pie"
  | "radar"
  | "radialbar"
  | "scatter"
  | "funnel";

export type ALGORITM_TYPE = "" | "s1" | "s5" | "s99" | "v1" | "vw" | "vx";
export const ALGORITMS: ALGORITM_TYPE[] = ["s1", "s5", "s99", "v1", "vw", "vx"];

export type SPLIT_TYPE =
  | "clips"
  | "validated"
  | "invalidated"
  | "other"
  | "train"
  | "dev"
  | "test";
export const BUCKETS: SPLIT_TYPE[] = ["clips", "validated", "invalidated", "other"];
export const TRAINING_SPLITS: SPLIT_TYPE[] = ["train", "dev", "test"];
export const SPLITS_I18N: string[] = ["col.buckets_train", "col.buckets_dev", "col.buckets_test"];


export type GRAPH_VIEW_TYPE = {
  view: DATASET_INFO_VIEW_TYPE;
  data: "dataset" | "crosstab";
  crosstabField?: string;
  algos: ALGORITM_TYPE[];
  splits: SPLIT_TYPE[];
  type: CHART_TYPES;
  xKey: string;
  yKeys: string[];
  seriesNames: string[];
  stacked?: boolean;
  title?: string;
  subTitle?: string;
  fillPercent?: boolean;
};

export interface ICrossTabGraphProps {
  data: CROSSTAB_ROW_TYPE[];
  gd: GRAPH_VIEW_TYPE;
  cnt: number;
}

export interface IDatasetGraphProps {
  data: DATASET_INFO_ROW_TYPE[];
  gd: GRAPH_VIEW_TYPE;
  cnt: number;
}

export interface IAppChartProps {
  data: DATASET_INFO_ROW_TYPE[] | CROSSTAB_ROW_TYPE[];
  xKey: string;
  // yKey?: string;
  yKeys: string[];
  seriesNames: string[];
  stacked?: boolean;
  title?: string;
  subTitle?: string;
  fillPercent?: boolean;
  cnt: number;
}

export interface IFreqChartProps {
  data: IFreqTableRow[];
  xKey: string;
  yKey: string;
  seriesName: string;
  yScale: ScaleType;
  mean?: number;
  median?: number;
  std?: number;
  title?: string;
  subTitle?: string;
  isXNumber?: boolean;
  cnt?: number;
}

export const GRAPH_DATA: GRAPH_VIEW_TYPE[] = [
  // view = general
  {
    view: "general",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["dur_total"],
    seriesNames: ["col.duration_total"],
    subTitle: "col.duration_total",
  },
  {
    view: "general",
    data: "crosstab",
    crosstabField: "dur_total",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "bar",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    stacked: true,
    subTitle: "col.duration_total",
  },
  {
    view: "general",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["clips"],
    seriesNames: ["col.clips"],
    subTitle: "col.clips",
  },
  {
    view: "general",
    data: "crosstab",
    crosstabField: "clips",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "bar",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    stacked: true,
    subTitle: "col.clips",
  },
  {
    view: "general",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["uq_v"],
    seriesNames: ["col.unique_voices"],
    subTitle: "col.unique_voices",
  },
  {
    view: "general",
    data: "crosstab",
    crosstabField: "uq_v",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "bar",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    stacked: true,
    subTitle: "col.unique_voices",
  },
  {
    view: "general",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["uq_s"],
    seriesNames: ["col.unique_sentences"],
    subTitle: "col.unique_sentences",
  },
  {
    view: "general",
    data: "crosstab",
    crosstabField: "uq_s",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "bar",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    stacked: true,
    subTitle: "col.unique_sentences",
  },
  // view = duration
  {
    view: "duration",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["dur_total"],
    seriesNames: ["col.duration_total"],
    subTitle: "col.duration_total",
  },
  {
    view: "duration",
    data: "crosstab",
    crosstabField: "dur_total",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "bar",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    stacked: true,
    subTitle: "col.duration_total",
  },
  {
    view: "duration",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["dur_avg"],
    seriesNames: ["col.duration_avg"],
    subTitle: "col.duration_avg",
  },
  {
    view: "duration",
    data: "crosstab",
    crosstabField: "dur_avg",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "area",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    // stacked: true,
    subTitle: "col.duration_avg",
  },
  {
    view: "duration",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["dur_med"],
    seriesNames: ["col.duration_med"],
    subTitle: "col.duration_med",
  },
  {
    view: "duration",
    data: "crosstab",
    crosstabField: "dur_med",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "area",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    // stacked: true,
    subTitle: "col.duration_med",
  },
  // view = voices
  {
    view: "voices",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["uq_v"],
    seriesNames: ["col.unique_voices"],
    subTitle: "col.unique_voices",
  },
  {
    view: "voices",
    data: "crosstab",
    crosstabField: "uq_v",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "bar",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    stacked: true,
    subTitle: "col.unique_voices",
  },
  {
    view: "voices",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["v_avg"],
    seriesNames: ["col.voice_avg"],
    subTitle: "col.voice_avg",
  },
  {
    view: "voices",
    data: "crosstab",
    crosstabField: "v_avg",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "line",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    // stacked: true,
    subTitle: "col.voice_avg",
  },
  {
    view: "voices",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["v_med"],
    seriesNames: ["col.voice_med"],
    subTitle: "col.voice_med",
  },
  {
    view: "voices",
    data: "crosstab",
    crosstabField: "v_med",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "line",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    // stacked: true,
    subTitle: "col.voice_med",
  },
  // view = gender
  {
    view: "gender",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["calc_genders_male_per"],
    seriesNames: ["calc.male_percentage"],
    subTitle: "calc.male_percentage",
    fillPercent: true,
  },
  {
    view: "gender",
    data: "crosstab",
    crosstabField: "calc_genders_male_per",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "line",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    // stacked: true,
    subTitle: "calc.male_percentage",
    fillPercent: true,
  },
  {
    view: "gender",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["calc_genders_female_per"],
    seriesNames: ["calc.female_percentage"],
    subTitle: "calc.female_percentage",
    fillPercent: true,
  },
  {
    view: "gender",
    data: "crosstab",
    crosstabField: "calc_genders_female_per",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "line",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    // stacked: true,
    subTitle: "calc.female_percentage",
    fillPercent: true,
  },
  {
    view: "gender",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["calc_genders_fm_ratio"],
    seriesNames: ["calc.fm_ratio"],
    subTitle: "calc.fm_ratio",
  },
  {
    view: "gender",
    data: "crosstab",
    crosstabField: "calc_genders_fm_ratio",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "line",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    // stacked: true,
    subTitle: "calc.fm_ratio",
  },
  {
    view: "gender",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["calc_genders_uq_male"],
    seriesNames: ["calc.genders_uq_male"],
    subTitle: "calc.genders_uq_male",
  },
  {
    view: "gender",
    data: "crosstab",
    crosstabField: "calc_genders_uq_male",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "line",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    // stacked: true,
    subTitle: "calc.genders_uq_male",
  },
  {
    view: "gender",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["calc_genders_uq_female"],
    seriesNames: ["calc.genders_uq_female"],
    subTitle: "calc.genders_uq_female",
  },
  {
    view: "gender",
    data: "crosstab",
    crosstabField: "calc_genders_uq_female",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "line",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    // stacked: true,
    subTitle: "calc.genders_uq_female",
  },
  {
    view: "gender",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["calc_genders_fm_uq_ratio"],
    seriesNames: ["calc.fm_uq_ratio"],
    subTitle: "calc.fm_uq_ratio",
  },
  {
    view: "gender",
    data: "crosstab",
    crosstabField: "calc_genders_fm_uq_ratio",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "line",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    // stacked: true,
    subTitle: "calc.fm_uq_ratio",
  },
  // view = age
  {
    view: "age",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["calc_age_0_39", "calc_age_40_69", "calc_age_70_99"],
    seriesNames: ["calc.age_0_39", "calc.age_40_69", "calc.age_70_99"],
    // stacked: true,
    subTitle: "graph.subtitle.age_groups",
    fillPercent: true,
  },
  {
    view: "age",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["calc_age_uq_0_39", "calc_age_uq_40_69", "calc_age_uq_70_99"],
    seriesNames: ["calc.age_uq_0_39", "calc.age_uq_40_69", "calc.age_uq_70_99"],
    // stacked: true,
    subTitle: "graph.subtitle.uq_age_groups",
    fillPercent: true,
  },
  {
    view: "age",
    data: "crosstab",
    crosstabField: "calc_age_0_39",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "bar",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    // stacked: true,
    subTitle: "graph.subtitle.age_group_0_39",
    fillPercent: true,
  },
  {
    view: "age",
    data: "crosstab",
    crosstabField: "calc_age_uq_0_39",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "bar",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    // stacked: true,
    subTitle: "graph.subtitle.uq_age_group_0_39",
    fillPercent: true,
  },
  {
    view: "age",
    data: "crosstab",
    crosstabField: "calc_age_40_69",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "bar",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    // stacked: true,
    subTitle: "graph.subtitle.age_group_40_69",
    fillPercent: true,
  },
  {
    view: "age",
    data: "crosstab",
    crosstabField: "calc_age_uq_40_69",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "bar",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    // stacked: true,
    subTitle: "graph.subtitle.uq_age_group_40_69",
    fillPercent: true,
  },
  {
    view: "age",
    data: "crosstab",
    crosstabField: "calc_age_70_99",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "bar",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    // stacked: true,
    subTitle: "graph.subtitle.age_group_70_99",
    fillPercent: true,
  },
  {
    view: "age",
    data: "crosstab",
    crosstabField: "calc_age_uq_70_99",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "bar",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    // stacked: true,
    subTitle: "graph.subtitle.uq_age_group_70_99",
    fillPercent: true,
  },
  // votes

  // sentences
  {
    view: "sentences",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["uq_s"],
    seriesNames: ["col.unique_sentences"],
    subTitle: "col.unique_sentences",
  },
  {
    view: "sentences",
    data: "crosstab",
    crosstabField: "uq_s",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "line",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    // stacked: true,
    subTitle: "col.unique_sentences",
  },
  {
    view: "sentences",
    data: "dataset",
    algos: [""],
    splits: BUCKETS,
    type: "bar",
    xKey: "sp",
    yKeys: ["s_avg"],
    seriesNames: ["col.sentences_avg"],
    subTitle: "col.sentences_avg",
  },
  {
    view: "sentences",
    data: "crosstab",
    crosstabField: "s_avg",
    algos: ALGORITMS,
    splits: TRAINING_SPLITS,
    type: "line",
    xKey: "alg",
    yKeys: TRAINING_SPLITS,
    seriesNames: SPLITS_I18N,
    // stacked: true,
    subTitle: "col.sentences_avg",
  },
];
