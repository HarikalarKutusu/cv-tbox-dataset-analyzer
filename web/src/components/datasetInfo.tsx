// React
import { FC, memo, useEffect, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
// i10n
import intl from "react-intl-universal";
// MUI
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

// DataTable
import DataTable, {
  Direction,
  ExpanderComponentProps,
  TableColumn,
} from "react-data-table-component";

// Store
import { useStore } from "../stores/store";

// App
import { ANALYZER_DATA_URL, ILoaderData } from "./../helpers/appHelper";
import { CV_AGES, CV_GENDERS } from "../helpers/cvHelper";

import {
  getArrLastCol,
  getArrLastRow,
  getArrTotal,
  listDivide,
  sumArrays,
  expandTable,
  TABLE_STYLE,
  DATASET_INFO_ROW_TYPE,
  DATASET_INFO_VIEW_TYPE,
  downloadCSV,
  IFreqTableProps,
  // addArrTotals,
  //  DATASET_INFO_VIEW_TYPES,
} from "../helpers/tableHelper";

import { FreqTable } from "./freqTable";

//
// JSX
//

export type DatasetInfoProps = {
  lc?: string;
  ver?: string;
  view?: DATASET_INFO_VIEW_TYPE;
};

export const DataSetInfo = (props: DatasetInfoProps): JSX.Element => {
  const { lc, ver, view } = props;

  const { initDone } = useStore();
  const { langCode } = useStore();

  const { selectedLanguage, setSelectedLanguage } = useStore();
  const { selectedVersion, setSelectedVersion } = useStore();
  const { datasetInfo, setDatasetInfo } = useStore();
  const { setReportedSentences, setTextCorpusStats, setCharSpeed } = useStore();

  const CONF = (useLoaderData() as ILoaderData).analyzerConfig;

  const getColumns = (
    view: DATASET_INFO_VIEW_TYPE,
  ): TableColumn<DATASET_INFO_ROW_TYPE>[] => {
    const dec2 = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    const dec3 = { minimumFractionDigits: 3, maximumFractionDigits: 3 };

    const col_alg: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "alg",
      name: intl.get("col.algorithm"),
      sortable: true,
      center: true,
      width: "120px",
      selector: (row: DATASET_INFO_ROW_TYPE) => row.alg,
    };

    const col_sp: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "sp",
      name: intl.get("col.split"),
      sortable: true,
      right: true,
      width: "100px",
      selector: (row: DATASET_INFO_ROW_TYPE) => row.sp,
    };

    const col_clips: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "clips",
      name: intl.get("col.clips"),
      sortable: true,
      right: true,
      // width: "100px",
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.clips ? row.clips.toLocaleString(langCode) : "-",
    };

    const col_uq_v: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "uq_v",
      name: intl.get("col.unique_voices"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.uq_v ? row.uq_v.toLocaleString(langCode) : "-",
    };

    const col_uq_s: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "uq_s",
      name: intl.get("col.unique_sentences"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.uq_s ? row.uq_s.toLocaleString(langCode) : "-",
    };

    const col_uq_sl: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "uq_sl",
      name: intl.get("col.unique_sentences_lower"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.uq_sl ? row.uq_sl.toLocaleString(langCode) : "-",
    };

    const col_dur_total: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "dur_total",
      name: intl.get("col.duration_total"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.dur_total ? row.dur_total.toLocaleString(langCode, dec3) : "-",
    };

    const col_dur_avg: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "dur_avg",
      name: intl.get("col.duration_avg"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.dur_avg ? row.dur_avg.toLocaleString(langCode, dec3) : "-",
    };

    const col_dur_med: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "dur_med",
      name: intl.get("col.duration_med"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.dur_med ? row.dur_med.toLocaleString(langCode, dec3) : "-",
    };

    const col_dur_std: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "dur_std",
      name: intl.get("col.duration_std"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.dur_std ? row.dur_std.toLocaleString(langCode, dec3) : "-",
    };

    const col_v_avg: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "v_avg",
      name: intl.get("col.voice_avg"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.v_avg ? row.v_avg.toLocaleString(langCode, dec3) : "-",
    };

    const col_v_med: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "v_med",
      name: intl.get("col.voice_med"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.v_med ? row.v_med.toLocaleString(langCode, dec3) : "-",
    };

    const col_v_std: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "v_std",
      name: intl.get("col.voice_std"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.v_std ? row.v_std.toLocaleString(langCode, dec3) : "-",
    };

    const col_s_avg: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "s_avg",
      name: intl.get("col.sentences_avg"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.s_avg ? row.s_avg.toLocaleString(langCode, dec3) : "-",
    };

    const col_s_med: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "s_med",
      name: intl.get("col.sentences_med"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.s_med ? row.s_med.toLocaleString(langCode, dec3) : "-",
    };

    const col_s_std: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "s_std",
      name: intl.get("col.sentences_std"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.s_std ? row.s_std.toLocaleString(langCode, dec3) : "-",
    };

    // CALCULATED COLUMNS

    //
    // VOTES
    //
    const col_uv_sum: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "uv_sum",
      name: intl.get("col.uv_sum"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.uv_sum ? row.uv_sum.toLocaleString(langCode) : "-",
    };

    const col_dv_sum: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "dv_sum",
      name: intl.get("col.dv_sum"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.dv_sum ? row.dv_sum.toLocaleString(langCode) : "-",
    };

    const col_uv_avg: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "uv_avg",
      name: intl.get("col.uv_avg"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.uv_avg ? row.uv_avg.toLocaleString(langCode, dec2) : "-",
    };

    const col_uv_med: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "uv_med",
      name: intl.get("col.uv_med"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.uv_med ? row.uv_med.toLocaleString(langCode, dec2) : "-",
    };

    const col_uv_std: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "uv_std",
      name: intl.get("col.uv_std"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.uv_std ? row.uv_std.toLocaleString(langCode, dec2) : "-",
    };

    const col_dv_avg: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "dv_avg",
      name: intl.get("col.dv_avg"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.dv_avg ? row.dv_avg.toLocaleString(langCode, dec2) : "-",
    };

    const col_dv_med: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "dv_med",
      name: intl.get("col.dv_med"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.dv_med ? row.dv_med.toLocaleString(langCode, dec2) : "-",
    };

    const col_dv_std: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "dv_std",
      name: intl.get("col.dv_std"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.dv_std ? row.dv_std.toLocaleString(langCode, dec2) : "-",
    };

    //
    // DEMOGRAPHICS - GENDER
    //
    // number of male recordings
    const calc_genders_male: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_genders_male",
      name: intl.get("calc.genders_male"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_genders_male
          ? row.calc_genders_male.toLocaleString(langCode)
          : "-",
    };
    // number of female recordings
    const calc_genders_female: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_genders_female",
      name: intl.get("calc.genders_female"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_genders_female
          ? row.calc_genders_female.toLocaleString(langCode)
          : "-",
    };
    // ratio of female/male recordings
    const calc_genders_fm_ratio: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_genders_fm_ratio",
      name: intl.get("calc.fm_ratio"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_genders_fm_ratio
          ? row.calc_genders_fm_ratio.toLocaleString(langCode, dec3)
          : "-",
    };
    // male percentage in recordings
    const calc_genders_male_per: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_genders_male_per",
      name: intl.get("calc.male_percentage"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_genders_male_per
          ? row.calc_genders_male_per.toLocaleString(langCode, dec2)
          : "-",
    };
    // female percentage in recordings
    const calc_genders_female_per: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_genders_female_per",
      name: intl.get("calc.female_percentage"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_genders_female_per
          ? row.calc_genders_female_per.toLocaleString(langCode, dec2)
          : "-",
    };
    // Unique male voices
    const calc_genders_uq_male: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_genders_uq_male",
      name: intl.get("calc.genders_uq_male"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_genders_uq_male
          ? row.calc_genders_uq_male.toLocaleString(langCode)
          : "-",
    };
    // Unique female voices
    const calc_genders_uq_female: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_genders_uq_female",
      name: intl.get("calc.genders_uq_female"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_genders_uq_female
          ? row.calc_genders_uq_female.toLocaleString(langCode)
          : "-",
    };
    // ratio of female/male recordings
    const calc_genders_fm_uq_ratio: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_genders_fm_uq_ratio",
      name: intl.get("calc.fm_uq_ratio"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_genders_fm_uq_ratio
          ? row.calc_genders_fm_uq_ratio.toLocaleString(langCode, dec3)
          : "-",
    };
    //
    // DEMOGRAPHICS - AGE
    //
    // Percentage of age groups based on records
    const calc_age_0_39: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_age_0_39",
      name: intl.get("calc.age_0_39"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_age_0_39
          ? row.calc_age_0_39.toLocaleString(langCode, dec2)
          : "-",
    };
    const calc_age_40_69: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_age_40_69",
      name: intl.get("calc.age_40_69"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_age_40_69
          ? row.calc_age_40_69.toLocaleString(langCode, dec2)
          : "-",
    };
    const calc_age_70_99: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_age_70_99",
      name: intl.get("calc.age_70_99"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_age_70_99
          ? row.calc_age_70_99.toLocaleString(langCode, dec2)
          : "-",
    };
    // Percentage of age groups based on unique voices
    const calc_age_uq_0_39: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_age_uq_0_39",
      name: intl.get("calc.age_uq_0_39"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_age_uq_0_39
          ? row.calc_age_uq_0_39.toLocaleString(langCode, dec2)
          : "-",
    };
    const calc_age_uq_40_69: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_age_uq_40_69",
      name: intl.get("calc.age_uq_40_69"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_age_uq_40_69
          ? row.calc_age_uq_40_69.toLocaleString(langCode, dec2)
          : "-",
    };
    const calc_age_uq_70_99: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_age_uq_70_99",
      name: intl.get("calc.age_uq_70_99"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_age_uq_70_99
          ? row.calc_age_uq_70_99.toLocaleString(langCode, dec2)
          : "-",
    };

    // Combine them for views
    let res: TableColumn<DATASET_INFO_ROW_TYPE>[] = [];
    switch (view) {
      case "general":
        res = [col_alg, col_sp, col_dur_total, col_clips, col_uq_v, col_uq_s];
        break;
      case "duration":
        res = [
          col_alg,
          col_sp,
          col_dur_total,
          col_dur_avg,
          col_dur_med,
          col_dur_std,
        ];
        break;
      case "voices":
        res = [
          col_alg,
          col_sp,
          col_dur_total,
          col_uq_v,
          col_v_avg,
          col_v_med,
          col_v_std,
        ];
        break;
      case "gender":
        res = [
          col_alg,
          col_sp,
          col_clips,
          calc_genders_male,
          calc_genders_female,
          calc_genders_fm_ratio,
          calc_genders_male_per,
          calc_genders_female_per,
          col_uq_v,
          calc_genders_uq_male,
          calc_genders_uq_female,
          calc_genders_fm_uq_ratio,
        ];
        break;
      case "age":
        res = [
          col_alg,
          col_sp,
          col_clips,
          calc_age_0_39,
          calc_age_40_69,
          calc_age_70_99,
          col_uq_v,
          calc_age_uq_0_39,
          calc_age_uq_40_69,
          calc_age_uq_70_99,
        ];
        break;
      case "votes":
        res = [
          col_alg,
          col_sp,
          col_uv_sum,
          col_uv_avg,
          col_uv_med,
          col_uv_std,
          col_dv_sum,
          col_dv_avg,
          col_dv_med,
          col_dv_std,
        ];
        break;
      case "sentences":
        res = [
          col_alg,
          col_sp,
          col_uq_s,
          col_uq_sl,
          col_s_avg,
          col_s_med,
          col_s_std,
        ];
        break;
      // case "comperative":
      //   res = [col_alg, col_sp];
      //   break;
      // case "health":
      //   res = [col_alg, col_sp];
      //   break;
      default:
        break;
    }

    return res;
  };

  const paginationComponentOptions = {
    rowsPerPageText: intl.get("pagination.perpage"),
    rangeSeparatorText: intl.get("pagination.rangeseparator"),
    selectAllRowsItem: true,
    selectAllRowsItemText: intl.get("pagination.selectallrows"),
  };

  const ExpandedComponent: FC<
    ExpanderComponentProps<DATASET_INFO_ROW_TYPE>
  > = ({ data }) => {
    if (!CONF) return <></>;

    let expViews: IFreqTableProps[] = [];
    const title: string = "Common Voice " + lc + " v" + ver;

    switch (view) {
      case "general":
        break;
      case "duration":
        expViews = [
          {
            bins: CONF.bins_duration,
            values: data.dur_freq as number[],
            title: title,
            subTitle: intl.get("col.duration_distribution"),
            mean: data.dur_avg,
            median: data.dur_med,
            std: data.dur_std,
            addTotals: true,
            addPercentageColumn: true,
            dropLastFromGraph: true,
            // yScale: "linear",
          },
        ];
        break;
      case "voices":
        expViews = [
          {
            bins: CONF.bins_voices,
            values: data.v_freq as number[],
            title: title,
            subTitle: intl.get("col.voice_distribution"),
            mean: data.v_avg,
            median: data.v_med,
            std: data.v_std,
            addTotals: true,
            addPercentageColumn: true,
            dropLastFromGraph: true,
            // yScale: "linear",
          },
        ];
        break;
      case "gender":
        expViews = [
          {
            bins: CV_GENDERS as string[],
            values: getArrLastRow(data.dem_table as number[][]) as number[],
            title: title,
            subTitle: intl.get("tbl.gender_distribution"),
            addPercentageColumn: true,
            dropLastFromGraph: true,
            // yScale: "linear",
          },
          // {
          //   bins: CV_GENDERS as string[],
          //   values: getLastRow(data.dem_fix_r as number[][]) as number[],
          //   title: "Correction",
          //   dropLastFromGraph: true,
          // },
          // {
          //   bins: CV_GENDERS as string[],
          //   values: getLastRow(data.dem_ctable as number[][]) as number[],
          //   title: intl.get("tbl.gender_distribution"),
          //   dropLastFromGraph: true,
          // },
          {
            bins: CV_GENDERS as string[],
            values: getArrLastRow(data.dem_uq as number[][]) as number[],
            title: title,
            subTitle: intl.get("tbl.gender_uq_distribution"),
            addPercentageColumn: true,
            dropLastFromGraph: true,
            // yScale: "linear",
          },
          {
            bins: CV_GENDERS as string[],
            values: listDivide(
              getArrLastRow(data.dem_table as number[][]) as number[],
              getArrLastRow(data.dem_uq as number[][]) as number[],
            ),
            title: title,
            subTitle: intl.get("tbl.gender_recs_per_person"),
            dropLastFromGraph: true,
            // yScale: "linear",
          },
        ];
        break;
      case "age":
        expViews = [
          {
            bins: CV_AGES as string[],
            values: getArrLastCol(data.dem_table as number[][]) as number[],
            title: title,
            subTitle: intl.get("tbl.age_distribution"),
            addPercentageColumn: true,
            dropLastFromGraph: true,
            // yScale: "linear",
          },
          {
            bins: CV_AGES as string[],
            values: getArrLastCol(data.dem_uq as number[][]) as number[],
            title: title,
            subTitle: intl.get("tbl.age_uq_distribution"),
            addPercentageColumn: true,
            dropLastFromGraph: true,
            // yScale: "linear",
          },
          {
            bins: CV_AGES as string[],
            values: listDivide(
              getArrLastCol(data.dem_table as number[][]) as number[],
              getArrLastCol(data.dem_uq as number[][]) as number[],
            ),
            title: title,
            subTitle: intl.get("tbl.age_recs_per_person"),
            dropLastFromGraph: true,
            // yScale: "linear",
          },
        ];
        break;
      case "votes":
        expViews = [
          {
            bins: CONF.bins_votes_up,
            values: data.uv_freq as number[],
            title: title,
            subTitle: intl.get("tbl.up_votes"),
            mean: data.uv_avg,
            median: data.uv_med,
            std: data.uv_std,
            addPercentageColumn: true,
            addTotals: true,
            dropLastFromGraph: true,
            // yScale: "linear",
          },
          {
            bins: CONF.bins_votes_down,
            values: data.dv_freq as number[],
            title: title,
            subTitle: intl.get("tbl.down_votes"),
            mean: data.dv_avg,
            median: data.dv_med,
            std: data.dv_std,
            addPercentageColumn: true,
            addTotals: true,
            dropLastFromGraph: true,
            // yScale: "linear",
          },
        ];
        break;
      case "sentences":
        expViews = [
          {
            bins: CONF.bins_sentences,
            values: data.s_freq as number[],
            title: title,
            subTitle: intl.get("col.sentences_distribution"),
            mean: data.s_avg,
            median: data.s_med,
            std: data.s_std,
            addTotals: true,
            addPercentageColumn: true,
            dropLastFromGraph: true,
          },
        ];
        break;
      default:
    }

    return (
      <>
        {expViews.map((ev, index) => {
          return (
            <FreqTable
              key={"c_freq_" + index}
              bins={ev.bins}
              values={ev.values}
              title={title}
              subTitle={ev.subTitle}
              yScale={ev.yScale}
              mean={ev.mean}
              median={ev.median}
              std={ev.std}
              addTotals={ev.addTotals}
              addPercentageColumn={ev.addPercentageColumn}
              dropLastFromGraph={ev.dropLastFromGraph}
            />
          );
        })}
      </>
    );
  };

  const calcCalculatedFields = (data: DATASET_INFO_ROW_TYPE[]) => {
    const newData: DATASET_INFO_ROW_TYPE[] = [];
    data.forEach((row) => {
      // initialize with loaded data
      // const newRow: DATASET_INFO_ROW_TYPE = row;
      const newRow: DATASET_INFO_ROW_TYPE = JSON.parse(JSON.stringify(row));
      let total: number;
      let lastrow: number[];
      let lastcol: number[];
      // calculated fields

      // demographics
      if (row.dem_table && row.dem_table.length > 0) {
        // gender
        lastrow = getArrLastRow(row.dem_table as number[][]);
        lastcol = getArrLastCol(row.dem_table as number[][]);
        total = getArrTotal(row.dem_table as number[][]);
        newRow.calc_genders_male = lastrow[0];
        newRow.calc_genders_female = lastrow[1];
        if (newRow.calc_genders_male !== 0)
          newRow.calc_genders_fm_ratio =
            newRow.calc_genders_female / newRow.calc_genders_male;
        newRow.calc_genders_male_per = (100 * newRow.calc_genders_male) / total;
        newRow.calc_genders_female_per =
          (100 * newRow.calc_genders_female) / total;
        // age
        if (total > 0) {
          newRow.calc_age_0_39 =
            (100 * (lastcol[0] + lastcol[1] + lastcol[2])) / total;
          newRow.calc_age_40_69 =
            (100 * (lastcol[3] + lastcol[4] + lastcol[5])) / total;
          newRow.calc_age_70_99 =
            (100 * (lastcol[6] + lastcol[7] + lastcol[8])) / total;
        }
      }

      if (row.dem_uq && row.dem_uq.length > 0) {
        // gender
        lastrow = getArrLastRow(row.dem_uq as number[][]);
        lastcol = getArrLastCol(row.dem_uq as number[][]);
        total = getArrTotal(row.dem_uq as number[][]);
        newRow.calc_genders_uq_male = lastrow[0];
        newRow.calc_genders_uq_female = lastrow[1];
        if (newRow.calc_genders_uq_male !== 0)
          newRow.calc_genders_fm_uq_ratio =
            newRow.calc_genders_uq_female / newRow.calc_genders_uq_male;
        // age
        if (total > 0) {
          newRow.calc_age_uq_0_39 =
            (100 * (lastcol[0] + lastcol[1] + lastcol[2])) / total;
          newRow.calc_age_uq_40_69 =
            (100 * (lastcol[3] + lastcol[4] + lastcol[5])) / total;
          newRow.calc_age_uq_70_99 =
            (100 * (lastcol[6] + lastcol[7] + lastcol[8])) / total;
        }
      }

      // append to result table
      newData.push(newRow);
    });
    // return new data
    return newData;
  };

  const exportCVSDatasetMemo = useMemo(
    () => (
      <DownloadForOfflineIcon
        onClick={() =>
          downloadCSV(
            datasetInfo!,
            "cv-dataset",
            selectedLanguage + "_" + selectedVersion,
          )
        }
        color="secondary"
        sx={{ cursor: "grab" }}
      />
    ),
    [datasetInfo, selectedLanguage, selectedVersion],
  );

  useEffect(() => {
    // requested dataset
    const reqds = lc + "_" + ver;

    // check if it is the same, if not, we need to reload a new one
    if (lc !== selectedLanguage || ver !== selectedVersion) {
      // make all data undefined
      setDatasetInfo(undefined);
      setReportedSentences(undefined);
      setTextCorpusStats(undefined);
      setCharSpeed(undefined);

      // make sure data is ready
      if (!datasetInfo) {
        const url = `${ANALYZER_DATA_URL}/${lc}/${reqds}_splits.json`;
        axios
          .get(url, { headers: { "Content-Type": "application/json" } })
          .then((response) => {
            let data: DATASET_INFO_ROW_TYPE[] = response.data.data;
            data = data.map((row) => {
              if (row.dur_total) row.dur_total = row.dur_total / 3600;
              if (row.dem_fix_r && row.dem_fix_r.length > 0) {
                row.dem_fix_r = expandTable(row.dem_fix_r);
                if (row.dem_table && row.dem_table.length > 0)
                  row.dem_ctable = sumArrays(
                    row.dem_table as number[][],
                    row.dem_fix_r,
                  );
              }
              if (row.dem_fix_v && row.dem_fix_v.length > 0) {
                row.dem_fix_v = expandTable(row.dem_fix_v);
                if (row.dem_uq && row.dem_uq.length > 0)
                  row.dem_cuq = sumArrays(
                    row.dem_uq as number[][],
                    row.dem_fix_v,
                  );
              }
              return row;
            });
            /*
            // !!! KEEP THESE - WE MIGHT GO BACK !!!
            let result: DATASET_INFO_ROW_TYPE[] = [];
            data.forEach((row) => {
              if (row.dur_total) row.dur_total = row.dur_total / 3600;
              if (row.dur_freq && row.dur_freq !== "")
                row.dur_freq = convertStr2NumList(row.dur_freq as string);
              if (row.v_freq && row.v_freq !== "")
                row.v_freq = convertStr2NumList(row.v_freq as string);
              if (row.s_freq && row.s_freq !== "")
                row.s_freq = convertStr2NumList(row.s_freq as string);

              if (row.uv_freq && row.uv_freq !== "")
                row.uv_freq = convertStr2NumList(row.uv_freq as string);
              if (row.dv_freq && row.dv_freq !== "")
                row.dv_freq = convertStr2NumList(row.dv_freq as string);

              if (row.dem_table)
                row.dem_table = convertStr2NumArr(row.dem_table as string);
              if (row.dem_uq) row.dem_uq = convertStr2NumArr(row.dem_uq as string);
              if (row.dem_fix_r && row.dem_fix_r.length > 0) {
                // row.dem_fix_r = expandTable(
                //   convertStr2NumArr(row.dem_fix_r as string),
                // );
                row.dem_fix_r = expandTable(row.dem_fix_r);
                if (row.dem_table && row.dem_table.length > 0)
                  row.dem_ctable = sumArrays(
                    row.dem_table as number[][],
                    row.dem_fix_r,
                  );
              }
              if (row.dem_fix_v && row.dem_fix_v.length > 0) {
                // row.dem_fix_v = expandTable(
                //   convertStr2NumArr(row.dem_fix_v as string),
                // );
                row.dem_fix_v = expandTable(row.dem_fix_v)
                if (row.dem_uq && row.dem_uq.length > 0)
                  row.dem_cuq = sumArrays(
                    row.dem_uq as number[][],
                    row.dem_fix_v,
                  );
              }
              result.push(row);
            });
            */
            data = calcCalculatedFields(data);
            setSelectedLanguage(lc);
            setSelectedVersion(ver);
            setDatasetInfo(data);
          });
      }
    }
  }, [
    datasetInfo,
    lc,
    ver,
    setDatasetInfo,
    selectedLanguage,
    setSelectedLanguage,
    selectedVersion,
    setSelectedVersion,
    setReportedSentences,
    setTextCorpusStats,
    setCharSpeed,
  ]);

  if (!lc || !ver) {
    return <div>Error in parameters.</div>;
  }

  const expandableViews = [
    "duration",
    "voices",
    "gender",
    "age",
    "votes",
    "sentences",
  ];

  if (!initDone || !datasetInfo || !view) return <>...</>;

  return (
    <>
      <DataTable
        columns={getColumns(view)}
        data={datasetInfo}
        progressPending={!datasetInfo}
        responsive
        dense
        pagination
        paginationPerPage={25}
        paginationComponentOptions={paginationComponentOptions}
        highlightOnHover
        title={intl.get("examinepage.tab." + view)}
        defaultSortFieldId={0}
        direction={Direction.AUTO}
        persistTableHead
        expandableRows={expandableViews.includes(view!)}
        expandableRowsComponent={ExpandedComponent}
        customStyles={TABLE_STYLE}
        actions={exportCVSDatasetMemo}
      />
    </>
  );
};

export const DataSetInfoMemo = memo(DataSetInfo);
