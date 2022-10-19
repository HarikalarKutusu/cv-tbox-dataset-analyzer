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
  DATASET_INFO_DURATION_BINS,
  DATASET_INFO_ROW_TYPE,
  DATASET_INFO_SENTENCE_BINS,
  DATASET_INFO_VIEW_TYPE,
  DATASET_INFO_VIEW_TYPES,
  DATASET_INFO_VOICE_BINS,
  TEXT_CORPUS_STATS_ROW_TYPE,
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

  const getColumns = (view: string): TableColumn<DATASET_INFO_ROW_TYPE>[] => {
    const col_alg: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "alg",
      name: intl.get("colnames.algorithm"),
      sortable: true,
      center: true,
      width: "120px",
      selector: (row: DATASET_INFO_ROW_TYPE) => row.alg,
    };

    const col_sp: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "sp",
      name: intl.get("colnames.split"),
      sortable: true,
      right: true,
      width: "100px",
      selector: (row: DATASET_INFO_ROW_TYPE) => row.sp,
    };

    const col_clips: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "clips",
      name: intl.get("colnames.clips"),
      sortable: true,
      right: true,
      // width: "100px",
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.clips.toLocaleString(langCode),
    };

    const col_uq_v: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "uq_v",
      name: intl.get("colnames.unique_voices"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.uq_v.toLocaleString(langCode),
    };

    const col_uq_s: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "uq_s",
      name: intl.get("colnames.unique_sentences"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.uq_s.toLocaleString(langCode),
    };

    const col_uq_sl: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "uq_sl",
      name: intl.get("colnames.unique_sentences_lower"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        row.uq_sl.toLocaleString(langCode),
    };

    const col_dur_total: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "dur_total",
      name: intl.get("colnames.duration_total"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) =>
        (Math.round(1000 * (row.dur_total / 3600)) / 1000).toFixed(3),
    };

    const col_dur_mean: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "dur_mean",
      name: intl.get("colnames.duration_mean"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) => row.dur_mean.toFixed(3),
    };

    const col_dur_median: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "dur_median",
      name: intl.get("colnames.duration_median"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) => row.dur_median.toFixed(3),
    };

    const col_v_mean: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "v_mean",
      name: intl.get("colnames.voice_mean"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) => row.v_mean.toFixed(3),
    };

    const col_v_median: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "v_median",
      name: intl.get("colnames.voice_median"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) => row.v_median.toFixed(3),
    };

    const col_s_mean: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "s_mean",
      name: intl.get("colnames.sentences_mean"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) => row.s_mean.toFixed(3),
    };

    const col_s_median: TableColumn<DATASET_INFO_ROW_TYPE> = {
      id: "s_median",
      name: intl.get("colnames.sentences_median"),
      sortable: true,
      right: true,
      selector: (row: DATASET_INFO_ROW_TYPE) => row.s_median.toFixed(),
    };

    // TODO : Add calculated columns

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
      case "sentences":
        res = [col_alg, col_sp, col_uq_s, col_uq_sl, col_s_mean, col_s_median];
        break;
      case "comperative":
        res = [col_alg, col_sp];
        break;
      case "health":
        res = [col_alg, col_sp];
        break;
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
    let bins: number[] = [];
    let values: number[] = [];
    let title: string = "";
    switch (view) {
      case "general":
        break;
      case "duration":
        bins = DATASET_INFO_DURATION_BINS;
        values = data.dur_freq as number[];
        title = intl.get("colnames.duration_distribution");
        break;
      case "voices":
        bins = DATASET_INFO_VOICE_BINS;
        values = data.v_freq as number[];
        title = intl.get("colnames.voice_distribution");
        break;
      case "sentences":
        bins = DATASET_INFO_SENTENCE_BINS;
        values = data.s_freq as number[];
        title = intl.get("colnames.sentences_distribution");
        break;
      default:
    }

    return  <FreqTable
              key={"c_freq"}
              bins={bins}
              values={values}
              title={title}
              yScale="linear"
            />
  }

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
              row.dem_table = convertStrArr(row.dem_table as string);
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
        expandableRows={["duration", "voices", "sentences"].includes(view!)}
        expandableRowsComponent={ExpandedComponent}
      />
    </>
  );
};
