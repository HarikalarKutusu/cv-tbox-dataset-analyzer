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

export type ALGORITM_TYPE = "" | "s1" | "s99" | "v1";

export type SPLIT_TYPE =
  | "clips"
  | "validated"
  | "invalidated"
  | "other"
  | "train"
  | "dev"
  | "test";

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
    splits: ["clips", "validated", "invalidated", "other"],
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
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "bar",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    stacked: true,
    subTitle: "col.duration_total",
  },
  {
    view: "general",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
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
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "bar",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    stacked: true,
    subTitle: "col.clips",
  },
  {
    view: "general",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
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
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "bar",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    stacked: true,
    subTitle: "col.unique_voices",
  },
  {
    view: "general",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
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
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "bar",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    stacked: true,
    subTitle: "col.unique_sentences",
  },
  // view = duration
  {
    view: "duration",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
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
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "bar",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    stacked: true,
    subTitle: "col.duration_total",
  },
  {
    view: "duration",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
    type: "bar",
    xKey: "sp",
    yKeys: ["dur_mean"],
    seriesNames: ["col.duration_mean"],
    subTitle: "col.duration_mean",
  },
  {
    view: "duration",
    data: "crosstab",
    crosstabField: "dur_mean",
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "area",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    // stacked: true,
    subTitle: "col.duration_mean",
  },
  {
    view: "duration",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
    type: "bar",
    xKey: "sp",
    yKeys: ["dur_median"],
    seriesNames: ["col.duration_median"],
    subTitle: "col.duration_median",
  },
  {
    view: "duration",
    data: "crosstab",
    crosstabField: "dur_median",
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "area",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    // stacked: true,
    subTitle: "col.duration_median",
  },
  // view = voices
  {
    view: "voices",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
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
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "bar",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    stacked: true,
    subTitle: "col.unique_voices",
  },
  {
    view: "voices",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
    type: "bar",
    xKey: "sp",
    yKeys: ["v_mean"],
    seriesNames: ["col.voice_mean"],
    subTitle: "col.voice_mean",
  },
  {
    view: "voices",
    data: "crosstab",
    crosstabField: "v_mean",
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "line",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    // stacked: true,
    subTitle: "col.voice_mean",
  },
  {
    view: "voices",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
    type: "bar",
    xKey: "sp",
    yKeys: ["v_median"],
    seriesNames: ["col.voice_median"],
    subTitle: "col.voice_median",
  },
  {
    view: "voices",
    data: "crosstab",
    crosstabField: "v_median",
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "line",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    // stacked: true,
    subTitle: "col.voice_median",
  },
  // view = gender
  {
    view: "gender",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
    type: "bar",
    xKey: "sp",
    yKeys: ["calc_genders_male_per"],
    seriesNames: ["calc.male_percentage"],
    subTitle: "calc.male_percentage",
  },
  {
    view: "gender",
    data: "crosstab",
    crosstabField: "calc_genders_male_per",
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "line",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    // stacked: true,
    subTitle: "calc.male_percentage",
  },
  {
    view: "gender",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
    type: "bar",
    xKey: "sp",
    yKeys: ["calc_genders_female_per"],
    seriesNames: ["calc.female_percentage"],
    subTitle: "calc.female_percentage",
  },
  {
    view: "gender",
    data: "crosstab",
    crosstabField: "calc_genders_female_per",
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "line",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    // stacked: true,
    subTitle: "calc.female_percentage",
  },
  {
    view: "gender",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
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
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "line",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    // stacked: true,
    subTitle: "calc.fm_ratio",
  },
  {
    view: "gender",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
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
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "line",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    // stacked: true,
    subTitle: "calc.genders_uq_male",
  },
  {
    view: "gender",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
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
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "line",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    // stacked: true,
    subTitle: "calc.genders_uq_female",
  },
  {
    view: "gender",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
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
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "line",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    // stacked: true,
    subTitle: "calc.fm_uq_ratio",
  },
  // view = age
  {
    view: "age",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
    type: "bar",
    xKey: "sp",
    yKeys: ["calc_age_0_39", "calc_age_40_69", "calc_age_70_99"],
    seriesNames: ["calc.age_0_39", "calc.age_40_69", "calc.age_70_99"],
    // stacked: true,
    subTitle: "graph.subtitle.age_groups",
  },
  {
    view: "age",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
    type: "bar",
    xKey: "sp",
    yKeys: ["calc_age_uq_0_39", "calc_age_uq_40_69", "calc_age_uq_70_99"],
    seriesNames: ["calc.age_uq_0_39", "calc.age_uq_40_69", "calc.age_uq_70_99"],
    // stacked: true,
    subTitle: "graph.subtitle.uq_age_groups",
  },
  {
    view: "age",
    data: "crosstab",
    crosstabField: "calc_age_0_39",
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "bar",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    // stacked: true,
    subTitle: "graph.subtitle.age_group_0_39",
  },
  {
    view: "age",
    data: "crosstab",
    crosstabField: "calc_age_uq_0_39",
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "bar",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    // stacked: true,
    subTitle: "graph.subtitle.uq_age_group_0_39",
  },
  {
    view: "age",
    data: "crosstab",
    crosstabField: "calc_age_40_69",
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "bar",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    // stacked: true,
    subTitle: "graph.subtitle.age_group_40_69",
  },
  {
    view: "age",
    data: "crosstab",
    crosstabField: "calc_age_uq_40_69",
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "bar",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    // stacked: true,
    subTitle: "graph.subtitle.uq_age_group_40_69",
  },
  {
    view: "age",
    data: "crosstab",
    crosstabField: "calc_age_70_99",
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "bar",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    // stacked: true,
    subTitle: "graph.subtitle.age_group_70_99",
  },
  {
    view: "age",
    data: "crosstab",
    crosstabField: "calc_age_uq_70_99",
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "bar",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    // stacked: true,
    subTitle: "graph.subtitle.uq_age_group_70_99",
  },
  // votes

  // sentences
  {
    view: "sentences",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
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
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "line",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    // stacked: true,
    subTitle: "col.unique_sentences",
  },
  {
    view: "sentences",
    data: "dataset",
    algos: [""],
    splits: ["clips", "validated", "invalidated", "other"],
    type: "bar",
    xKey: "sp",
    yKeys: ["s_mean"],
    seriesNames: ["col.sentences_mean"],
    subTitle: "col.sentences_mean",
  },
  {
    view: "sentences",
    data: "crosstab",
    crosstabField: "s_mean",
    algos: ["s1", "s99", "v1"],
    splits: ["train", "dev", "test"],
    type: "line",
    xKey: "alg",
    yKeys: ["train", "dev", "test"],
    seriesNames: ["col.buckets_train", "col.buckets_dev", "col.buckets_test"],
    // stacked: true,
    subTitle: "col.sentences_mean",
  },
];
