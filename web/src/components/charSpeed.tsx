// React
import { FC, memo, useEffect, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
// i10n
import intl from "react-intl-universal";
// MUI
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
  CHAR_SPEED_ROW_TYPE,
  convertStr2StrList,
  convertStr2NumArr,
  IFreqTableProps,
  ICrossTabTableProps,
} from "../helpers/tableHelper";
import { FreqTable } from "./freqTable";
import { CrossTabTableComponent } from "./crossTabTable";
import { CV_AGES, CV_GENDERS } from "../helpers/cvHelper";

//
// JSX
//

export type CharSpeedProps = {
  ver?: string;
  lc?: string;
};

export const CharSpeed = (props: CharSpeedProps) => {
  const { ver, lc } = props;

  const { initDone } = useStore();
  const { langCode } = useStore();
  const { selectedLanguage, setSelectedLanguage } = useStore();
  const { selectedVersion, setSelectedVersion } = useStore();
  const { charSpeed, setCharSpeed } = useStore();

  const CONF = (useLoaderData() as ILoaderData).analyzerConfig;

  const getColumns = (): TableColumn<CHAR_SPEED_ROW_TYPE>[] => {
    // const dec2 = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    const dec3 = { minimumFractionDigits: 3, maximumFractionDigits: 3 };

    const col_alg: TableColumn<CHAR_SPEED_ROW_TYPE> = {
      id: "alg",
      name: intl.get("col.algorithm"),
      sortable: true,
      center: true,
      width: "120px",
      selector: (row: CHAR_SPEED_ROW_TYPE) => row.alg,
    };

    const col_sp: TableColumn<CHAR_SPEED_ROW_TYPE> = {
      id: "sp",
      name: intl.get("col.split"),
      sortable: true,
      right: true,
      width: "100px",
      selector: (row: CHAR_SPEED_ROW_TYPE) => row.sp,
    };

    const col_clips: TableColumn<CHAR_SPEED_ROW_TYPE> = {
      id: "clips",
      name: intl.get("col.clips"),
      sortable: true,
      right: true,
      // width: "100px",
      selector: (row: CHAR_SPEED_ROW_TYPE) =>
        row.clips ? row.clips.toLocaleString(langCode) : "-",
    };

    const col_cs_avg: TableColumn<CHAR_SPEED_ROW_TYPE> = {
      id: "cs_avg",
      name: intl.get("col.char_speed.avg"),
      sortable: true,
      right: true,
      selector: (row: CHAR_SPEED_ROW_TYPE) =>
        row.cs_avg ? row.cs_avg.toLocaleString(langCode, dec3) : "-",
    };

    const col_cs_med: TableColumn<CHAR_SPEED_ROW_TYPE> = {
      id: "cs_med",
      name: intl.get("col.char_speed.med"),
      sortable: true,
      right: true,
      selector: (row: CHAR_SPEED_ROW_TYPE) =>
        row.cs_med ? row.cs_med.toLocaleString(langCode, dec3) : "-",
    };

    const col_cs_std: TableColumn<CHAR_SPEED_ROW_TYPE> = {
      id: "cs_std",
      name: intl.get("col.char_speed.std"),
      sortable: true,
      right: true,
      selector: (row: CHAR_SPEED_ROW_TYPE) =>
        row.cs_std ? row.cs_std.toLocaleString(langCode, dec3) : "-",
    };

    return [col_alg, col_sp, col_clips, col_cs_avg, col_cs_med, col_cs_std];
  };

  const paginationComponentOptions = {
    rowsPerPageText: intl.get("pagination.perpage"),
    rangeSeparatorText: intl.get("pagination.rangeseparator"),
    selectAllRowsItem: true,
    selectAllRowsItemText: intl.get("pagination.selectallrows"),
  };

  const ExpandedComponent: FC<ExpanderComponentProps<CHAR_SPEED_ROW_TYPE>> = ({
    data,
  }) => {
    if (!CONF) return <></>;

    const title: string = "Common Voice " + lc + " v" + ver;

    // decide on bin
    const cs_bins: number[] =
      data.cs_avg < CONF.cs_threshold ? CONF.bins_cs_low : CONF.bins_cs_high;
    // const ch_bins: number[] =
    //   data.cs_avg < CONF.cs_threshold ? CONF.bins_cs_low : CONF.bins_cs_high;

    const expFreqViews: IFreqTableProps[] = [
      {
        bins: cs_bins,
        values: data.cs_freq,
        title: title,
        subTitle: intl.get("tbl.char_speed"),
        mean: data.cs_avg,
        median: data.cs_med,
        std: data.cs_std,
        addPercentageColumn: true,
        addTotals: true,
        dropLastFromGraph: true,
        // yScale: "linear",
      },
    ];

    const extCrossTabViews: ICrossTabTableProps[] = [
      {
        data: data.cs2s as number[][],
        rowLabels: data.cs_r as string[],
        colLabels: data.cs2s_c as string[],
        title: title,
        subTitle: intl.get("tbl.char_speed_vs_sentence_len"),
        useRowRange: true,
        useColRange: true,
        useHeatMap: true,
      },
      {
        data: data.cs2g as number[][],
        rowLabels: data.cs_r as string[],
        colLabels: (CV_GENDERS as string[]).slice(0, -1),
        title: title,
        subTitle: intl.get("tbl.char_speed_vs_gender"),
        useRowRange: true,
        useColRange: false,
        useHeatMap: true,
      },
      {
        data: data.cs2a as number[][],
        rowLabels: data.cs_r as string[],
        colLabels: (CV_AGES as string[]).slice(0, -1),
        title: title,
        subTitle: intl.get("tbl.char_speed_vs_age"),
        useRowRange: true,
        useColRange: false,
        useHeatMap: true,
      },
    ];
    return (
      <>
        {expFreqViews.map((ev, index) => {
          return (
            <FreqTable
              key={"cs_freq_" + index}
              bins={ev.bins}
              values={ev.values}
              title={title}
              subTitle={ev.subTitle}
              yScale={ev.yScale}
              mean={ev.mean}
              median={ev.median}
              std={ev.std}
              addTotals={ev.addTotals}
              addPercentageColumn={ev.addPercentageColumn}
              dropLastFromGraph={ev.dropLastFromGraph}
            />
          );
        })}
        {extCrossTabViews.map((ev, index) => {
          return (
            <CrossTabTableComponent
              key={"cs_ct_" + index}
              data={ev.data}
              rowLabels={ev.rowLabels}
              colLabels={ev.colLabels}
              title={ev.title}
              subTitle={ev.subTitle}
              useColRange={ev.useColRange}
              useRowRange={ev.useRowRange}
              useHeatMap={ev.useHeatMap}
            />
          );
        })}
      </>
    );
  };

  const exportCVSDatasetMemo = useMemo(
    () => (
      <DownloadForOfflineIcon
        onClick={() =>
          downloadCSV(
            charSpeed!,
            "cv-dataset",
            selectedLanguage + "_" + selectedVersion + "_char_speed_data",
          )
        }
        color="secondary"
        sx={{ cursor: "grab" }}
      />
    ),
    [charSpeed, selectedLanguage, selectedVersion],
  );

  const calcCalculatedFields = (data: CHAR_SPEED_ROW_TYPE[]) => {
    const newData: CHAR_SPEED_ROW_TYPE[] = [];
    data.forEach((row) => {
      // initialize with loaded data
      const newRow: CHAR_SPEED_ROW_TYPE = JSON.parse(JSON.stringify(row));
      // Expand stringified data
      if (typeof row.cs_r === "string")
        newRow.cs_r = convertStr2StrList(row.cs_r as string);
      if (typeof row.cs2s_c === "string")
        newRow.cs2s_c = convertStr2StrList(row.cs2s_c as string);
      if (typeof row.cs2s === "string")
        newRow.cs2s = convertStr2NumArr(row.cs2s as string);
      if (typeof row.cs2g === "string")
        newRow.cs2g = convertStr2NumArr(row.cs2g as string);
      if (typeof row.cs2a === "string")
        newRow.cs2a = convertStr2NumArr(row.cs2a as string);

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

    if (!charSpeed || lc !== selectedLanguage || ver !== selectedVersion) {
      const url = `${ANALYZER_DATA_URL}/${lc}/${reqds}_cs.json`;
      axios
        .get(url, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          let data: CHAR_SPEED_ROW_TYPE[] = response.data.data;
          data = calcCalculatedFields(data);
          setSelectedLanguage(lc);
          setSelectedVersion(ver);
          setCharSpeed(data);
        }); // exios
    } // if
  }, [
    lc,
    ver,
    selectedLanguage,
    setSelectedLanguage,
    selectedVersion,
    charSpeed,
    setCharSpeed,
    setSelectedVersion,
  ]);

  if (!lc || !ver) {
    return <div>Error in parameters.</div>;
  }

  if (!initDone || !CONF || !charSpeed) return <>...</>;

  return (
    <>
      <DataTable
        columns={getColumns()}
        data={charSpeed}
        progressPending={!charSpeed}
        responsive
        dense
        pagination
        paginationPerPage={25}
        paginationComponentOptions={paginationComponentOptions}
        highlightOnHover
        title={intl.get("examinepage.tab.char-speed")}
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

export const CharSpeedMemo = memo(CharSpeed);
