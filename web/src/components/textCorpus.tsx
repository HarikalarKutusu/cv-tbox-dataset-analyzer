// React
import { memo, useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
// i10n
import intl from "react-intl-universal";
// MUI
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

// DataTable
import DataTable, { Direction, TableColumn } from "react-data-table-component";

// Store
import { useStore } from "../stores/store";

// App
import { ANALYZER_DATA_URL, ILoaderData } from "./../helpers/appHelper";
import {
  TABLE_STYLE,
  TABLE_STYLE_DENSE,
  TEXT_CORPUS_STATS_ROW_TYPE,
  ITextCorpusStatsTableRow,
  // IStrValuePair,
  // convertStr2NumList,
  // convertStr2StrArr,
  downloadCSV,
  convertStr2StrList,
  // IMeasureValueTableRow,
} from "../helpers/tableHelper";
import { FreqTable } from "./freqTable";
import { Button, Grid, Paper, Typography } from "@mui/material";

//
// JSX
//

export type TextCorpusProps = {
  ver?: string;
  lc?: string;
};

export const TextCorpus = (props: TextCorpusProps) => {
  const { ver, lc } = props;

  const { initDone } = useStore();
  const { langCode } = useStore();

  const { selectedLanguage, setSelectedLanguage } = useStore();
  const { selectedVersion, setSelectedVersion } = useStore();
  const { textCorpusStats, setTextCorpusStats } = useStore();

  // const { textCorpusStats, setTextCorpusStats } = useState<
  //   TEXT_CORPUS_STATS_ROW_TYPE[] | undefined
  // >(undefined);

  const [textCorpusRec, setTextCorpusRec] = useState<
    TEXT_CORPUS_STATS_ROW_TYPE | undefined
  >(undefined);
  const [algorithms, setAlgorithms] = useState<string[] | undefined>(undefined);
  const [curAlgo, setCurAlgo] = useState<string>("s1");

  const CONF = (useLoaderData() as ILoaderData).analyzerConfig;

  const paginationComponentOptions = {
    rowsPerPageText: intl.get("pagination.perpage"),
    rangeSeparatorText: intl.get("pagination.rangeseparator"),
    selectAllRowsItem: true,
    selectAllRowsItemText: intl.get("pagination.selectallrows"),
  };

  const handleAlgoSelect = (algo: string) => {
    setCurAlgo(algo);
  };

  const AlgoButtons = (): JSX.Element => {
    return (
      <div>
        <Typography align="right">
          {intl.get("col.algorithm")}
          <>
            {algorithms?.map((algo) => {
              return (
                <Button
                  onClick={() => handleAlgoSelect(algo)}
                  variant="contained"
                  color={curAlgo === algo ? "primary" : "secondary"}
                  size="small"
                  key={algo}
                  sx={{
                    color: "#eee",
                    textTransform: "none",
                    margin: "4px 2px",
                    padding: "2px 0px",
                    textAlign: "center",
                    width: "30px",
                    maxWidth: "30px",
                    height: "30px",
                    maxHeight: "30px",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {algo}
                </Button>
              );
            })}
          </>
        </Typography>
      </div>
    );
  };

  const TextCorpusStatsTable = (): JSX.Element => {
    const algo = curAlgo;
    let tbl: ITextCorpusStatsTableRow[] = [];
    // const dec2 = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    // const dec3 = { minimumFractionDigits: 3, maximumFractionDigits: 3 };

    // const measures: string[] = [];
    // const algo_split: string[] = [];
    // const splits: string[] = [];

    let text_corpus_rec: TEXT_CORPUS_STATS_ROW_TYPE | undefined = undefined;
    let validated_rec: TEXT_CORPUS_STATS_ROW_TYPE | undefined = undefined;
    let train_rec: TEXT_CORPUS_STATS_ROW_TYPE | undefined = undefined;
    let dev_rec: TEXT_CORPUS_STATS_ROW_TYPE | undefined = undefined;
    let test_rec: TEXT_CORPUS_STATS_ROW_TYPE | undefined = undefined;
    let lst: TEXT_CORPUS_STATS_ROW_TYPE[] | undefined = undefined;

    lst = textCorpusStats?.filter((row) => row.algo === "" && row.sp === "");
    if (lst && lst.length > 0) text_corpus_rec = lst[0];
    lst = textCorpusStats?.filter(
      (row) => row.algo === "s1" && row.sp === "validated",
    );
    if (lst && lst.length > 0) validated_rec = lst[0];
    lst = textCorpusStats?.filter(
      (row) => row.algo === algo && row.sp === "train",
    );
    if (lst && lst.length > 0) train_rec = lst[0];
    lst = textCorpusStats?.filter(
      (row) => row.algo === algo && row.sp === "dev",
    );
    if (lst && lst.length > 0) dev_rec = lst[0];
    lst = textCorpusStats?.filter(
      (row) => row.algo === algo && row.sp === "test",
    );
    if (lst && lst.length > 0) test_rec = lst[0];

    tbl = [
      {
        measure: intl.get("measures.sentence_count"),
        tc: text_corpus_rec?.s_cnt as number,
        validated: validated_rec?.s_cnt as number,
        train: train_rec?.s_cnt as number,
        dev: dev_rec?.s_cnt as number,
        test: test_rec?.s_cnt as number,
      },
      {
        measure: intl.get("measures.unique_lower"),
        tc: text_corpus_rec?.uq_s as number,
        validated: validated_rec?.uq_s as number,
        train: train_rec?.uq_s as number,
        dev: dev_rec?.uq_s as number,
        test: test_rec?.uq_s as number,
      },
      {
        measure: intl.get("measures.unique_normalized"),
        tc: text_corpus_rec?.uq_n as number,
        validated: validated_rec?.uq_n as number,
        train: train_rec?.uq_n as number,
        dev: dev_rec?.uq_n as number,
        test: test_rec?.uq_n as number,
      },
      {
        measure: intl.get("measures.validated"),
        tc: text_corpus_rec?.has_val ? (text_corpus_rec?.val as number) : "?",
        validated: validated_rec?.has_val
          ? (validated_rec?.val as number)
          : "?",
        train: train_rec?.has_val ? (train_rec?.val as number) : "?",
        dev: dev_rec?.has_val ? (dev_rec?.val as number) : "?",
        test: test_rec?.has_val ? (test_rec?.val as number) : "?",
      },
      {
        measure: intl.get("measures.characters_sum"),
        tc: text_corpus_rec?.c_sum as number,
        validated: validated_rec?.c_sum as number,
        train: train_rec?.c_sum as number,
        dev: dev_rec?.c_sum as number,
        test: test_rec?.c_sum as number,
      },
      {
        measure: intl.get("measures.characters_avg"),
        tc: text_corpus_rec?.c_avg as number,
        validated: validated_rec?.c_avg as number,
        train: train_rec?.c_avg as number,
        dev: dev_rec?.c_avg as number,
        test: test_rec?.c_avg as number,
      },
      {
        measure: intl.get("measures.characters_med"),
        tc: text_corpus_rec?.c_med as number,
        validated: validated_rec?.c_med as number,
        train: train_rec?.c_med as number,
        dev: dev_rec?.c_med as number,
        test: test_rec?.c_med as number,
      },
      {
        measure: intl.get("measures.characters_std"),
        tc: text_corpus_rec?.c_std as number,
        validated: validated_rec?.c_std as number,
        train: train_rec?.c_std as number,
        dev: dev_rec?.c_std as number,
        test: test_rec?.c_std as number,
      },
      {
        measure: intl.get("measures.words_sum"),
        tc: text_corpus_rec?.has_val ? (text_corpus_rec?.w_sum as number) : "?",
        validated: validated_rec?.has_val
          ? (validated_rec?.w_sum as number)
          : "?",
        train: train_rec?.has_val ? (train_rec?.w_sum as number) : "?",
        dev: dev_rec?.has_val ? (dev_rec?.w_sum as number) : "?",
        test: test_rec?.has_val ? (test_rec?.w_sum as number) : "?",
      },
      {
        measure: intl.get("measures.words_avg"),
        tc: text_corpus_rec?.has_val ? (text_corpus_rec?.w_avg as number) : "?",
        validated: validated_rec?.has_val
          ? (validated_rec?.w_avg as number)
          : "?",
        train: train_rec?.has_val ? (train_rec?.w_avg as number) : "?",
        dev: dev_rec?.has_val ? (dev_rec?.w_avg as number) : "?",
        test: test_rec?.has_val ? (test_rec?.w_avg as number) : "?",
      },
      {
        measure: intl.get("measures.words_med"),
        tc: text_corpus_rec?.has_val ? (text_corpus_rec?.w_med as number) : "?",
        validated: validated_rec?.has_val
          ? (validated_rec?.w_med as number)
          : "?",
        train: train_rec?.has_val ? (train_rec?.w_med as number) : "?",
        dev: dev_rec?.has_val ? (dev_rec?.w_med as number) : "?",
        test: test_rec?.has_val ? (test_rec?.w_med as number) : "?",
      },
      {
        measure: intl.get("measures.words_std"),
        tc: text_corpus_rec?.has_val ? (text_corpus_rec?.w_std as number) : "?",
        validated: validated_rec?.has_val
          ? (validated_rec?.w_std as number)
          : "?",
        train: train_rec?.has_val ? (train_rec?.w_std as number) : "?",
        dev: dev_rec?.has_val ? (dev_rec?.w_std as number) : "?",
        test: test_rec?.has_val ? (test_rec?.w_std as number) : "?",
      },
      {
        measure: intl.get("measures.tokens_sum"),
        tc: text_corpus_rec?.has_val ? (text_corpus_rec?.t_sum as number) : "?",
        validated: validated_rec?.has_val
          ? (validated_rec?.t_sum as number)
          : "?",
        train: train_rec?.has_val ? (train_rec?.t_sum as number) : "?",
        dev: dev_rec?.has_val ? (dev_rec?.t_sum as number) : "?",
        test: test_rec?.has_val ? (test_rec?.t_sum as number) : "?",
      },
      {
        measure: intl.get("measures.tokens_avg"),
        tc: text_corpus_rec?.has_val ? (text_corpus_rec?.t_avg as number) : "?",
        validated: validated_rec?.has_val
          ? (validated_rec?.t_avg as number)
          : "?",
        train: train_rec?.has_val ? (train_rec?.t_avg as number) : "?",
        dev: dev_rec?.has_val ? (dev_rec?.t_avg as number) : "?",
        test: test_rec?.has_val ? (test_rec?.t_avg as number) : "?",
      },
      {
        measure: intl.get("measures.tokens_med"),
        tc: text_corpus_rec?.has_val ? (text_corpus_rec?.t_med as number) : "?",
        validated: validated_rec?.has_val
          ? (validated_rec?.t_med as number)
          : "?",
        train: train_rec?.has_val ? (train_rec?.t_med as number) : "?",
        dev: dev_rec?.has_val ? (dev_rec?.t_med as number) : "?",
        test: test_rec?.has_val ? (test_rec?.t_med as number) : "?",
      },
      {
        measure: intl.get("measures.tokens_std"),
        tc: text_corpus_rec?.has_val ? (text_corpus_rec?.t_std as number) : "?",
        validated: validated_rec?.has_val
          ? (validated_rec?.t_std as number)
          : "?",
        train: train_rec?.has_val ? (train_rec?.t_std as number) : "?",
        dev: dev_rec?.has_val ? (dev_rec?.t_std as number) : "?",
        test: test_rec?.has_val ? (test_rec?.t_std as number) : "?",
      },
      {
        measure: intl.get("measures.grapheme_count"),
        tc: text_corpus_rec?.g_freq.length as number,
        validated: validated_rec?.g_freq.length as number,
        train: train_rec?.g_freq.length as number,
        dev: dev_rec?.g_freq.length as number,
        test: test_rec?.g_freq.length as number,
      },
      {
        measure: intl.get("measures.phoneme_count"),
        tc: text_corpus_rec?.p_freq.length as number,
        validated: validated_rec?.p_freq.length as number,
        train: train_rec?.p_freq.length as number,
        dev: dev_rec?.p_freq.length as number,
        test: test_rec?.p_freq.length as number,
      },
    ];

    const tcStatsTableColumns: TableColumn<ITextCorpusStatsTableRow>[] = [
      {
        id: "measure",
        name: intl.get("col.measure"),
        width: "300px",
        selector: (row: ITextCorpusStatsTableRow) => row.measure,
      },
      {
        id: "tc",
        name: intl.get("examinepage.tab.text-corpus"),
        right: true,
        width: "100px",
        selector: (row: ITextCorpusStatsTableRow) =>
          row.tc ? row.tc.toLocaleString(langCode) : "?",
      },
      {
        id: "validated",
        name: intl.get("col.buckets_validated"),
        right: true,
        width: "100px",
        selector: (row: ITextCorpusStatsTableRow) =>
          row.validated ? row.validated.toLocaleString(langCode) : "?",
      },
      {
        id: "train",
        name: intl.get("col.buckets_train"),
        right: true,
        width: "100px",
        selector: (row: ITextCorpusStatsTableRow) =>
          row.train ? row.train.toLocaleString(langCode) : "?",
      },
      {
        id: "dev",
        name: intl.get("col.buckets_dev"),
        right: true,
        width: "100px",
        selector: (row: ITextCorpusStatsTableRow) =>
          row.dev ? row.dev.toLocaleString(langCode) : "?",
      },
      {
        id: "test",
        name: intl.get("col.buckets_test"),
        right: true,
        width: "100px",
        selector: (row: ITextCorpusStatsTableRow) =>
          row.test ? row.test.toLocaleString(langCode) : "?",
      },
    ];

    // const exportCVSTextCorpusMemo = useMemo(
    //   () => (
    //     <DownloadForOfflineIcon
    //       onClick={() =>
    //         downloadCSV(
    //           new Array<TEXT_CORPUS_STATS_ROW_TYPE>(textCorpusRec!),
    //           "cv-dataset-text-corpus",
    //           selectedLanguage + "_" + selectedVersion,
    //         )
    //       }
    //       color="secondary"
    //       sx={{ cursor: "grab" }}
    //     />
    //   ),
    //   [],
    // );

    return (
      <DataTable
        columns={tcStatsTableColumns}
        data={tbl}
        title={intl.get("examinepage.tab.text-corpus") + " & " + curAlgo}
        responsive
        dense
        direction={Direction.AUTO}
        highlightOnHover
        customStyles={TABLE_STYLE}
        // actions={exportCVSTextCorpusMemo}
      />
    );
  };

  const mergeCountTableData = (items: string[], values: number[]): any[][] => {
    const reducer = (oldSum: number, newValue: number): number => {
      return oldSum + newValue;
    };
    const res: any[][] = [];
    if (items.length !== values.length) {
      console.log("ERROR: mergeCountTableData item count != value count");
      return res;
    }
    const total: number = values.reduce(reducer);
    for (let i = 0; i < items.length; i++) {
      res.push([items[i], values[i], values[i] / total]);
    }
    return res;
  };

  const countTableColumns: TableColumn<any[]>[] = [
    {
      id: "symbol",
      name: intl.get("col.symbol"),
      selector: (row: any[]) => (row[0] ? row[0] : "-"),
    },
    {
      id: "val",
      name: intl.get("col.count"),
      right: true,
      width: "100px",
      selector: (row: any[]) =>
        row[1] ? Number(row[1]).toLocaleString(langCode) : "-",
    },
    {
      id: "per",
      name: intl.get("col.percent"),
      right: true,
      width: "60px",
      selector: (row: any[]) => (row[2] ? (100 * row[2]).toFixed(3) : "-"),
    },
  ];

  // Pre-process if needed (if just started or dataset changed)
  useEffect(() => {
    if (
      !textCorpusStats ||
      (textCorpusStats.length > 0 &&
        textCorpusStats[0].lc !== selectedLanguage) ||
      (textCorpusStats.length > 0 && textCorpusStats[0].ver !== selectedVersion)
    ) {
      // const url = `${ANALYZER_DATA_URL}/${lc}/$text_corpus_stats.json`;
      const url = `${ANALYZER_DATA_URL}/${lc}/$${lc}_${ver}_tc_stats.json`;
      axios
        .get(url, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          let data: TEXT_CORPUS_STATS_ROW_TYPE[] = response.data.data;
          data = data.map((row) => {
            if (typeof row.g_items === "string")
              row.g_items = convertStr2StrList(row.g_items as string);
            if (typeof row.p_items === "string")
              row.p_items = convertStr2StrList(row.p_items as string);
            if (typeof row.dom_items === "string")
              row.dom_items = convertStr2StrList(row.dom_items as string);
            return row;
          });
          setSelectedLanguage(lc);
          setSelectedVersion(ver);
          setTextCorpusStats(data);
        }); // then-axios
    } // if
    // If loaded and record not selected
    if (textCorpusStats && !textCorpusRec) {
      const tcrec: TEXT_CORPUS_STATS_ROW_TYPE[] = textCorpusStats.filter(
        (row) => row.algo === "" && row.sp === "",
      );
      if (tcrec && tcrec.length > 0) {
        setTextCorpusRec(tcrec[0]);
      }
      // get unique algorithmn
      const algos: string[] = [...new Set(textCorpusStats.map((row) => row.algo))].filter(
        (a) => a.length > 0,
      );
      if (algos) {
        setAlgorithms(algos);
      }
    }
  }, [
    ver,
    lc,
    selectedLanguage,
    setSelectedLanguage,
    selectedVersion,
    setSelectedVersion,
    textCorpusStats,
    setTextCorpusStats,
    textCorpusRec,
    setTextCorpusRec,
    setAlgorithms,
  ]);

  if (!lc || !ver) return <div>Error in parameters.</div>;

  if (!initDone || !CONF || !textCorpusStats || !textCorpusRec) return <>...</>;

  let cnt: number = 0;

  return (
    <>
      <Typography align="right" variant="body2">
        {intl.get("measures.has_validation") + ": "}
        {textCorpusRec.has_val ? (
          <CheckBoxIcon color="secondary" sx={{ verticalAlign: "bottom" }} />
        ) : (
          <DoNotDisturbOnIcon
            color="primary"
            sx={{ verticalAlign: "bottom" }}
          />
        )}
        &nbsp;&nbsp;&nbsp;&nbsp;
        {intl.get("measures.has_phonemiser") + ": "}
        {textCorpusRec.has_phon ? (
          <CheckBoxIcon color="secondary" sx={{ verticalAlign: "bottom" }} />
        ) : (
          <DoNotDisturbOnIcon
            color="primary"
            sx={{ verticalAlign: "bottom" }}
          />
        )}
      </Typography>
      <AlgoButtons />
      <div>
        <TextCorpusStatsTable />
      </div>
      {textCorpusRec && (
        <>
          <div>
            <FreqTable
              key={"c_freq"}
              bins={CONF.bins_chars}
              values={textCorpusRec.c_freq as number[]}
              title={"Common Voice " + lc}
              subTitle={intl.get("tbl.character_distribution")}
              // yScale= {"linear"}
              mean={textCorpusRec.c_avg}
              median={textCorpusRec.c_med}
              std={textCorpusRec.c_std}
              addTotals={true}
              addPercentageColumn={true}
              dropLastFromGraph={true}
              isXNumber={false}
              cnt={cnt++}
            />
          </div>
          {!textCorpusRec.has_val ? (
            <></>
          ) : (
            <>
              <div>
                <FreqTable
                  key={"w_freq"}
                  bins={CONF.bins_words}
                  values={textCorpusRec.w_freq as number[]}
                  title={"Common Voice " + lc}
                  subTitle={intl.get("tbl.word_distribution")}
                  // yScale= {"linear"}
                  mean={textCorpusRec.w_avg}
                  median={textCorpusRec.w_med}
                  std={textCorpusRec.w_std}
                  addTotals={true}
                  addPercentageColumn={true}
                  dropLastFromGraph={true}
                  isXNumber={false}
                  cnt={cnt++}
                />
              </div>
              <div>
                <FreqTable
                  key={"t_freq"}
                  bins={CONF.bins_tokens}
                  values={textCorpusRec.t_freq as number[]}
                  title={"Common Voice " + lc}
                  subTitle={intl.get("tbl.token_distribution")}
                  // yScale= {"linear"}
                  mean={textCorpusRec.t_avg}
                  median={textCorpusRec.t_med}
                  std={textCorpusRec.t_std}
                  addTotals={true}
                  addPercentageColumn={true}
                  dropLastFromGraph={true}
                  cnt={cnt++}
                />
              </div>
            </>
          )}
          <Grid
            container
            alignItems="stretch"
            spacing={1}
            sx={{ width: "100%", mb: "10px" }}
          >
            {textCorpusRec.dom_freq.length === 0 ? (
              <></>
            ) : (
              <Grid item sx={{ width: "34%" }}>
                <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
                  <DataTable
                    columns={countTableColumns}
                    // data={textCorpusRec.g_freq as string[][]}
                    data={mergeCountTableData(
                      (textCorpusRec.dom_items as string[]).map((s) => {
                        return intl.get("dom." + s);
                      }),
                      textCorpusRec.dom_freq,
                    )}
                    title={intl.get("tbl.domains")}
                    responsive
                    dense
                    pagination
                    paginationPerPage={20}
                    paginationComponentOptions={paginationComponentOptions}
                    direction={Direction.AUTO}
                    highlightOnHover
                    customStyles={TABLE_STYLE_DENSE}
                    // actions={exportCVSFreqTable}
                  />
                </Paper>
              </Grid>
            )}

            {textCorpusRec.g_freq.length === 0 ? (
              <></>
            ) : (
              <Grid item sx={{ width: "33%" }}>
                <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
                  <DataTable
                    columns={countTableColumns}
                    // data={textCorpusRec.g_freq as string[][]}
                    data={mergeCountTableData(
                      textCorpusRec.g_items as string[],
                      textCorpusRec.g_freq,
                    )}
                    title={intl.get("tbl.graphemes")}
                    responsive
                    dense
                    pagination
                    paginationPerPage={20}
                    paginationComponentOptions={paginationComponentOptions}
                    direction={Direction.AUTO}
                    highlightOnHover
                    customStyles={TABLE_STYLE_DENSE}
                    // actions={exportCVSFreqTable}
                  />
                </Paper>
              </Grid>
            )}

            {textCorpusRec.p_freq.length === 0 ? (
              <></>
            ) : (
              <Grid item sx={{ width: "33%" }}>
                <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
                  <DataTable
                    columns={countTableColumns}
                    // data={textCorpusRec.p_freq as string[][]}
                    data={mergeCountTableData(
                      textCorpusRec.p_items as string[],
                      textCorpusRec.p_freq,
                    )}
                    title={intl.get("tbl.phonemes")}
                    responsive
                    dense
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    paginationPerPage={20}
                    direction={Direction.AUTO}
                    highlightOnHover
                    customStyles={TABLE_STYLE_DENSE}
                    // actions={exportCVSFreqTable}
                  />
                </Paper>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export const TextCorpusMemo = memo(TextCorpus);
