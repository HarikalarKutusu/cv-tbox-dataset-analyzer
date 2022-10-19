// i10n
import intl from "react-intl-universal";
// MUI
import { Box, Container, Paper, Grid } from "@mui/material";
// Table
import DataTable, { TableColumn, Direction } from "react-data-table-component";
// Store
import { useStore } from "../stores/store";
// App
import { IFreqTableProps, IFreqTableRow } from "../helpers/tableHelper";
import { FreqChart } from "./graphs/freqChart";

export const FreqTable = (props: IFreqTableProps) => {
  const { bins, values, title, mean, median, yScale } = props;

  const { langCode } = useStore();

  if (!bins || !values || !title) {
    console.log("bins=", bins);
    console.log("values=", values);
    console.log("title=", title);
    return <></>;
  }

  const columns: TableColumn<IFreqTableRow>[] = [
    {
      id: "bin",
      name: intl.get("colnames.bin"),
      width: "80px",
      right: true,
      selector: (row) => row.bin.toLocaleString(langCode),
    },
    {
      id: "count",
      name: intl.get("colnames.count"),
      width: "150px",
      right: true,
      selector: (row) => row.count.toLocaleString(langCode),
    },
  ];

  if (values.length !== bins.length) {
    console.log("PROGRAMMER ERROR - SIZE MISMATCH IN FREQ TABLE");
    console.log("BINS=", bins.length, " VALUES=", values.length);
  }

  const tableData: IFreqTableRow[] = [];
  for (let i = 0; i < bins.length; i++) {
    tableData.push({
      bin: bins[i],
      count: values[i],
    });
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        overflow: "auto",
      }}
    >
      <Container maxWidth={false} sx={{ mt: 4, mb: 10 }}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <Grid
            container
            alignItems="stretch"
            spacing={2}
            sx={{ width: "100%" }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <DataTable
                columns={columns}
                data={tableData}
                title={title}
                responsive
                dense
                direction={Direction.AUTO}
                highlightOnHover
              />
            </Grid>
            <Grid item xs={12} sm={6} md={8} sx={{ border: "1px" }}>
              <div style={{ width: "100%", height: "100%" }}>
                <FreqChart
                  data={tableData}
                  xKey="bin"
                  yKey="count"
                  seriesName={title}
                  yScale={yScale}
                  mean={mean}
                  median={median}
                />
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};
