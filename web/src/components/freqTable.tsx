// react
import { useMemo } from "react";
// i10n
import intl from "react-intl-universal";
// MUI
import { Box, Container, Paper, Grid, Alert } from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
// Table
import DataTable, { TableColumn, Direction } from "react-data-table-component";
// Store
import { useStore } from "../stores/store";
// App
import {
  downloadCSV,
  IFreqTableProps,
  IFreqTableRow,
  TABLE_STYLE,
} from "../helpers/tableHelper";
import { FreqChart } from "./graphs/freqChart";
import { cleanFn } from "../helpers/appHelper";

export const FreqTable = (props: IFreqTableProps) => {
  const {
    bins,
    values,
    title,
    subTitle,
    yScale = "linear",
    mean,
    median,
    std,
    dropLastFromGraph = false,
    addTotals = false,
    addPercentageColumn = false,
    isXNumber = false,
    cnt,
  } = props;

  const { langCode } = useStore();
  const { selectedLanguage, selectedVersion } = useStore();

  let tableData: IFreqTableRow[];

  // if (!values || values.length !== bins.length)
  //   return <Alert severity="warning">{intl.get("warn.no_data")}</Alert>;

  const getColumns = (): TableColumn<IFreqTableRow>[] => {
    const dec2 = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    // const dec3 = { minimumFractionDigits: 3, maximumFractionDigits: 3 };
    let cols: TableColumn<IFreqTableRow>[] = [
      {
        id: "bin",
        name: intl.get("col.bin"),
        minWidth: "100px",
        maxWidth: "150px",
        right: true,
        selector: (row) =>
          row.bin !== undefined ? row.bin.toLocaleString(langCode) : "?",
      },
      {
        id: "count",
        name: intl.get("col.value"),
        width: "100px",
        right: true,
        selector: (row) =>
          row.val !== undefined ? row.val.toLocaleString(langCode) : "?",
      },
    ];
    if (addPercentageColumn) {
      cols.push({
        id: "percentage",
        name: intl.get("col.percent"),
        width: "100px",
        right: true,
        selector: (row) =>
          row.percentage !== undefined
            ? row.percentage.toLocaleString(langCode, dec2)
            : "-",
      });
    }
    return cols;
  };

  if (values.length !== bins.length) {
    console.log("PROGRAMMER ERROR - SIZE MISMATCH IN FREQ TABLE");
    console.log("BINS=", bins.length, " VALUES=", values.length);
    console.log("BINS=", bins);
    console.log("VALUES=", values);
  }

  // Prep table
  tableData = [];
  let total: number = 0;
  let isNonNumeric: boolean = isNaN(Number(bins[0]));
  let binMaybestr: string | number = "";
  for (let i = 0; i < bins.length; i++) {
    total += values[i] as number;
    if (isNonNumeric) {
      binMaybestr = bins[i].toString();
    } else {
      binMaybestr = bins[i];
      if (i < bins.length - 1 && Number(bins[i + 1]) - Number(bins[i]) !== 1) {
        binMaybestr =
          "[" +
          binMaybestr.toLocaleString(langCode) +
          " - " +
          bins[i + 1].toLocaleString(langCode) +
          ")";
      } else if (i === bins.length - 1) {
        binMaybestr = "[" + binMaybestr.toLocaleString(langCode) + " + ]";
      }
    }

    tableData.push({
      // bin: bins[i],
      bin: binMaybestr,
      val: values[i] as number,
    });
  }
  // Add totals if requested
  if (addTotals) {
    tableData.push({
      bin: intl.get("row.total"),
      val: total,
    });
  } else {
    // already has totals
    total = total / 2;
  }
  // Add percentage column if requested
  if (addPercentageColumn) {
    for (let i = 0; i < tableData.length; i++) {
      tableData[i].percentage = 100 * ((tableData[i].val as number) / total);
    }
  }

  // const final_bins: (string|number)[] = []
  // const final_values: (string|number)[] = []
  // tableData.forEach((row) => {
  //   final_bins.push(row.bin)
  //   final_values.push(row.val)
  // })

  const exportCVSFreqTable = useMemo(
    () => (
      <DownloadForOfflineIcon
        onClick={() =>
          downloadCSV(
            tableData!,
            "cv-dataset-freq-dist-" + cleanFn(subTitle),
            selectedLanguage + "_" + selectedVersion,
          )
        }
        color="primary"
        sx={{ cursor: "grab" }}
      />
    ),
    [selectedLanguage, selectedVersion, subTitle, tableData],
  );

  return !values ? (
    <Alert severity="warning">{intl.get("warn.no_data")}</Alert>
  ) : values.length !== bins.length ? (
    <Alert severity="error">
      {intl.get("error.bad_data") +
        " :" +
        values.length.toString() +
        " !== " +
        bins.length.toString()}
    </Alert>
  ) : (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        overflow: "auto",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          pl: "1px !important",
          pr: "1px !important",
          mt: "10px",
          mb: "10px",
          width: "100%",
        }}
      >
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <Grid
            container
            alignItems="stretch"
            spacing={0}
            sx={{ width: "100%", mb: "10px" }}
          >
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <DataTable
                columns={getColumns()}
                data={tableData}
                // title={title}
                title={subTitle}
                responsive
                dense
                direction={Direction.AUTO}
                highlightOnHover
                customStyles={TABLE_STYLE}
                actions={exportCVSFreqTable}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={8}
              lg={8}
              xl={8}
              sx={{ border: "1px" }}
            >
              <div style={{ width: "100%", height: "100%" }}>
                <FreqChart
                  data={dropLastFromGraph ? tableData.slice(0, -1) : tableData}
                  xKey="bin"
                  yKey="val"
                  seriesName={title}
                  yScale={yScale}
                  mean={mean}
                  median={median}
                  std={std}
                  title={title}
                  subTitle={subTitle}
                  isXNumber={isXNumber}
                  cnt={cnt}
                />
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};
