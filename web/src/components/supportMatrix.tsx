// React
import { memo, useEffect } from "react";
import axios from "axios";
// i10n
import intl from "react-intl-universal";

// DataTable
import DataTable, { Direction, TableColumn } from "react-data-table-component";

// App
import { SEP_ALGO, SUPPORT_MATRIX_ROW_TYPE } from "../helpers/tableHelper";

import { useStore } from "../stores/store";
import { Button } from "@mui/material";

//
// JSX
//

export const SupportMatrix = () => {
  const { initDone } = useStore();
  const { matrixLoaded, setMatrixLoaded } = useStore();
  const { supportMatrix, setSupportMatrix } = useStore();
  const { versionFilter } = useStore();
  const { languageFilter } = useStore();

  const getColumns = (): TableColumn<SUPPORT_MATRIX_ROW_TYPE>[] => {
    interface VersionCellProps {
      lc: string;
      ver: string;
      algos: string | null;
    }

    const VersionCell = memo((props: VersionCellProps) => {
      const { lc, ver, algos } = props;
      if (!algos) {
        return <></>;
      }
      const url = "/examine/" + lc + "/" + ver;
      return (
        <Button
          href={url}
          variant="contained"
          color="secondary"
          size="small"
          sx={{ textTransform: "none", margin: 1, textAlign: "center" }}
        >
          {algos.replaceAll(SEP_ALGO, " ")}
        </Button>
      );
    });

    const col_lc: TableColumn<SUPPORT_MATRIX_ROW_TYPE> = {
      id: "lc",
      name: intl.get("colnames.locale"),
      sortable: true,
      center: true,
      width: "100px",
      selector: (row: SUPPORT_MATRIX_ROW_TYPE) => row.lc,
    };

    // const col_lang: TableColumn<SUPPORT_MATRIX_ROW_TYPE> = {
    //   id: "lang",
    //   name: intl.get("colnames.language"),
    //   sortable: true,
    //   center: true,
    //   width: "120px",
    //   selector: (row: SUPPORT_MATRIX_ROW_TYPE) => row.lang,
    // };

    const version_cols: TableColumn<SUPPORT_MATRIX_ROW_TYPE>[] = [
      {
        id: "v11_0",
        name: "v11.0",
        center: true,
        // selector: (row: SUPPORT_MATRIX_ROW_TYPE) =>
        //   row.v11_0 ? row.v11_0.replaceAll("|", " ") : "-",
        cell: (row) => <VersionCell lc={row.lc} ver="11.0" algos={row.v11_0} />,
      },
      {
        id: "v10_0",
        name: "v10.0",
        center: true,
        // selector: (row: SUPPORT_MATRIX_ROW_TYPE) =>
        //   row.v10_0 ? row.v10_0.replaceAll("|", " ") : "-",
        cell: (row) => <VersionCell lc={row.lc} ver="10.0" algos={row.v10_0} />,
      },
      {
        id: "v9_0",
        name: "v9.0",
        center: true,
        // selector: (row: SUPPORT_MATRIX_ROW_TYPE) =>
        //   row.v9_0 ? row.v9_0.replaceAll("|", " ") : "-",
        cell: (row) => <VersionCell lc={row.lc} ver="9.0" algos={row.v9_0} />,
      },
      {
        id: "v8_0",
        name: "v8.0",
        center: true,
        // selector: (row: SUPPORT_MATRIX_ROW_TYPE) =>
        //   row.v8_0 ? row.v8_0.replaceAll("|", " ") : "-",
        cell: (row) => <VersionCell lc={row.lc} ver="8.0" algos={row.v8_0} />,
      },
      {
        id: "v7_0",
        name: "v7.0",
        center: true,
        // selector: (row: SUPPORT_MATRIX_ROW_TYPE) =>
        //   row.v7_0 ? row.v7_0.replaceAll("|", " ") : "-",
        cell: (row) => <VersionCell lc={row.lc} ver="7.0" algos={row.v7_0} />,
      },
      {
        id: "v6_1",
        name: "v6.1",
        center: true,
        // selector: (row: SUPPORT_MATRIX_ROW_TYPE) =>
        //   row.v6_1 ? row.v6_1.replaceAll("|", " ") : "-",
        cell: (row) => <VersionCell lc={row.lc} ver="6.1" algos={row.v6_1} />,
      },
    ];

    let res: TableColumn<SUPPORT_MATRIX_ROW_TYPE>[] = [
      col_lc,
      // col_lang,
    ];
    if (versionFilter.length === 0) {
      res = res.concat(version_cols);
    } else {
      version_cols.forEach((ver) => {
        if (versionFilter.includes(ver.name!.valueOf().toString().slice(1))) {
          console.log("here");
          res.push(ver);
        }
      });
    }

    return res;
  };

  const paginationComponentOptions = {
    rowsPerPageText: intl.get("pagination.perpage"),
    rangeSeparatorText: intl.get("pagination.rangeseparator"),
    selectAllRowsItem: true,
    selectAllRowsItemText: intl.get("pagination.selectallrows"),
  };

  const applyFilters = (data: SUPPORT_MATRIX_ROW_TYPE[]) => {
    let res: SUPPORT_MATRIX_ROW_TYPE[] = data;
    // if (versionFilter.length > 0) {
    //   res = res.filter((row) => versionFilter.includes(row.version));
    // }
    if (languageFilter.length > 0) {
      res = res.filter((row) => languageFilter.includes(row.lc));
    }
    return res;
  };

  useEffect(() => {
    // make sure data is ready
    if (!matrixLoaded) {
      const url = "/assets/data/$support_matrix.json";
      axios
        .get(url, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          const data = response.data.data;
          setSupportMatrix(data);
          setMatrixLoaded(true);
        });
    }
  }, [matrixLoaded, setMatrixLoaded, setSupportMatrix]);

  return !supportMatrix || !initDone ? (
    <div>...</div>
  ) : (
    <>
      <DataTable
        columns={getColumns()}
        data={applyFilters(supportMatrix)}
        progressPending={!supportMatrix}
        responsive
        dense
        pagination
        paginationPerPage={10}
        paginationComponentOptions={paginationComponentOptions}
        direction={Direction.AUTO}
        highlightOnHover
        title={intl.get("browsepage.title")}
        defaultSortFieldId={0}
        // fixedHeader
        // fixedHeaderScrollHeight="300px"
        persistTableHead
        // subHeader
        // subHeaderWrap
        // subHeaderAlign={Alignment.RIGHT}
        // subHeaderComponent={Filter}
        // sortIcon={sortIcon}
        // selectableRows
        // selectableRowsHig hlight
        // selectableRowsNoSelectAll
        // selectableRowsRadio="checkbox"
        // selectableRowsComponent={Checkbox}
        // selectableRowsComponentProps={selectProps}

        // noDataComponent
        // onRowClicked
        // onRowDoubleClicked
        // onRowMouseEnter
        // onRowMouseLeave
        // onColumnOrderChange

        // sortFunction={numericSort}
        // onSort

        // expandableRows
        // expandableRowsComponent
        // expandableRowsComponentProps
      />
    </>
  );
};