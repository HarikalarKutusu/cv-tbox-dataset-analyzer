// React
import { FC, useEffect, useState } from "react";
import axios from "axios";
// i10n
import intl from "react-intl-universal";

// DataTable
import DataTable, {
  Direction,
  ExpanderComponentProps,
  TableColumn,
} from "react-data-table-component";

// Store
import { useStore } from "../stores/store";

// App
import {
  convertStrArr,
  convertStrList,
  getLastCol,
  getLastRow,
  getTotal,
  CV_AGES,
  CV_GENDERS,
  DATASET_INFO_DURATION_BINS,
  DATASET_INFO_ROW_TYPE,
  DATASET_INFO_SENTENCE_BINS,
  DATASET_INFO_VIEW_TYPE,
  DATASET_INFO_VIEW_TYPES,
  DATASET_INFO_VOICE_BINS,
  TEXT_CORPUS_STATS_ROW_TYPE,
  listDivide,
  sumArrays,
  expandTable,
  addTotals,
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

export const DataSetInfo = (props: DatasetInfoProps) => {
  const { lc, ver, view } = props;

  const { initDone } = useStore();
  const { langCode } = useStore();
  // const { versionFilter } = useStore();
  // const { languageFilter } = useStore();

  const { selectedDataset, setSelectedDataset } = useStore();
  const { datasetInfo, setDatasetInfo } = useStore();
  const { datasetInfoView, setDatasetInfoView } = useStore();
  const { textCorpusStats, setTextCorpusStats } = useStore();

  const [textCorpusRec, setTextCorpusRec] = useState<
    TEXT_CORPUS_STATS_ROW_TYPE | undefined
  >(undefined);

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
        row.dur_total
          ? (Math.round(1000 * (row.dur_total / 3600)) / 1000).toLocaleString(
              langCode,
              dec3,
            )
          : "-",
    };

    const col_dur_mean: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "dur_mean",
      name: intl.get("col.duration_mean"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.dur_mean ? row.dur_mean.toLocaleString(langCode, dec3) : "-",
    };

    const col_dur_median: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "dur_median",
      name: intl.get("col.duration_median"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.dur_median ? row.dur_median.toLocaleString(langCode, dec3) : "-",
    };

    const col_v_mean: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "v_mean",
      name: intl.get("col.voice_mean"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.v_mean ? row.v_mean.toLocaleString(langCode, dec3) : "-",
    };

    const col_v_median: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "v_median",
      name: intl.get("col.voice_median"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.v_median ? row.v_median.toLocaleString(langCode, dec3) : "-",
    };

    const col_s_mean: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "s_mean",
      name: intl.get("col.sentences_mean"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.s_mean ? row.s_mean.toLocaleString(langCode, dec3) : "-",
    };

    const col_s_median: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "s_median",
      name: intl.get("col.sentences_median"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.s_median ? row.s_median.toLocaleString(langCode, dec3) : "-",
    };

    // CALCULATED COLUMNS

    //
    // VOTES
    //
    const calc_votes_total: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_votes_total",
      name: intl.get("calc.votes_total"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_votes_total
          ? row.calc_votes_total.toLocaleString(langCode)
          : "-",
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
          ? (100 * row.calc_genders_male_per).toLocaleString(langCode, dec2)
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
          ? (100 * row.calc_genders_female_per).toLocaleString(langCode, dec2)
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
          ? (100 * row.calc_age_0_39).toLocaleString(langCode, dec2)
          : "-",
    };
    const calc_age_40_69: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_age_40_69",
      name: intl.get("calc.age_40_69"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_age_40_69
          ? (100 * row.calc_age_40_69).toLocaleString(langCode, dec2)
          : "-",
    };
    const calc_age_70_99: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_age_70_99",
      name: intl.get("calc.age_70_99"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_age_70_99
          ? (100 * row.calc_age_70_99).toLocaleString(langCode, dec2)
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
          ? (100 * row.calc_age_uq_0_39).toLocaleString(langCode, dec2)
          : "-",
    };
    const calc_age_uq_40_69: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_age_uq_40_69",
      name: intl.get("calc.age_uq_40_69"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_age_uq_40_69
          ? (100 * row.calc_age_uq_40_69).toLocaleString(langCode, dec2)
          : "-",
    };
    const calc_age_uq_70_99: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_age_uq_70_99",
      name: intl.get("calc.age_uq_70_99"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.calc_age_uq_70_99
          ? (100 * row.calc_age_uq_70_99).toLocaleString(langCode, dec2)
          : "-",
    };

    // Combine them for views
    let res: TableColumn<DATASET_INFO_ROW_TYPE>[] = [];
    switch (view) {
      case "general":
        res = [col_alg, col_sp, col_dur_total, col_clips, col_uq_v, col_uq_s];
        break;
      case "duration":
        res = [col_alg, col_sp, col_dur_total, col_dur_mean, col_dur_median];
        break;
      case "voices":
        res = [col_alg, col_sp, col_uq_v, col_v_mean, col_v_median];
        break;
      case "gender":
        res = [
          col_alg,
          col_sp,
          calc_genders_male,
          calc_genders_female,
          calc_genders_fm_ratio,
          calc_genders_male_per,
          calc_genders_female_per,
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
        res = [col_alg, col_sp, calc_votes_total];
        break;
      case "sentences":
        res = [col_alg, col_sp, col_uq_s, col_uq_sl, col_s_mean, col_s_median];
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
    type expViewType = {
      bins: number[] | string[];
      values: number[] | string[];
      title: string;
      dropLastFromGraph?: boolean;
    };

    let expViews: expViewType[] = [];

    switch (view) {
      case "general":
        break;
      case "duration":
        expViews = [
          {
            bins: DATASET_INFO_DURATION_BINS,
            values: data.dur_freq as number[],
            title: intl.get("col.duration_distribution"),
          },
        ];
        break;
      case "voices":
        expViews = [
          {
            bins: DATASET_INFO_VOICE_BINS,
            values: data.v_freq as number[],
            title: intl.get("col.voice_distribution"),
          },
        ];
        break;
      case "gender":
        expViews = [
          {
            bins: CV_GENDERS as string[],
            values: getLastRow(data.dem_table as number[][]) as number[],
            title: intl.get("tbl.gender_distribution"),
            dropLastFromGraph: true,
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
            values: getLastRow(data.dem_uq as number[][]) as number[],
            title: intl.get("tbl.gender_uq_distribution"),
            dropLastFromGraph: true,
          },
          {
            bins: CV_GENDERS as string[],
            values: listDivide(
              getLastRow(data.dem_table as number[][]) as number[],
              getLastRow(data.dem_uq as number[][]) as number[],
            ),
            title: intl.get("tbl.gender_recs_per_person"),
            dropLastFromGraph: false,
          },
        ];
        break;
      case "age":
        expViews = [
          {
            bins: CV_AGES as string[],
            values: getLastCol(data.dem_table as number[][]) as number[],
            title: intl.get("tbl.age_distribution"),
            dropLastFromGraph: true,
          },
          {
            bins: CV_AGES as string[],
            values: getLastCol(data.dem_uq as number[][]) as number[],
            title: intl.get("tbl.age_uq_distribution"),
            dropLastFromGraph: true,
          },
          {
            bins: CV_AGES as string[],
            values: listDivide(
              getLastCol(data.dem_table as number[][]) as number[],
              getLastCol(data.dem_uq as number[][]) as number[],
            ),
            title: intl.get("tbl.age_recs_per_person"),
            dropLastFromGraph: false,
          },
        ];
        break;
      case "votes":
        // expViews = [
        //   {
        //     bins: DATASET_INFO_SENTENCE_BINS,
        //     values: data.votes as number[][],
        //     title: intl.get("tbl.votes"),
        //   },
        // ];
        break;
      case "sentences":
        expViews = [
          {
            bins: DATASET_INFO_SENTENCE_BINS,
            values: data.s_freq as number[],
            title: intl.get("col.sentences_distribution"),
          },
        ];
        break;
      default:
    }

    return (
      <>
        {expViews.map((v, index) => {
          return (
            <FreqTable
              key={"c_freq_" + index}
              bins={v.bins}
              values={v.values}
              title={v.title}
              yScale="linear"
              dropLastFromGraph={v.dropLastFromGraph}
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
      const newRow: DATASET_INFO_ROW_TYPE = row;
      let total: number;
      let lastrow: number[];
      let lastcol: number[];
      // calculated fields (round them for visibity)

      // votes
      if (row.votes)
        newRow.calc_votes_total = getTotal(row.votes as number[][]);

      // demographics
      if (row.dem_table) {
        // gender
        lastrow = getLastRow(row.dem_table as number[][]);
        lastcol = getLastCol(row.dem_table as number[][]);
        total = getTotal(row.dem_table as number[][]);
        newRow.calc_genders_male = lastrow[0];
        newRow.calc_genders_female = lastrow[1];
        if (newRow.calc_genders_male !== 0)
          newRow.calc_genders_fm_ratio =
            newRow.calc_genders_female / newRow.calc_genders_male;
        newRow.calc_genders_male_per = newRow.calc_genders_male / total;
        newRow.calc_genders_female_per = newRow.calc_genders_female / total;
        // age
        if (total > 0) {
          newRow.calc_age_0_39 = (lastcol[0] + lastcol[1] + lastcol[2]) / total;
          newRow.calc_age_40_69 =
            (lastcol[3] + lastcol[4] + lastcol[5]) / total;
          newRow.calc_age_70_99 =
            (lastcol[0] + lastcol[1] + lastcol[3]) / total;
        }
      }

      if (row.dem_uq) {
        // gender
        lastrow = getLastRow(row.dem_uq as number[][]);
        lastcol = getLastCol(row.dem_uq as number[][]);
        total = getTotal(row.dem_uq as number[][]);
        newRow.calc_genders_uq_male = lastrow[0];
        newRow.calc_genders_uq_female = lastrow[1];
        if (newRow.calc_genders_uq_male !== 0)
          newRow.calc_genders_fm_uq_ratio =
            newRow.calc_genders_uq_female / newRow.calc_genders_uq_male;
        // age
        if (total > 0) {
          newRow.calc_age_uq_0_39 =
            (lastcol[0] + lastcol[1] + lastcol[2]) / total;
          newRow.calc_age_uq_40_69 =
            (lastcol[3] + lastcol[4] + lastcol[5]) / total;
          newRow.calc_age_uq_70_99 =
            (lastcol[0] + lastcol[1] + lastcol[3]) / total;
        }
      }

      // append to result table
      newData.push(newRow);
    });
    // return new data
    return newData;
  };

  useEffect(() => {
    // requested dataset
    const reqds = lc + "_" + ver;

    // check if it is the same, if not, we need to reload a new one
    if (reqds !== selectedDataset) {
      setDatasetInfo(undefined);
      // make sure data is ready
      if (!datasetInfo) {
        const url = "/assets/data/" + lc + "/" + reqds + "_splits.json";
        axios
          .get(url, { headers: { "Content-Type": "application/json" } })
          .then((response) => {
            const data: DATASET_INFO_ROW_TYPE[] = response.data.data;
            let result: DATASET_INFO_ROW_TYPE[] = [];
            data.forEach((row) => {
              if (row.dur_freq && row.dur_freq !== "")
                row.dur_freq = convertStrList(row.dur_freq as string);
              if (row.v_freq && row.v_freq !== "")
                row.v_freq = convertStrList(row.v_freq as string);
              if (row.s_freq && row.s_freq !== "")
                row.s_freq = convertStrList(row.s_freq as string);

              if (row.votes && row.votes !== "")
                row.votes = addTotals(convertStrArr(row.votes as string));

              if (row.dem_table)
                row.dem_table = convertStrArr(row.dem_table as string);
              if (row.dem_uq) row.dem_uq = convertStrArr(row.dem_uq as string);
              if (row.dem_fix_r && row.dem_fix_r !== "") {
                row.dem_fix_r = expandTable(
                  convertStrArr(row.dem_fix_r as string),
                );
                if (row.dem_table && row.dem_table !== "")
                  row.dem_ctable = sumArrays(
                    row.dem_table as number[][],
                    row.dem_fix_r,
                  );
              }
              if (row.dem_fix_v && row.dem_fix_v !== "") {
                row.dem_fix_v = expandTable(
                  convertStrArr(row.dem_fix_v as string),
                );
                if (row.dem_uq && row.dem_uq !== "")
                  row.dem_cuq = sumArrays(
                    row.dem_uq as number[][],
                    row.dem_fix_v,
                  );
              }
              result.push(row);
            });
            result = calcCalculatedFields(result);
            setSelectedDataset(reqds);
            setDatasetInfoView(DATASET_INFO_VIEW_TYPES[0]);
            setDatasetInfo(result);
          });
      }
    }

    // Text Corpus?
    if (textCorpusStats) {
      // if already loaded, just filter the row
      setTextCorpusRec(textCorpusStats.filter((row) => row.lc === lc)[0]);
    } else {
      // not yet, loaded, load it
      const url = "/assets/data/$text_corpus_stats.json";
      axios
        .get(url, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          const data: TEXT_CORPUS_STATS_ROW_TYPE[] = response.data.data;
          let result: TEXT_CORPUS_STATS_ROW_TYPE[] = [];
          data.forEach((row) => {
            row.c_freq = convertStrList(row.c_freq as string);
            row.w_freq = convertStrList(row.w_freq as string);
            row.t_freq = convertStrList(row.t_freq as string);
            result.push(row);
          });
          setTextCorpusStats(result);
          setTextCorpusRec(result.filter((row) => row.lc === lc)[0]);
        });
    }
  }, [
    lc,
    ver,
    datasetInfo,
    setDatasetInfo,
    selectedDataset,
    setSelectedDataset,
    setDatasetInfoView,
    textCorpusStats,
    setTextCorpusStats,
  ]);

  if (!lc || !ver) {
    return <div>Error in parameters.</div>;
  }

  const expandableViews = [
    "duration",
    "voices",
    "gender",
    "age",
    // "votes",
    "sentences",
  ];

  return !datasetInfo || !initDone ? (
    <div>...</div>
  ) : (
    <>
      <DataTable
        columns={getColumns(datasetInfoView)}
        data={datasetInfo}
        progressPending={!datasetInfo}
        responsive
        dense
        pagination
        paginationPerPage={15}
        paginationComponentOptions={paginationComponentOptions}
        direction={Direction.AUTO}
        highlightOnHover
        // title={intl.get("examinepage.title")}
        defaultSortFieldId={0}
        persistTableHead
        expandableRows={expandableViews.includes(view!)}
        expandableRowsComponent={ExpandedComponent}
      />
    </>
  );
};
