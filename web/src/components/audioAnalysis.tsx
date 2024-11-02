// React
import { FC, memo, useEffect, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
// i10n
import intl from "react-intl-universal";
// MUI
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
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
import { ANALYZER_DATA_URL, ILoaderData } from "../helpers/appHelper";
import {
  downloadCSV,
  TABLE_STYLE,
  AUDIO_STATS_ROW_TYPE,
  convertStr2StrList,
  convertStr2NumList,
  TABLE_STYLE_DENSE,
} from "../helpers/tableHelper";
import { FreqTable } from "./freqTable";
import { CrossTabTableComponent } from "./crossTabTable";

//
// JSX
//

export type AudioAnalysisProps = {
  ver?: string;
  lc?: string;
};

export const AudioAnalysis = (props: AudioAnalysisProps) => {
  const { ver, lc } = props;

  const { initDone } = useStore();
  const { langCode } = useStore();
  const { selectedLanguage, setSelectedLanguage } = useStore();
  const { selectedVersion, setSelectedVersion } = useStore();
  const { audioStats, setAudioStats } = useStore();

  const CONF = (useLoaderData() as ILoaderData).analyzerConfig;

  const getColumns = (): TableColumn<AUDIO_STATS_ROW_TYPE>[] => {
    // const dec2 = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    const dec2 = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

    const col_alg: TableColumn<AUDIO_STATS_ROW_TYPE> = {
      id: "alg",
      name: intl.get("col.algorithm"),
      sortable: true,
      center: true,
      width: "120px",
      selector: (row: AUDIO_STATS_ROW_TYPE) => row.alg,
    };

    const col_sp: TableColumn<AUDIO_STATS_ROW_TYPE> = {
      id: "sp",
      name: intl.get("col.split"),
      sortable: true,
      right: true,
      width: "100px",
      selector: (row: AUDIO_STATS_ROW_TYPE) => row.sp,
    };

    const col_clips: TableColumn<AUDIO_STATS_ROW_TYPE> = {
      id: "clips",
      name: intl.get("col.clips"),
      sortable: true,
      right: true,
      // width: "100px",
      selector: (row: AUDIO_STATS_ROW_TYPE) =>
        row.clips ? row.clips.toLocaleString(langCode) : "-",
    };

    const col_errors: TableColumn<AUDIO_STATS_ROW_TYPE> = {
      id: "errors",
      name: intl.get("col.aa.errors"),
      sortable: true,
      right: true,
      selector: (row: AUDIO_STATS_ROW_TYPE) =>
        row.errors ? row.errors.toLocaleString(langCode) : "-",
    };

    const col_no_speech: TableColumn<AUDIO_STATS_ROW_TYPE> = {
      id: "no_speech",
      name: intl.get("col.aa.no_speech"),
      sortable: true,
      right: true,
      selector: (row: AUDIO_STATS_ROW_TYPE) =>
        row.no_vad ? row.no_vad.toLocaleString(langCode) : "-",
    };

    const col_low_power: TableColumn<AUDIO_STATS_ROW_TYPE> = {
      id: "low_power",
      name: intl.get("col.aa.low_power"),
      sortable: true,
      right: true,
      selector: (row: AUDIO_STATS_ROW_TYPE) =>
        row.low_power ? row.low_power.toLocaleString(langCode) : "-",
    };

    const col_low_snr: TableColumn<AUDIO_STATS_ROW_TYPE> = {
      id: "low_snr",
      name: intl.get("col.aa.low_snr"),
      sortable: true,
      right: true,
      selector: (row: AUDIO_STATS_ROW_TYPE) =>
        row.low_snr ? row.low_snr.toLocaleString(langCode) : "-",
    };

    const col_dur: TableColumn<AUDIO_STATS_ROW_TYPE> = {
      id: "dur",
      name: intl.get("col.aa.dur"),
      sortable: true,
      right: true,
      selector: (row: AUDIO_STATS_ROW_TYPE) =>
        row.dur ? row.dur.toLocaleString(langCode) : "-",
    };

    const col_vad_dur: TableColumn<AUDIO_STATS_ROW_TYPE> = {
      id: "vad_dur",
      name: intl.get("col.aa.vad_dur"),
      sortable: true,
      right: true,
      selector: (row: AUDIO_STATS_ROW_TYPE) =>
        row.vad_sum ? row.vad_sum.toLocaleString(langCode) : "-",
    };

    const col_vad_percentage: TableColumn<AUDIO_STATS_ROW_TYPE> = {
      id: "vad_percentage",
      name: intl.get("col.aa.vad_percentage"),
      sortable: true,
      right: true,
      selector: (row: AUDIO_STATS_ROW_TYPE) =>
        row.vadp_avg ? row.vadp_avg.toLocaleString(langCode, dec2) : "-",
    };

    return [
      col_alg,
      col_sp,
      col_clips,
      col_errors,
      col_no_speech,
      col_low_power,
      col_low_snr,
      col_dur,
      col_vad_dur,
      col_vad_percentage,
    ];
  };

  const paginationComponentOptions = {
    rowsPerPageText: intl.get("pagination.perpage"),
    rangeSeparatorText: intl.get("pagination.rangeseparator"),
    selectAllRowsItem: true,
    selectAllRowsItemText: intl.get("pagination.selectallrows"),
  };

  const mergeCountTableData = (items: string[], values: number[]): any[][] => {
    if (items.length === 0) {
      return [];
    }
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
      id: "value",
      name: intl.get("col.value"),
      selector: (row: any[]) => (row[0] ? row[0] : "-"),
    },
    {
      id: "count",
      name: intl.get("col.count"),
      right: true,
      // width: "100px",
      selector: (row: any[]) =>
        row[1] ? Number(row[1]).toLocaleString(langCode) : "-",
    },
    // {
    //   id: "percentage",
    //   name: intl.get("col.percent"),
    //   right: true,
    //   // width: "60px",
    //   selector: (row: any[]) => (row[2] ? (100 * row[2]).toFixed(3) : "-"),
    // },
  ];

  const ExpandedComponent: FC<ExpanderComponentProps<AUDIO_STATS_ROW_TYPE>> = ({
    data,
  }) => {
    if (!CONF) return <></>;

    const title: string = "Common Voice " + lc + " v" + ver;

    return (
      <>
        <Grid
          container
          alignItems="stretch"
          spacing={1}
          sx={{ width: "100%", mb: "10px" }}
        >
          <Grid sx={{ width: "17%" }}>
            <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
              <DataTable
                columns={countTableColumns}
                data={mergeCountTableData(
                  data.err_r as string[],
                  data.err_freq as number[],
                )}
                title={intl.get("tbl.aa.errors")}
                responsive
                dense
                direction={Direction.AUTO}
                highlightOnHover
                customStyles={TABLE_STYLE_DENSE}
                noDataComponent={intl.get("tbl.aa.errors.no_errors")}
              />
            </Paper>
          </Grid>
          <Grid sx={{ width: "17%" }}>
            <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
              <DataTable
                columns={countTableColumns}
                data={mergeCountTableData(
                  data.enc_r as string[],
                  data.enc_freq as number[],
                )}
                title={intl.get("tbl.aa.encoding")}
                responsive
                dense
                direction={Direction.AUTO}
                highlightOnHover
                customStyles={TABLE_STYLE_DENSE}
              />
            </Paper>
          </Grid>
          <Grid sx={{ width: "17%" }}>
            <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
              <DataTable
                columns={countTableColumns}
                data={mergeCountTableData(
                  data.chan_r as string[],
                  data.chan_freq as number[],
                )}
                title={intl.get("tbl.aa.channels")}
                responsive
                dense
                direction={Direction.AUTO}
                highlightOnHover
                customStyles={TABLE_STYLE_DENSE}
              />
            </Paper>
          </Grid>
          <Grid sx={{ width: "17%" }}>
            <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
              <DataTable
                columns={countTableColumns}
                data={mergeCountTableData(
                  data.srate_r as string[],
                  data.srate_freq as number[],
                )}
                title={intl.get("tbl.aa.sampling_rate")}
                responsive
                dense
                direction={Direction.AUTO}
                highlightOnHover
                customStyles={TABLE_STYLE_DENSE}
              />
            </Paper>
          </Grid>
          <Grid sx={{ width: "17%" }}>
            <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
              <DataTable
                columns={countTableColumns}
                data={mergeCountTableData(
                  data.brate_r as string[],
                  data.brate_freq as number[],
                )}
                title={intl.get("tbl.aa.bitrate")}
                responsive
                dense
                direction={Direction.AUTO}
                highlightOnHover
                customStyles={TABLE_STYLE_DENSE}
              />
            </Paper>
          </Grid>
        </Grid>

        <FreqTable
          key={"vad_freq"}
          bins={CONF.bins_duration}
          values={data.vad_freq}
          title={title}
          subTitle={intl.get("tbl.aa.vad_duration")}
          yScale={"linear"}
          mean={data.vad_avg}
          median={data.vad_med}
          std={data.vad_std}
          addTotals={true}
          addPercentageColumn={true}
          dropLastFromGraph={true}
        />
        {data.vadp_freq ? (
          <FreqTable
            key={"vadp_freq"}
            bins={CONF.bins_percent.slice(0, CONF.bins_percent.length - 1)}
            values={data.vadp_freq}
            title={title}
            subTitle={intl.get("tbl.aa.vad_percentage")}
            yScale={"linear"}
            mean={data.vadp_avg}
            median={data.vadp_med}
            std={data.vadp_std}
            addTotals={true}
            addPercentageColumn={true}
            dropLastFromGraph={true}
          />
        ) : (
          <></>
        )}
        <FreqTable
          key={"snr_freq"}
          bins={CONF.bins_aa_snr}
          values={data.snr_freq}
          title={title}
          subTitle={intl.get("tbl.aa.snr")}
          yScale={"linear"}
          mean={data.snr_avg}
          median={data.snr_med}
          std={data.snr_std}
          addTotals={true}
          addPercentageColumn={true}
          dropLastFromGraph={true}
        />
        <FreqTable
          key={"vad_pwr_freq"}
          bins={CONF.bins_aa_pwr}
          values={data.sp_pwr_freq}
          title={title}
          subTitle={intl.get("tbl.aa.vad_power")}
          yScale={"linear"}
          mean={data.sp_pwr_avg}
          median={data.sp_pwr_med}
          std={data.sp_pwr_std}
          addTotals={true}
          addPercentageColumn={true}
          dropLastFromGraph={true}
        />
        <FreqTable
          key={"sil_pwr_freq"}
          bins={CONF.bins_aa_pwr}
          values={data.sil_pwr_freq}
          title={title}
          subTitle={intl.get("tbl.aa.silence_power")}
          yScale={"linear"}
          mean={data.sil_pwr_avg}
          median={data.sil_pwr_med}
          std={data.sil_pwr_std}
          addTotals={true}
          addPercentageColumn={true}
          dropLastFromGraph={true}
        />
      </>
    );
  };

  const exportCVSDatasetMemo = useMemo(
    () => (
      <DownloadForOfflineIcon
        onClick={() =>
          downloadCSV(
            audioStats!,
            "cv-dataset",
            selectedLanguage + "_" + selectedVersion + "_audio_analysis_stats",
          )
        }
        color="secondary"
        sx={{ cursor: "grab" }}
      />
    ),
    [audioStats, selectedLanguage, selectedVersion],
  );

  const calcCalculatedFields = (data: AUDIO_STATS_ROW_TYPE[]) => {
    const newData: AUDIO_STATS_ROW_TYPE[] = [];
    data.forEach((row) => {
      // initialize with loaded data
      const newRow: AUDIO_STATS_ROW_TYPE = JSON.parse(JSON.stringify(row));
      // Expand stringified data
      if (typeof row.err_r === "string")
        newRow.err_r = convertStr2StrList(row.err_r as string);
      if (typeof row.err_freq === "string")
        newRow.err_freq = convertStr2NumList(row.err_freq as string);

      if (typeof row.enc_r === "string")
        newRow.enc_r = convertStr2StrList(row.enc_r as string);
      if (typeof row.enc_freq === "string")
        newRow.enc_freq = convertStr2NumList(row.enc_freq as string);

      if (typeof row.chan_r === "string")
        newRow.chan_r = convertStr2StrList(row.chan_r as string);
      if (typeof row.chan_freq === "string")
        newRow.chan_freq = convertStr2NumList(row.chan_freq as string);

      if (typeof row.srate_r === "string")
        newRow.srate_r = convertStr2StrList(row.srate_r as string);
      if (typeof row.srate_freq === "string")
        newRow.srate_freq = convertStr2NumList(row.srate_freq as string);

      if (typeof row.brate_r === "string")
        newRow.brate_r = convertStr2StrList(row.brate_r as string);
      if (typeof row.brate_freq === "string")
        newRow.brate_freq = convertStr2NumList(row.brate_freq as string);

      // append to result table
      newData.push(newRow);
    });
    // return new data
    return newData;
  };

  // Pre-process if needed (if just loaded)
  useEffect(() => {
    // requested dataset
    const reqds = lc + "_" + ver;

    if (!audioStats || lc !== selectedLanguage || ver !== selectedVersion) {
      const url = `${ANALYZER_DATA_URL}/${lc}/${reqds}_aa.json`;
      axios
        .get(url, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          let data: AUDIO_STATS_ROW_TYPE[] = response.data.data;
          data = calcCalculatedFields(data);
          setSelectedLanguage(lc);
          setSelectedVersion(ver);
          setAudioStats(data);
        }); // exios
    } // if
  }, [
    lc,
    ver,
    selectedLanguage,
    setSelectedLanguage,
    selectedVersion,
    audioStats,
    setAudioStats,
    setSelectedVersion,
  ]);

  if (!lc || !ver) {
    return <div>Error in parameters.</div>;
  }

  if (!initDone || !CONF || !audioStats) return <>...</>;

  return (
    <>
      <DataTable
        columns={getColumns()}
        data={audioStats}
        progressPending={!audioStats}
        responsive
        dense
        pagination
        paginationPerPage={25}
        paginationComponentOptions={paginationComponentOptions}
        highlightOnHover
        title={intl.get("examinepage.tab.audio-analysis")}
        defaultSortFieldId={0}
        direction={Direction.AUTO}
        persistTableHead
        expandableRows={true}
        expandableRowsComponent={ExpandedComponent}
        customStyles={TABLE_STYLE}
        actions={exportCVSDatasetMemo}
      />
    </>
  );
};

export const AudioAnalysisMemo = memo(AudioAnalysis);
