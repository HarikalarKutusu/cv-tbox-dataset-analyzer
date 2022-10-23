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
        row.clips.toLocaleString(langCode),
    };

    const col_uq_v: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "uq_v",
      name: intl.get("col.unique_voices"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.uq_v.toLocaleString(langCode),
    };

    const col_uq_s: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "uq_s",
      name: intl.get("col.unique_sentences"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.uq_s.toLocaleString(langCode),
    };

    const col_uq_sl: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "uq_sl",
      name: intl.get("col.unique_sentences_lower"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.uq_sl.toLocaleString(langCode),
    };

    const col_dur_total: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "dur_total",
      name: intl.get("col.duration_total"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        (Math.round(1000 * (row.dur_total / 3600)) / 1000).toFixed(3),
    };

    const col_dur_mean: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "dur_mean",
      name: intl.get("col.duration_mean"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) => row.dur_mean.toFixed(3),
    };

    const col_dur_median: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "dur_median",
      name: intl.get("col.duration_median"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) => row.dur_median.toFixed(3),
    };

    const col_v_mean: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "v_mean",
      name: intl.get("col.voice_mean"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) => row.v_mean.toFixed(3),
    };

    const col_v_median: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "v_median",
      name: intl.get("col.voice_median"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) => row.v_median.toFixed(3),
    };

    const col_s_mean: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "s_mean",
      name: intl.get("col.sentences_mean"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) => row.s_mean.toFixed(3),
    };

    const col_s_median: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "s_median",
      name: intl.get("col.sentences_median"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) => row.s_median.toFixed(),
    };

    // TODO : Add calculated columns

    //
    // DEMOGRAPHICS - GENDER
    //
    // number of male recordings
    const calc_gender_male: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_genders_male",
      name: intl.get("calc.genders_male"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        getLastRow(row.dem_table as number[][])[0].toLocaleString(langCode),
    };
    // number of female recordings
    const calc_gender_female: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_genders_female",
      name: intl.get("calc.genders_female"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        getLastRow(row.dem_table as number[][])[1].toLocaleString(langCode),
    };
    // ratio of female/male recordings
    const calc_gender_fm_ratio: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_fm_ratio",
      name: intl.get("calc.fm_ratio"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        (
          getLastRow(row.dem_table as number[][])[1] /
          getLastRow(row.dem_table as number[][])[0]
        ).toFixed(2),
    };
    // male percentage in recordings
    const calc_gender_male_per: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_genders_male_per",
      name: intl.get("calc.male_percentage"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        (
          (100 * getLastRow(row.dem_table as number[][])[0]) /
          getTotal(row.dem_table as number[][])
        ).toLocaleString(langCode),
    };
    // female percentage in recordings
    const calc_gender_female_per: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_genders_female_per",
      name: intl.get("calc.female_percentage"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        (
          (100 * getLastRow(row.dem_table as number[][])[1]) /
          getTotal(row.dem_table as number[][])
        ).toLocaleString(langCode),
    };
    // Unique male voices
    const calc_gender_uq_male: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_genders_uq_male",
      name: intl.get("calc.genders_uq_male"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        getLastRow(row.dem_uq as number[][])[0].toLocaleString(langCode),
    };
    // Unique female voices
    const calc_gender_uq_female: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_genders_uq_female",
      name: intl.get("calc.genders_uq_female"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        getLastRow(row.dem_uq as number[][])[1].toLocaleString(langCode),
    };
    // ratio of female/male recordings
    const calc_gender_fm_uq_ratio: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_fm_uq_ratio",
      name: intl.get("calc.fm_uq_ratio"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        (
          (100 * getLastRow(row.dem_table as number[][])[1]) /
          getTotal(row.dem_table as number[][])
        ).toLocaleString(langCode),
    };
    //
    // DEMOGRAPHICS - AGE
    //
    // Percentage of age groups
    const calc_age_0_39: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_age_0_39",
      name: intl.get("calc.age_0_39"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        (
          (100 *
            (getLastCol(row.dem_table as number[][])[0] +
              getLastCol(row.dem_table as number[][])[1] +
              getLastCol(row.dem_table as number[][])[2])) /
          getTotal(row.dem_table as number[][])
        ).toFixed(2),
    };
    const calc_age_40_69: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_age_40_69",
      name: intl.get("calc.age_40_69"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        (
          (100 *
            (getLastCol(row.dem_table as number[][])[3] +
              getLastCol(row.dem_table as number[][])[4] +
              getLastCol(row.dem_table as number[][])[5])) /
          getTotal(row.dem_table as number[][])
        ).toFixed(2),
    };
    const calc_age_70_99: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "calc_age_70_99",
      name: intl.get("calc.age_70_99"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        (
          (100 *
            (getLastCol(row.dem_table as number[][])[6] +
              getLastCol(row.dem_table as number[][])[7] +
              getLastCol(row.dem_table as number[][])[8])) /
          getTotal(row.dem_table as number[][])
        ).toFixed(2),
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
          calc_gender_male,
          calc_gender_female,
          calc_gender_fm_ratio,
          calc_gender_male_per,
          calc_gender_female_per,
          calc_gender_uq_male,
          calc_gender_uq_female,
          calc_gender_fm_uq_ratio,
        ];
        break;
      case "age":
        res = [col_alg, col_sp, calc_age_0_39, calc_age_40_69, calc_age_70_99];
        break;
      case "votes":
        res = [col_alg, col_sp];
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

    // let bins: number[] = [];
    // let values: number[] = [];
    // let title: string = "";
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
              getLastRow(data.dem_uq as number[][]) as number[]
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
              row.dur_freq = convertStrList(row.dur_freq as string);
              row.v_freq = convertStrList(row.v_freq as string);
              row.s_freq = convertStrList(row.s_freq as string);

              row.votes = convertStrArr(row.votes as string);

              row.dem_table = convertStrArr(row.dem_table as string);
              row.dem_uq = convertStrArr(row.dem_uq as string);
              row.dem_fix_r = convertStrArr(row.dem_fix_r as string);
              row.dem_fix_v = convertStrArr(row.dem_fix_v as string);

              result.push(row);
            });
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
    "votes",
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
