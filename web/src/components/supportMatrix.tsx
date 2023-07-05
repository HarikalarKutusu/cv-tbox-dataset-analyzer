// React
import { memo } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
// i10n
import intl from "react-intl-universal";
// MUI
import { Button } from "@mui/material";

// DataTable
import DataTable, { Direction, TableColumn } from "react-data-table-component";

// App
import { ILoaderData } from "../helpers/appHelper";
import {
  SEP_ALGO,
  SUPPORT_MATRIX_ROW_TYPE,
  TABLE_STYLE,
} from "../helpers/tableHelper";
import { useStore } from "../stores/store";
import { CV_LANGUAGE_ROW } from "../helpers/cvHelper";

//
// JSX
//

export const SupportMatrix = () => {
  const { initDone, versionFilter, languageFilter } = useStore();
  const navigate = useNavigate();

  const supportMatrix = (useLoaderData() as ILoaderData).supportMatrix;
  const cvLanguages = (useLoaderData() as ILoaderData).cvLanguages;

  const handleNavigate = (url: string) => {
    navigate(url, { replace: true });
  };

  const getCVLanguageRecord = (lc: string): CV_LANGUAGE_ROW | null => {
    if (cvLanguages) {
      return cvLanguages.filter((row) => row.name === lc)[0];
    } else return null;
  };

  const getColumns = (): TableColumn<SUPPORT_MATRIX_ROW_TYPE>[] => {
    interface VersionCellProps {
      lc: string;
      ver: string;
      algos: string | null;
    }

    const VersionCell = memo((props: VersionCellProps) => {
      const { lc, ver, algos } = props;
      if (!algos || !lc || !ver) {
        return <></>;
      }
      const url = "/examine/" + lc + "/" + ver;
      return (
        <Button
          onClick={() => handleNavigate(url)}
          variant="contained"
          color="secondary"
          size="small"
          sx={{
            textTransform: "none",
            margin: "2px",
            padding: "8px 2px",
            textAlign: "center",
          }}
        >
          {algos.replaceAll(SEP_ALGO, " ")}
        </Button>
      );
    });

    VersionCell.displayName = "VersionCell";

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
      selector: (row) =>
        cvLanguages ? getCVLanguageRecord(row.lc)!.native_name! : "",
    };

    const version_cols: TableColumn<SUPPORT_MATRIX_ROW_TYPE>[] = [
      {
        id: "v14_0",
        name: "v14.0",
        center: true,
        width: "70px",
        cell: (row) => <VersionCell lc={row.lc} ver="14.0" algos={row.v14_0} />,
      },
      {
        id: "v13_0",
        name: "v13.0",
        center: true,
        width: "70px",
        cell: (row) => <VersionCell lc={row.lc} ver="13.0" algos={row.v13_0} />,
      },
      {
        id: "v12_0",
        name: "v12.0",
        center: true,
        width: "70px",
        cell: (row) => <VersionCell lc={row.lc} ver="12.0" algos={row.v12_0} />,
      },
      {
        id: "v11_0",
        name: "v11.0",
        center: true,
        width: "70px",
        cell: (row) => <VersionCell lc={row.lc} ver="11.0" algos={row.v11_0} />,
      },
      {
        id: "v10_0",
        name: "v10.0",
        center: true,
        width: "70px",
        cell: (row) => <VersionCell lc={row.lc} ver="10.0" algos={row.v10_0} />,
      },
      {
        id: "v9_0",
        name: "v9.0",
        center: true,
        width: "70px",
        cell: (row) => <VersionCell lc={row.lc} ver="9.0" algos={row.v9_0} />,
      },
      {
        id: "v8_0",
        name: "v8.0",
        center: true,
        width: "70px",
        cell: (row) => <VersionCell lc={row.lc} ver="8.0" algos={row.v8_0} />,
      },
      {
        id: "v7_0",
        name: "v7.0",
        center: true,
        width: "70px",
        cell: (row) => <VersionCell lc={row.lc} ver="7.0" algos={row.v7_0} />,
      },
      {
        id: "v6_1",
        name: "v6.1",
        center: true,
        width: "70px",
        cell: (row) => <VersionCell lc={row.lc} ver="6.1" algos={row.v6_1} />,
      },
      {
        id: "v5_1",
        name: "v5.1",
        center: true,
        width: "70px",
        cell: (row) => <VersionCell lc={row.lc} ver="5.1" algos={row.v5_1} />,
      },
      {
        id: "v4",
        name: "v4",
        center: true,
        width: "70px",
        cell: (row) => <VersionCell lc={row.lc} ver="4" algos={row.v4} />,
      },
      {
        id: "v3",
        name: "v3",
        center: true,
        width: "70px",
        cell: (row) => <VersionCell lc={row.lc} ver="3" algos={row.v3} />,
      },
      {
        id: "v1",
        name: "v1",
        center: true,
        width: "70px",
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
        highlightOnHover
        title={intl.get("browsepage.title")}
        direction={Direction.AUTO}
        defaultSortFieldId={0}
        persistTableHead
        customStyles={TABLE_STYLE}
      />
    </>
  );
};

export const SupportMatrixMemo = memo(SupportMatrix);
