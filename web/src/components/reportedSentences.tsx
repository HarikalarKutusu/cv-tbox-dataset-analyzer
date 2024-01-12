// React
import { memo, useEffect, useMemo, useState } from "react";
// i10n
import intl from "react-intl-universal";
// MUI
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

// DataTable
import DataTable, { Direction, TableColumn } from "react-data-table-component";

// Store
import { useStore } from "../stores/store";

// App
import { ANALYZER_DATA_URL, ILoaderData } from "../helpers/appHelper";
import {
  convertStrList,
  downloadCSV,
  IMeasureValueTable,
  TABLE_STYLE,
  REPORTED_STATS_ROW_TYPE,
} from "../helpers/tableHelper";
import { FreqTable } from "./freqTable";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

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
  const { selectedLanguage, setSelectedLanguage } = useStore();
  const { selectedVersion } = useStore();
  const { reportedSentences, setReportedSentences } = useStore();

  const [reportedSRec, setReportedSRec] = useState<
    REPORTED_STATS_ROW_TYPE | undefined
  >(undefined);

  const [binsReasons, setBinsReasons] = useState<string[]>([]);

  const CONF = (useLoaderData() as ILoaderData).analyzerConfig;
  // const reportedSStats = (useLoaderData() as ILoaderData)
  //   .reportedSentencesStats;

  const MeasureValueTable = () => {
    let tbl: IMeasureValueTable[] = [];
    if (reportedSRec) {
      tbl = [
        {
          measure: intl.get("measures.reported_sum"),
          val: reportedSRec.rep_sum,
        },
        {
          measure: intl.get("measures.reported_sen"),
          val: reportedSRec.rep_sen,
        },
        {
          measure: intl.get("measures.reported_avg"),
          val: reportedSRec.rep_avg,
        },
        {
          measure: intl.get("measures.reported_med"),
          val: reportedSRec.rep_med,
        },
        {
          measure: intl.get("measures.reported_tsd"),
          val: reportedSRec.rep_std,
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

    const exportCVSReportedMemo = useMemo(
      () => (
        <DownloadForOfflineIcon
          onClick={() =>
            downloadCSV(
              new Array<REPORTED_STATS_ROW_TYPE>(reportedSRec!),
              "cv-dataset-reported-sentences",
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
        title={intl.get("examinepage.tab.reported")}
        responsive
        dense
        direction={Direction.AUTO}
        highlightOnHover
        customStyles={TABLE_STYLE}
        actions={exportCVSReportedMemo}
      />
    );
  };

  // translate bin names for reporting reasons
  useEffect(() => {
    if (CONF) {
      const res: string[] = [];
      CONF.bins_reasons.forEach((s) => {
        res.push(intl.get("bins_reasons." + s));
      });
      setBinsReasons(res);
    }
  }, [CONF]);

  // Pre-process if needed (if just loaded)
  useEffect(() => {
    if (!reportedSentences || lc !== selectedLanguage) {
      const url = `${ANALYZER_DATA_URL}/${lc}/$reported.json`;
      axios
        .get(url, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          const data: REPORTED_STATS_ROW_TYPE[] = response.data.data;
          let result: REPORTED_STATS_ROW_TYPE[] = [];
          data.forEach((row) => {
            if (typeof row.rep_freq === "string") {
              row.rep_freq = convertStrList(row.rep_freq as string);
              row.rea_freq = convertStrList(row.rea_freq as string);
            }
            result.push(row);
          });
          setReportedSentences(result);
          setSelectedLanguage(lc);
        }); // exios
    } // if

    // If loaded and (record not selected or version changed)
    if (reportedSentences && (!reportedSRec || ver !== selectedVersion)) {
      const recs: REPORTED_STATS_ROW_TYPE[] = reportedSentences.filter(
        (row) => row.ver === ver && row.lc === lc,
      );
      // might not have reported sentences
      if (recs.length === 1) {
        const rec: REPORTED_STATS_ROW_TYPE = recs[0];
        setReportedSRec(rec);
      } else {
        setReportedSRec(undefined);
      }
    }
  }, [
    lc,
    ver,
    selectedLanguage,
    setSelectedLanguage,
    selectedVersion,
    reportedSentences,
    setReportedSentences,
    reportedSRec,
    setReportedSRec,
  ]);

  if (!lc || !ver) {
    return <div>Error in parameters.</div>;
  }

  if (!initDone || !CONF || !reportedSentences || !reportedSRec)
    return <>...</>;

  let cnt: number = 0;

  return (
    <>
      <div>
        <MeasureValueTable />
      </div>
      {reportedSRec && (
        <>
          <div>
            <FreqTable
              key={"rep_freq"}
              bins={CONF.bins_reported}
              values={reportedSRec.rep_freq as number[]}
              title={"Common Voice " + lc}
              subTitle={intl.get("tbl.reported_freq")}
              yScale="linear"
              mean={reportedSRec.rep_avg}
              median={reportedSRec.rep_med}
              std={reportedSRec.rep_std}
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
              values={reportedSRec.rea_freq as number[]}
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

export const ReportedSentencesMemo = memo(ReportedSentences);
