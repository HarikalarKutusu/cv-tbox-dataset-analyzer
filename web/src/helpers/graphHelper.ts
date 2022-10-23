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
    seriesNames: ["col.total_locales"],
  },
  {
    view: "totals",
    data: "totals",
    type: "bar",
    xKey: "version",
    yKeys: ["total_users"],
    seriesNames: ["col.total_users"],
  },
  {
    view: "totals",
    data: "totals",
    type: "bar",
    xKey: "version",
    yKeys: ["total_clips"],
    seriesNames: ["col.total_clips"],
  },
  {
    view: "totals",
    data: "totals",
    type: "bar",
    xKey: "version",
    yKeys: ["total_totalHrs", "total_validHrs"],
    seriesNames: ["col.total_totalHrs", "col.total_validHrs"],
  },
  // view = main
  {
    view: "main",
    data: "metadata",
    type: "bar",
    xKey: "version",
    yKeys: ["clips"],
    seriesNames: ["col.clips"],
  },
  {
    view: "main",
    data: "metadata",
    type: "bar",
    xKey: "version",
    yKeys: ["users"],
    seriesNames: ["col.users"],
  },
  {
    view: "main",
    data: "metadata",
    type: "bar",
    xKey: "version",
    yKeys: ["totalHrs", "validHrs"],
    seriesNames: ["col.totalHrs", "col.validHrs"],
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
    seriesNames: ["col.avgDurationSecs"],
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
      "col.buckets_validated",
      "col.buckets_invalidated",
      "col.buckets_other",
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
      "col.buckets_train",
      "col.buckets_dev",
      "col.buckets_test",
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
    seriesNames: ["col.users"],
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
      "col.ages_teens",
      "col.ages_twenties",
      "col.ages_thirties",
      "col.ages_fourties",
      "col.ages_fifties",
      "col.ages_sixties",
      "col.ages_seventies",
      "col.ages_eighties",
      "col.ages_nineties",
      // "col.ages_nodata",
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
      "col.genders_male",
      "col.genders_female",
      "col.genders_other",
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