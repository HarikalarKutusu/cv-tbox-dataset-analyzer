// React
import { useEffect, useState } from "react";
import axios from "axios";
// i10n
import intl from "react-intl-universal";

// DataTable
import DataTable, { Direction, TableColumn } from "react-data-table-component";

// Store
import { useStore } from "../stores/store";

// App
import {
  convertStrList,
  TABLE_STYLE,
  TEXT_CORPUS_CHAR_BINS,
  TEXT_CORPUS_STATS_ROW_TYPE,
  TEXT_CORPUS_TOKEN_BINS,
  TEXT_CORPUS_WORD_BINS,
} from "../helpers/tableHelper";
import { FreqTable } from "./freqTable";

//
// JSX
//

export type TextCorpusProps = {
  lc?: string;
};

export const TextCorpus = (props: TextCorpusProps) => {
  const { lc } = props;

  const { initDone } = useStore();
  const { langCode } = useStore();

  // const { selectedDataset, setSelectedDataset } = useStore();
  const { textCorpusStats, setTextCorpusStats } = useStore();

  const [textCorpusRec, setTextCorpusRec] = useState<
    TEXT_CORPUS_STATS_ROW_TYPE | undefined
  >(undefined);

  interface ICustomTable {
    measure: string;
    val: string | number;
  }

  const CustomTable = () => {
    let tbl: ICustomTable[] = [];
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
          val: textCorpusRec.has_val === 1 ? textCorpusRec.s_cnt - textCorpusRec.val : "?",
        },
        {
          measure: intl.get("measures.characters_total"),
          val: textCorpusRec.c_total,
        },
        {
          measure: intl.get("measures.characters_mean"),
          val: textCorpusRec.c_mean,
        },
        {
          measure: intl.get("measures.characters_median"),
          val: textCorpusRec.c_median,
        },
        {
          measure: intl.get("measures.words_total"),
          val: textCorpusRec.has_val === 1 ? textCorpusRec.w_total : "?",
        },
        {
          measure: intl.get("measures.words_mean"),
          val: textCorpusRec.has_val === 1 ? textCorpusRec.w_mean : "?",
        },
        {
          measure: intl.get("measures.words_median"),
          val: textCorpusRec.has_val === 1 ? textCorpusRec.w_median : "?",
        },
        {
          measure: intl.get("measures.tokens_total"),
          val: textCorpusRec.has_val === 1 ? textCorpusRec.t_total : "?",
        },
        {
          measure: intl.get("measures.tokens_mean"),
          val: textCorpusRec.has_val === 1 ? textCorpusRec.t_mean : "?",
        },
        {
          measure: intl.get("measures.tokens_median"),
          val: textCorpusRec.has_val === 1 ? textCorpusRec.t_median: "?",
        },
      ];
    }

    const columns: TableColumn<ICustomTable>[] = [
      {
        id: "measure",
        name: intl.get("col.measure"),
        width: "300px",
        selector: (row: ICustomTable) => row.measure,
      },
      {
        id: "val",
        name: intl.get("col.value"),
        right: true,
        width: "100px",
        selector: (row: ICustomTable) => row.val.toLocaleString(langCode),
      },
    ];

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
      />
    );
  };


  useEffect(() => {
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
  }, [lc, textCorpusStats, setTextCorpusStats]);

  if (!lc) {
    return <div>Error in parameters.</div>;
  }

  let cnt: number = 0;

  return !textCorpusStats || !initDone ? (
    <div>...</div>
  ) : (
    <>
      <div>
        <CustomTable />
      </div>
      {textCorpusRec && (
        <>
          <div>
            <FreqTable
              key={"c_freq"}
              bins={TEXT_CORPUS_CHAR_BINS}
              values={textCorpusRec?.c_freq as number[]}
              title={"Common Voice " + lc}
              subTitle={intl.get("col.character_distribution")}
              yScale="linear"
              addTotals={true}
              addPercentageColumn={true}
              dropLastFromGraph={true}
              cnt={cnt++}
            />
          </div>
          <div>
            <FreqTable
              key={"w_freq"}
              bins={TEXT_CORPUS_WORD_BINS}
              values={textCorpusRec?.w_freq as number[]}
              title={"Common Voice " + lc}
              subTitle={intl.get("col.word_distribution")}
              yScale="linear"
              addTotals={true}
              addPercentageColumn={true}
              dropLastFromGraph={true}
              cnt={cnt++}
            />
          </div>
          <div>
            <FreqTable
              key={"t_freq"}
              bins={TEXT_CORPUS_TOKEN_BINS}
              values={textCorpusRec?.t_freq as number[]}
              title={"Common Voice " + lc}
              subTitle={intl.get("col.token_distribution")}
              yScale="log"
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
