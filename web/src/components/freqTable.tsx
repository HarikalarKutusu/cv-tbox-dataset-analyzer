// i10n
import intl from "react-intl-universal";
// MUI
import { Box, Container, Paper, Grid } from "@mui/material";
// Table
import DataTable, { TableColumn, Direction } from "react-data-table-component";
// Store
import { useStore } from "../stores/store";
// App
import {
  IFreqTableProps,
  IFreqTableRow,
  TABLE_STYLE,
} from "../helpers/tableHelper";
import { FreqChart } from "./graphs/freqChart";

export const FreqTable = (props: IFreqTableProps) => {
  let {
    bins,
    values,
    title,
    subTitle,
    yScale = "linear",
    mean,
    median,
    dropLastFromGraph = false,
    addTotals = false,
    addPercentageColumn = false,
    cnt,
  } = props;

  const { langCode } = useStore();

  if (!bins || !values || !title) {
    console.log("bins=", bins);
    console.log("values=", values);
    console.log("title=", title);
    return <></>;
  }

  const getColumns = (): TableColumn<IFreqTableRow>[] => {
    const dec2 = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    // const dec3 = { minimumFractionDigits: 3, maximumFractionDigits: 3 };
    let cols: TableColumn<IFreqTableRow>[] = [
      {
        id: "bin",
        name: intl.get("col.bin"),
        // width: "100px",
        right: true,
        selector: (row) => row.bin.toLocaleString(langCode),
      },
      {
        id: "count",
        name: intl.get("col.count"),
        // width: "150px",
        right: true,
        selector: (row) => row.val.toLocaleString(langCode),
      },
    ];
    if (addPercentageColumn) {
      cols.push({
        id: "percentage",
        name: intl.get("col.percent"),
        // width: "150px",
        right: true,
        selector: (row) =>
          row.percentage ? row.percentage.toLocaleString(langCode, dec2) : "-",
      });
    }
    return cols;
  };

  if (values.length !== bins.length) {
    console.log("PROGRAMMER ERROR - SIZE MISMATCH IN FREQ TABLE");
    console.log("BINS=", bins.length, " VALUES=", values.length);
  }

  // Prep table
  const tableData: IFreqTableRow[] = [];
  let total: number = 0;
  for (let i = 0; i < bins.length; i++) {
    total += values[i] as number;
    tableData.push({
      bin: bins[i],
      val: values[i],
    });
  }
  // Add totals if requested
  if (addTotals) {
    tableData.push({
      bin: intl.get("row.total"),
      val: total,
    });
  }
  // Add percentage column if requested
  if (addPercentageColumn) {
    for (let i = 0; i < tableData.length; i++) {
      tableData[i].percentage = 100 * ((tableData[i].val as number) / total);
    }
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        overflow: "auto",
      }}
    >
      <Container
        maxWidth={false}
        sx={{ p: "0", mt: "10px", mb: "10px", width: "100%" }}
      >
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <Grid
            container
            alignItems="stretch"
            spacing={0}
            sx={{ width: "100%", mb: "10px" }}
          >
            <Grid item xs={12} sm={6} md={4}>
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
              />
            </Grid>
            <Grid item xs={12} sm={6} md={8} sx={{ border: "1px" }}>
              <div style={{ width: "100%", height: "100%" }}>
                <FreqChart
                  data={dropLastFromGraph ? tableData.slice(0, -1) : tableData}
                  xKey="bin"
                  yKey="val"
                  seriesName={title}
                  yScale={yScale}
                  mean={mean}
                  median={median}
                  title={title}
                  subTitle={subTitle}
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
