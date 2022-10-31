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
import { CONF } from "../helpers/appHelper";
import {
  convertStrList,
  TABLE_STYLE,
  REPORTED_STATS_ROW_TYPE,
} from "../helpers/tableHelper";
import { FreqTable } from "./freqTable";

//
// JSX
//

export type ReportedSentencesProps = {
  ver?: string;
  lc?: string;
};

export const ReportedSentences = (props: ReportedSentencesProps) => {
  const { ver, lc } = props;

  const { initDone } = useStore();
  const { langCode } = useStore();

  // const { selectedDataset, setSelectedDataset } = useStore();
  const { reportedSentencesStats, setReportedSentencesStats } = useStore();

  const [reportedSentencesRec, setReportedSentencesRec] =
    useState<REPORTED_STATS_ROW_TYPE>();

  const [binsReasons, setBinsReasons] = useState<string[]>([]);

  interface ICustomTable {
    measure: string;
    val: string | number;
  }

  const CustomTable = () => {
    let tbl: ICustomTable[] = [];
    if (reportedSentencesRec) {
      tbl = [
        {
          measure: intl.get("measures.reported_sum"),
          val: reportedSentencesRec.rep_sum,
        },
        {
          measure: intl.get("measures.reported_sen"),
          val: reportedSentencesRec.rep_sen,
        },
        {
          measure: intl.get("measures.reported_avg"),
          val: reportedSentencesRec.rep_avg,
        },
        {
          measure: intl.get("measures.reported_med"),
          val: reportedSentencesRec.rep_med,
        },
        {
          measure: intl.get("measures.reported_tsd"),
          val: reportedSentencesRec.rep_std,
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
        title={intl.get("examinepage.tab.reported")}
        responsive
        dense
        direction={Direction.AUTO}
        highlightOnHover
        customStyles={TABLE_STYLE}
      />
    );
  };

  useEffect(() => {
    const res: string[] = []
    CONF.bins_reasons.forEach((s) => {
      res.push(intl.get('bins_reasons.' + s))
    })
    setBinsReasons(res)
  }, [])

  useEffect(() => {
    // Text Corpus?
    if (reportedSentencesStats) {
      // if already loaded, just filter the row
      const recs = reportedSentencesStats.filter(
        (row) => row.ver === ver && row.lc === lc,
      );
      if (recs.length === 1) {
        setReportedSentencesRec(recs[0]);
      }
    } else {
      // not yet, loaded, load it
      const url = "/assets/data/$reported.json";
      axios
        .get(url, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          const data: REPORTED_STATS_ROW_TYPE[] = response.data.data;
          let result: REPORTED_STATS_ROW_TYPE[] = [];
          data.forEach((row) => {
            row.rep_freq = convertStrList(row.rep_freq as string);
            row.rea_freq = convertStrList(row.rea_freq as string);
            result.push(row);
          });
          setReportedSentencesStats(result);
          const recs = result.filter((row) => row.ver === ver && row.lc === lc);
          if (recs.length === 1) {
            setReportedSentencesRec(recs[0]);
          }
        });
    }
  }, [ver, lc, reportedSentencesStats, setReportedSentencesStats]);

  if (!lc || !ver) {
    return <div>Error in parameters.</div>;
  }

  let cnt: number = 0;

  return !reportedSentencesStats || !initDone ? (
    <div>...</div>
  ) : (
    <>
      <div>
        <CustomTable />
      </div>
      {reportedSentencesRec && (
        <>
          <div>
            <FreqTable
              key={"rep_freq"}
              bins={CONF.bins_reported}
              values={reportedSentencesRec?.rep_freq as number[]}
              title={"Common Voice " + lc}
              subTitle={intl.get("tbl.reported_freq")}
              yScale="linear"
              mean={reportedSentencesRec?.rep_avg}
              median={reportedSentencesRec?.rep_med}
              std={reportedSentencesRec?.rep_std}
              addTotals={true}
              addPercentageColumn={true}
              dropLastFromGraph={true}
              isXNumber={false}
              cnt={cnt++}
            />
          </div>
          <div>
            <FreqTable
              key={"rea_freq"}
              bins={binsReasons}
              values={reportedSentencesRec?.rea_freq as number[]}
              title={"Common Voice " + lc}
              subTitle={intl.get("tbl.reported_reasons_freq")}
              yScale="linear"
              addTotals={true}
              addPercentageColumn={true}
              dropLastFromGraph={true}
              isXNumber={false}
              cnt={cnt++}
            />
          </div>
        </>
      )}
    </>
  );
};
