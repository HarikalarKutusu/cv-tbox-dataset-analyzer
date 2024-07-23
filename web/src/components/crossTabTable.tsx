//
// CrossTab Table Component creation
//
// React
import { useMemo } from "react";
// DataTable
import DataTable, { TableColumn, Direction } from "react-data-table-component";
// MUI
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

// App
import {
  downloadCSV,
  ICrossTabTableProps,
  TCrossTabTableRow,
  TABLE_STYLE,
} from "../helpers/tableHelper";
// Store
import { useStore } from "../stores/store";

export const CrossTabTableComponent = (props: ICrossTabTableProps) => {
  const {
    data,
    rowLabels,
    colLabels,
    // title = "TITLE",
    subTitle = "SUBTITLE",
    useColRange = false,
    useRowRange = false,
    useHeatMap = false,
  } = props;
  const { selectedLanguage, selectedVersion } = useStore();

  const getColumns = (): TableColumn<TCrossTabTableRow>[] => {
    const cols: TableColumn<TCrossTabTableRow>[] = [
      {
        id: "bin",
        name: "bin", //intl.get("col.algorithm"),
        sortable: false,
        width: "70px",
        right: false,
        selector: (row: TCrossTabTableRow) => row[0],
      },
    ];
    colLabels.forEach((colNum, inx) => {
      const colLbl = useColRange
        ? "[" +
          colNum.toString() +
          (colLabels[inx + 1] ? "-" + colLabels[inx + 1] + ")" : "+")
        : colNum.toString();
      inx++;
      cols.push({
        id: colLbl,
        name: colLbl,
        sortable: false,
        width: "70px",
        right: true,
        selector: (row: TCrossTabTableRow) => row[inx],
      });
    });
    return cols;
  };

  const getDataRecords = (): TCrossTabTableRow[] => {
    let recs: TCrossTabTableRow[] = [];
    data.forEach((row, inx) => {
      let rec: TCrossTabTableRow = [];
      rec[0] = useRowRange
        ? "[" +
          rowLabels[inx].toString() +
          (rowLabels[inx + 1] ? "-" + rowLabels[inx + 1] + ")" : "+")
        : rowLabels[inx].toString();
      recs.push(rec.concat(row.map((x) => (x === 0 ? "" : x))));
    });
    return recs;
  };

  const dataRecs = getDataRecords();

  const exportCVSDatasetMemo = useMemo(
    () => (
      <DownloadForOfflineIcon
        onClick={() =>
          downloadCSV(
            dataRecs!,
            "cv-dataset",
            selectedLanguage + "_" + selectedVersion + "_" + subTitle.replace(" ", "_"),
          )
        }
        color="secondary"
        sx={{ cursor: "grab" }}
      />
    ),
    [dataRecs, selectedLanguage, selectedVersion, subTitle],
  );

  // [TODO] HeatMap
  return (
    <>
      <DataTable
        columns={getColumns()}
        data={dataRecs}
        responsive
        dense
        highlightOnHover
        title={subTitle}
        defaultSortFieldId={0}
        direction={Direction.AUTO}
        persistTableHead
        customStyles={TABLE_STYLE}
        actions={exportCVSDatasetMemo}
      />
      <div>&nbsp;</div>
      {useHeatMap ? <></> : <></>}
      <div>&nbsp;</div>
    </>
  );
};
