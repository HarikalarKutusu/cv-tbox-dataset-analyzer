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
  IFreqTableRow,
  IFreqTableProps,
  TEXT_CORPUS_CHAR_BINS,
  TEXT_CORPUS_STATS_ROW_TYPE,
  TEXT_CORPUS_TOKEN_BINS,
  TEXT_CORPUS_WORD_BINS,
} from "../helpers/tableHelper";
import { Box, Container, Grid, Paper } from "@mui/material";
import { AppBarChart } from "./graphs/barChart";
import { FreqChart } from "./graphs/freqChart";
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
          measure: intl.get("measures.unique_sentences"),
          val: textCorpusRec.uq_s,
        },
        {
          measure: intl.get("measures.unique_normalized"),
          val: textCorpusRec.uq_n,
        },
        {
          measure: intl.get("measures.has_validation"),
          val: textCorpusRec.has_val,
        },
        {
          measure: intl.get("measures.validated"),
          val: textCorpusRec.val,
        },
        {
          measure: intl.get("measures.invalidated"),
          val: textCorpusRec.s_cnt - textCorpusRec.val,
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
          val: textCorpusRec.w_total,
        },
        {
          measure: intl.get("measures.words_mean"),
          val: textCorpusRec.w_mean,
        },
        {
          measure: intl.get("measures.words_median"),
          val: textCorpusRec.w_median,
        },
        {
          measure: intl.get("measures.tokens_total"),
          val: textCorpusRec.t_total,
        },
        {
          measure: intl.get("measures.tokens_mean"),
          val: textCorpusRec.t_mean,
        },
        {
          measure: intl.get("measures.tokens_median"),
          val: textCorpusRec.t_median,
        },
      ];
    }

    const columns: TableColumn<ICustomTable>[] = [
      {
        id: "measure",
        name: intl.get("colnames.measure"),
        width: "300px",
        selector: (row: ICustomTable) => row.measure,
      },
      {
        id: "val",
        name: intl.get("colnames.value"),
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
        // pagination
        // paginationPerPage={bins.length}
        // paginationComponent={undefined}
        responsive
        dense
        direction={Direction.AUTO}
        highlightOnHover
      />
    );
  };

  // const FreqTable = (props: IFreqTableProps) => {
  //   const { bins, values, title, mean, median, yScale } = props;

  //   if (!bins || !values || !title) {
  //     console.log("bins=", bins);
  //     console.log("values=", values);
  //     console.log("title=", title);
  //     return <></>;
  //   }

  //   const columns: TableColumn<IFreqTableRow>[] = [
  //     {
  //       id: "bin",
  //       name: intl.get("colnames.bin"),
  //       width: "80px",
  //       right: true,
  //       selector: (row) => row.bin.toLocaleString(langCode),
  //     },
  //     {
  //       id: "count",
  //       name: intl.get("colnames.count"),
  //       width: "150px",
  //       right: true,
  //       selector: (row) => row.count.toLocaleString(langCode),
  //     },
  //   ];

  //   if (values.length !== bins.length) {
  //     console.log("PROGRAMMER ERROR - SIZE MISMATCH IN FREQ TABLE");
  //     console.log("BINS=", bins.length, " VALUES=", values.length);
  //   }

  //   const tableData: IFreqTableRow[] = [];
  //   for (let i = 0; i < bins.length; i++) {
  //     tableData.push({
  //       bin: bins[i],
  //       count: values[i],
  //     });
  //   }

  //   return (
  //     <Box
  //       sx={{
  //         flexGrow: 1,
  //         width: "100%",
  //         overflow: "auto",
  //       }}
  //     >
  //       <Container maxWidth={false} sx={{ mt: 4, mb: 10 }}>
  //         <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
  //           <Grid
  //             container
  //             alignItems="stretch"
  //             spacing={2}
  //             sx={{ width: "100%" }}
  //           >
  //             <Grid item xs={12} sm={6} md={4}>
  //               <DataTable
  //                 columns={columns}
  //                 data={tableData}
  //                 title={title}
  //                 // pagination
  //                 // paginationPerPage={bins.length}
  //                 // paginationComponent={undefined}
  //                 responsive
  //                 dense
  //                 direction={Direction.AUTO}
  //                 highlightOnHover
  //               />
  //             </Grid>
  //             <Grid item xs={12} sm={6} md={8} sx={{ border: "1px" }}>
  //               {/* <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}> */}
  //               <div style={{ width: "100%", height: "100%" }}>
  //                 <FreqChart
  //                   data={tableData}
  //                   xKey="bin"
  //                   yKey="count"
  //                   seriesName={title}
  //                   yScale={yScale}
  //                   mean={mean}
  //                   median={median}
  //                 />
  //               </div>
  //               {/* </Paper> */}
  //             </Grid>
  //           </Grid>
  //         </Paper>
  //       </Container>
  //     </Box>
  //   );
  // };

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

  // datasetInfo[0].defaultExpanded = true;

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
              title={intl.get("colnames.character_distribution")}
              yScale="linear"
            />
          </div>
          <div>
            <FreqTable
              key={"w_freq"}
              bins={TEXT_CORPUS_WORD_BINS}
              values={textCorpusRec?.w_freq as number[]}
              title={intl.get("colnames.word_distribution")}
              yScale="linear"
            />
          </div>
          <div>
            <FreqTable
              key={"t_freq"}
              bins={TEXT_CORPUS_TOKEN_BINS}
              values={textCorpusRec?.t_freq as number[]}
              title={intl.get("colnames.token_distribution")}
              yScale="log"
            />
          </div>
        </>
      )}
      {/* <Grid container spacing={2}>
          <Grid item>
          </Grid>
          <Grid item>
            <div>Here</div>
          </Grid>
          <Grid item>
            <div>Here</div>
          </Grid>
        </Grid> */}
    </>
  );
};
