// React
import { memo, useEffect } from "react";
import axios from "axios";
// i10n
import intl from "react-intl-universal";
// MUI
import { Button } from "@mui/material";

// DataTable
import DataTable, { Direction, TableColumn } from "react-data-table-component";

// App
import {
  SEP_ALGO,
  SUPPORT_MATRIX_ROW_TYPE,
  TABLE_STYLE,
} from "../helpers/tableHelper";
import { useStore } from "../stores/store";
import { getCVLanguageRecord } from "../helpers/cvHelper";

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
      name: intl.get("col.locale"),
      sortable: true,
      center: true,
      width: "100px",
      selector: (row) => row.lc,
    };

    const col_nname: TableColumn<SUPPORT_MATRIX_ROW_TYPE> = {
      id: "nname",
      name: intl.get("col.nname"),
      sortable: true,
      center: true,
      width: "120px",
      selector: (row) => getCVLanguageRecord(row.lc).nname!,
    };

    const version_cols: TableColumn<SUPPORT_MATRIX_ROW_TYPE>[] = [
      {
        id: "v12_0",
        name: "v12.0",
        center: true,
        cell: (row) => <VersionCell lc={row.lc} ver="12.0" algos={row.v12_0} />,
      },
      {
        id: "v11_0",
        name: "v11.0",
        center: true,
        // selector: (row) =>
        //   row.v11_0 ? row.v11_0.replaceAll("|", " ") : "-",
        cell: (row) => <VersionCell lc={row.lc} ver="11.0" algos={row.v11_0} />,
      },
      {
        id: "v10_0",
        name: "v10.0",
        center: true,
        cell: (row) => <VersionCell lc={row.lc} ver="10.0" algos={row.v10_0} />,
      },
      {
        id: "v9_0",
        name: "v9.0",
        center: true,
        cell: (row) => <VersionCell lc={row.lc} ver="9.0" algos={row.v9_0} />,
      },
      {
        id: "v8_0",
        name: "v8.0",
        center: true,
        cell: (row) => <VersionCell lc={row.lc} ver="8.0" algos={row.v8_0} />,
      },
      {
        id: "v7_0",
        name: "v7.0",
        center: true,
        cell: (row) => <VersionCell lc={row.lc} ver="7.0" algos={row.v7_0} />,
      },
      {
        id: "v6_1",
        name: "v6.1",
        center: true,
        cell: (row) => <VersionCell lc={row.lc} ver="6.1" algos={row.v6_1} />,
      },
      {
        id: "v5_1",
        name: "v5.1",
        center: true,
        cell: (row) => <VersionCell lc={row.lc} ver="5.1" algos={row.v5_1} />,
      },
      {
        id: "v4",
        name: "v4",
        center: true,
        cell: (row) => <VersionCell lc={row.lc} ver="4" algos={row.v4} />,
      },
      {
        id: "v3",
        name: "v3",
        center: true,
        cell: (row) => <VersionCell lc={row.lc} ver="3" algos={row.v3} />,
      },
      {
        id: "v1",
        name: "v1",
        center: true,
        cell: (row) => <VersionCell lc={row.lc} ver="1" algos={row.v1} />,
      },
    ];

    let res: TableColumn<SUPPORT_MATRIX_ROW_TYPE>[] = [
      col_lc,
      col_nname,
      // col_lang,
    ];
    if (versionFilter.length === 0) {
      res = res.concat(version_cols);
    } else {
      version_cols.forEach((ver) => {
        if (versionFilter.includes(ver.name!.valueOf().toString().slice(1))) {
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
        persistTableHead
        customStyles={TABLE_STYLE}
      />
    </>
  );
};
