// React
import { memo, useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
// i10n
import intl from "react-intl-universal";
// MUI
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

// DataTable
import DataTable, { Direction, TableColumn } from "react-data-table-component";

// Store
import { useStore } from "../stores/store";

// App
import { ANALYZER_DATA_URL, ILoaderData } from "./../helpers/appHelper";
import {
  convertStrList,
  downloadCSV,
  IMeasureValueTable,
  TABLE_STYLE,
  TEXT_CORPUS_STATS_ROW_TYPE,
} from "../helpers/tableHelper";
import { FreqTable } from "./freqTable";

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
  const { selectedVersion } = useStore();
  const { textCorpusStats, setTextCorpusStats } = useStore();

  const CONF = (useLoaderData() as ILoaderData).analyzerConfig;
  // const textCorpusStats = (useLoaderData() as ILoaderData).textCorpusStats;

  const [textCorpusRec, setTextCorpusRec] = useState<
    TEXT_CORPUS_STATS_ROW_TYPE | undefined
  >(undefined);

  const MeasureValueTable = () => {
    let tbl: IMeasureValueTable[] = [];
    if (textCorpusRec) {
      tbl = [
        {
          measure: intl.get("measures.sentence_count"),
          val: textCorpusRec.s_cnt,
        },
        {
          measure: intl.get("measures.unique_lower"),
          val: textCorpusRec.uq_s,
        },
        {
          measure: intl.get("measures.unique_normalized"),
          val: textCorpusRec.uq_n,
        },
        {
          measure: intl.get("measures.dup_lower"),
          val: textCorpusRec.s_cnt - textCorpusRec.uq_s,
        },
        {
          measure: intl.get("measures.dup_normalized"),
          val: textCorpusRec.s_cnt - textCorpusRec.uq_n,
        },
        {
          measure: intl.get("measures.has_validation"),
          val: textCorpusRec.has_val,
        },
        {
          measure: intl.get("measures.validated"),
          val: textCorpusRec.has_val === 1 ? textCorpusRec.val : "?",
        },
        {
          measure: intl.get("measures.invalidated"),
          val:
            textCorpusRec.has_val === 1
              ? textCorpusRec.s_cnt - textCorpusRec.val
              : "?",
        },
        {
          measure: intl.get("measures.characters_sum"),
          val: textCorpusRec.c_sum,
        },
        {
          measure: intl.get("measures.characters_avg"),
          val: textCorpusRec.c_avg,
        },
        {
          measure: intl.get("measures.characters_med"),
          val: textCorpusRec.c_med,
        },
        {
          measure: intl.get("measures.characters_std"),
          val: textCorpusRec.c_std,
        },
        {
          measure: intl.get("measures.words_sum"),
          val: textCorpusRec.has_val === 1 ? textCorpusRec.w_sum : "?",
        },
        {
          measure: intl.get("measures.words_avg"),
          val: textCorpusRec.has_val === 1 ? textCorpusRec.w_avg : "?",
        },
        {
          measure: intl.get("measures.words_med"),
          val: textCorpusRec.has_val === 1 ? textCorpusRec.w_med : "?",
        },
        {
          measure: intl.get("measures.words_std"),
          val: textCorpusRec.has_val === 1 ? textCorpusRec.w_std : "?",
        },
        {
          measure: intl.get("measures.tokens_sum"),
          val: textCorpusRec.has_val === 1 ? textCorpusRec.t_sum : "?",
        },
        {
          measure: intl.get("measures.tokens_avg"),
          val: textCorpusRec.has_val === 1 ? textCorpusRec.t_avg : "?",
        },
        {
          measure: intl.get("measures.tokens_med"),
          val: textCorpusRec.has_val === 1 ? textCorpusRec.t_med : "?",
        },
        {
          measure: intl.get("measures.tokens_std"),
          val: textCorpusRec.has_val === 1 ? textCorpusRec.t_std : "?",
        },
      ];
    }

    const columns: TableColumn<IMeasureValueTable>[] = [
      {
        id: "measure",
        name: intl.get("col.measure"),
        width: "300px",
        selector: (row: IMeasureValueTable) => row.measure,
      },
      {
        id: "val",
        name: intl.get("col.value"),
        right: true,
        width: "100px",
        selector: (row: IMeasureValueTable) => row.val.toLocaleString(langCode),
      },
    ];

    const exportCVSTextCorpusMemo = useMemo(
      () => (
        <DownloadForOfflineIcon
          onClick={() =>
            downloadCSV(
              new Array<TEXT_CORPUS_STATS_ROW_TYPE>(textCorpusRec!),
              "cv-dataset-text-corpus",
              selectedLanguage + "_" + selectedVersion,
            )
          }
          color="secondary"
          sx={{ cursor: "grab" }}
        />
      ),
      [],
    );

    return (
      <DataTable
        columns={columns}
        data={tbl}
        title={intl.get("examinepage.tab.text-corpus")}
        responsive
        dense
        direction={Direction.AUTO}
        highlightOnHover
        customStyles={TABLE_STYLE}
        actions={exportCVSTextCorpusMemo}
      />
    );
  };

  // Pre-process if needed (if just loaded)
  useEffect(() => {
    if (!textCorpusStats || lc !== selectedLanguage) {
      const url = `${ANALYZER_DATA_URL}/${lc}/$text_corpus_stats.json`;
      axios
        .get(url, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          const data: TEXT_CORPUS_STATS_ROW_TYPE[] = response.data.data;
          let result: TEXT_CORPUS_STATS_ROW_TYPE[] = [];
          data.forEach((row) => {
            if (typeof row.c_freq === "string") {
              row.c_freq = convertStrList(row.c_freq as string);
              row.w_freq = convertStrList(row.w_freq as string);
              row.t_freq = convertStrList(row.t_freq as string);
            }
            result.push(row);
          });
          setTextCorpusStats(result);
          setSelectedLanguage(lc);
        }); // exios
    } // if

    if (textCorpusStats && (!textCorpusRec || ver !== selectedVersion))
      setTextCorpusRec(
        textCorpusStats.filter((row) => row.lc === lc && row.ver === ver)[0],
      );
  }, [ver, lc, selectedLanguage, setSelectedLanguage, textCorpusRec, setTextCorpusRec, textCorpusStats, setTextCorpusStats, selectedVersion]);

  if (!lc) return <div>Error in parameters.</div>;

  if (!initDone || !CONF || !textCorpusStats || !textCorpusRec) return <>...</>;

  let cnt: number = 0;

  return (
    <>
      <div>
        <MeasureValueTable />
      </div>
      {textCorpusRec && (
        <>
          <div>
            <FreqTable
              key={"c_freq"}
              bins={CONF.bins_chars}
              values={textCorpusRec.c_freq as number[]}
              title={"Common Voice " + lc}
              subTitle={intl.get("col.character_distribution")}
              yScale="linear"
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
          <div>
            <FreqTable
              key={"w_freq"}
              bins={CONF.bins_words}
              values={textCorpusRec.w_freq as number[]}
              title={"Common Voice " + lc}
              subTitle={intl.get("col.word_distribution")}
              yScale="linear"
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
              subTitle={intl.get("col.token_distribution")}
              yScale="log"
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
    </>
  );
};

export const TextCorpusMemo = memo(TextCorpus);
