import { DATASET_INFO_VIEW_TYPE } from "./tableHelper";

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

export type GRAPH_VIEW_TYPE = {
  view: DATASET_INFO_VIEW_TYPE;
  data: "dataset" | "text-corpus";
  type: CHART_TYPES;
  stacked?: boolean;
  xKey: string;
  yKeys: string[];
  seriesNames: string[];
};
/*
export const GRAPH_DATA: GRAPH_VIEW_TYPE[] = [
  // view = totals
  {
    view: "totals",
    data: "totals",
    type: "bar",
    xKey: "version",
    yKeys: ["total_locales"],
    seriesNames: ["colnames.total_locales"],
  },
  {
    view: "totals",
    data: "totals",
    type: "bar",
    xKey: "version",
    yKeys: ["total_users"],
    seriesNames: ["colnames.total_users"],
  },
  {
    view: "totals",
    data: "totals",
    type: "bar",
    xKey: "version",
    yKeys: ["total_clips"],
    seriesNames: ["colnames.total_clips"],
  },
  {
    view: "totals",
    data: "totals",
    type: "bar",
    xKey: "version",
    yKeys: ["total_totalHrs", "total_validHrs"],
    seriesNames: ["colnames.total_totalHrs", "colnames.total_validHrs"],
  },
  // view = main
  {
    view: "main",
    data: "metadata",
    type: "bar",
    xKey: "version",
    yKeys: ["clips"],
    seriesNames: ["colnames.clips"],
  },
  {
    view: "main",
    data: "metadata",
    type: "bar",
    xKey: "version",
    yKeys: ["users"],
    seriesNames: ["colnames.users"],
  },
  {
    view: "main",
    data: "metadata",
    type: "bar",
    xKey: "version",
    yKeys: ["totalHrs", "validHrs"],
    seriesNames: ["colnames.totalHrs", "colnames.validHrs"],
  },
  {
    view: "main",
    data: "metadata",
    type: "bar",
    xKey: "version",
    yKeys: ["validRecsPercentage"],
    seriesNames: ["calculated.valid_recs_percentage"],
  },
  // view = calculated
  {
    view: "calculated",
    data: "metadata",
    type: "bar",
    xKey: "version",
    yKeys: ["avgDurationSecs"],
    seriesNames: ["colnames.avgDurationSecs"],
  },
  {
    view: "calculated",
    data: "metadata",
    type: "bar",
    xKey: "version",
    yKeys: ["validatedHrsPercentage"],
    seriesNames: ["calculated.valid_hrs_percentage"],
  },
  {
    view: "calculated",
    data: "metadata",
    type: "bar",
    xKey: "version",
    yKeys: ["invalidRecsPercentage"],
    seriesNames: ["calculated.invalid_recs_percentage"],
  },
  {
    view: "calculated",
    data: "metadata",
    type: "bar",
    xKey: "version",
    yKeys: ["reportedPercentage"],
    seriesNames: ["calculated.reported_percentage"],
  },
  // view = buckets-main
  {
    view: "buckets-main",
    data: "metadata",
    type: "bar",
    xKey: "version",
    yKeys: ["buckets_validated", "buckets_invalidated", "buckets_other"],
    seriesNames: [
      "colnames.buckets_validated",
      "colnames.buckets_invalidated",
      "colnames.buckets_other",
    ],
  },
  {
    view: "buckets-main",
    data: "metadata",
    type: "area",
    stacked: true,
    xKey: "version",
    yKeys: [
      "validRecsPercentage",
      "invalidRecsPercentage",
      "otherRecsPercentage",
    ],
    seriesNames: [
      "calculated.valid_recs_percentage",
      "calculated.invalid_recs_percentage",
      "calculated.other_recs_percentage",
    ],
  },
  // view = buckets-model
  {
    view: "buckets-model",
    data: "metadata",
    type: "bar",
    xKey: "version",
    yKeys: ["buckets_train", "buckets_dev", "buckets_test"],
    seriesNames: [
      "colnames.buckets_train",
      "colnames.buckets_dev",
      "colnames.buckets_test",
    ],
  },
  {
    view: "buckets-model",
    data: "metadata",
    type: "bar",
    stacked: true,
    xKey: "version",
    yKeys: ["estTrainHrs", "estDevHrs", "estTestHrs"],
    seriesNames: [
      "calculated.est_train_hrs",
      "calculated.est_dev_hrs",
      "calculated.est_test_hrs",
    ],
  },
  {
    view: "buckets-model",
    data: "metadata",
    type: "area",
    xKey: "version",
    yKeys: ["percentageUsed"],
    seriesNames: ["calculated.percentage_used"],
  },
  // view = users
  {
    view: "users",
    data: "metadata",
    type: "bar",
    xKey: "version",
    yKeys: ["users"],
    seriesNames: ["colnames.users"],
  },
  {
    view: "users",
    data: "metadata",
    type: "line",
    xKey: "version",
    yKeys: ["avgRecsPerUser"],
    seriesNames: ["calculated.avg_recs_per_user"],
  },
  {
    view: "users",
    data: "metadata",
    type: "line",
    xKey: "version",
    yKeys: ["avgSecsPerUser"],
    seriesNames: ["calculated.avg_secs_per_user"],
  },
  // view = ages
  {
    view: "ages",
    data: "metadata",
    type: "bar",
    stacked: true,
    xKey: "version",
    yKeys: [
      "ages_teens",
      "ages_twenties",
      "ages_thirties",
      "ages_fourties",
      "ages_fifties",
      "ages_sixties",
      "ages_seventies",
      "ages_eighties",
      "ages_nineties",
      // "ages_nodata",
    ],
    seriesNames: [
      "colnames.ages_teens",
      "colnames.ages_twenties",
      "colnames.ages_thirties",
      "colnames.ages_fourties",
      "colnames.ages_fifties",
      "colnames.ages_sixties",
      "colnames.ages_seventies",
      "colnames.ages_eighties",
      "colnames.ages_nineties",
      // "colnames.ages_nodata",
    ],
  },
  // view = genders
  {
    view: "genders",
    data: "metadata",
    type: "bar",
    stacked: true,
    xKey: "version",
    yKeys: ["genders_male", "genders_female", "genders_other"],
    seriesNames: [
      "colnames.genders_male",
      "colnames.genders_female",
      "colnames.genders_other",
    ],
  },
  {
    view: "genders",
    data: "metadata",
    type: "area",
    stacked: true,
    xKey: "version",
    yKeys: ["malePercentage", "femalePercentage"],
    seriesNames: ["calculated.male_percentage", "calculated.female_percentage"],
  },
  {
    view: "genders",
    data: "metadata",
    type: "line",
    xKey: "version",
    yKeys: ["fmRatio"],
    seriesNames: ["calculated.fm_ratio"],
  },
];
*/