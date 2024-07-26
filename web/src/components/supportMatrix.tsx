// React
import { memo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
// i10n
import intl from "react-intl-universal";
// MUI
import { Box, Button } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { red, pink, orange, cyan, teal } from "@mui/material/colors";

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



type TColorScale = [number, number, string];
const colorScale: TColorScale[] = [
  // Low - Analogous Color (0 <= x < 30)
  [0, 1, "#f62379"],
  [1, 5, "#e42175"],
  [5, 10, "#cd1f6e"],
  [10, 20, "#b71c6a"],
  [20, 30, "#911760"],
  // Higher Resource - Analogous Color (30 <= x < 100)
  [30, 40, "#c88d2a"],
  [40, 50, "#c58325"],
  [50, 60, "#be7620"],
  [60, 80, "#b76a1c"],
  [80, 100, "#ab5618"],
  // Usable - Complementary (100 <= x < 1000)
  [100, 200, "#00a7a6"],
  [200, 300, "#009793"],
  [300, 400, "#008a86"],
  [400, 500, "#007a74"],
  [500, 750, "#006a64"],
  [750, 1000, "#004e46"],
  // High Resource - Triadic (1000 <= x < 10000)
  [1000, 2000, "#08a810"],
  [2000, 3000, "#009600"],
  [3000, 5000, "#008500"],
  [5000, 99999999, "#006600"],
];

//
// JSX
//

const ColorLegend = () => {
  const colors = colorScale;
  colors.reverse()
  return (
    <>
      {intl.get("browsepage.legend.title")}&nbsp;
      {colors.map((row) => {
        return (
          <Button
            key={row[2]}
            variant="contained"
            size="small"
            sx={{
              color: "#eee",
              backgroundColor: row[2],
              textTransform: "none",
              margin: "0px",
              padding: "0px",
              textAlign: "center",
              width: "25px",
              maxWidth: "25px",
              height: "35px",
              maxHeight: "35px",
              whiteSpace: "no-wrap",
              lineHeight: "15px",
            }}
          >
            {row[0]}
            <br />
            {row[1] === 99999999 ? "+" : row[1]}
          </Button>
        );
      })}
    </>
  );
};


export const SupportMatrix = () => {
  const { initDone, versionFilter, languageFilter } = useStore();
  const { langCode } = useStore();
  const [showOlder, setShowOlder] = useState(true);

  const navigate = useNavigate();
  
  const supportMatrix = (useLoaderData() as ILoaderData).supportMatrix;
  const cvLanguages = (useLoaderData() as ILoaderData).cvLanguages;
  // const CONF = (useLoaderData() as ILoaderData).analyzerConfig;

  const dec1 = { minimumFractionDigits: 1, maximumFractionDigits: 1 };

  const handleNavigate = (lc: string, ver: string) => {
    const url = `/examine/${lc}/${ver}`;
    navigate(url, { replace: true });
  };

  const handleNewTab = (lc: string, ver: string) => {
    const loc: Location = window.location
    const port: string = loc.port ? `:${loc.port}` : "";
    const url = `${loc.protocol}//${loc.hostname}${port}/examine/${lc}/${ver}`;
    console.log(url)
    window.open(url, "_blank");
  };

  const getCVLanguageRecord = (lc: string): CV_LANGUAGE_ROW | null => {
    if (cvLanguages) {
      const recs: CV_LANGUAGE_ROW[] = cvLanguages.filter(
        (row) => row.name === lc,
      );
      if (recs) {
        return recs[0];
      } else {
        return null;
      }
    } else return null;
  };

  const getColumns = (): TableColumn<SUPPORT_MATRIX_ROW_TYPE>[] => {
    interface VersionCellProps {
      lc: string;
      ver: string;
      algos: string | null;
    }

    const getColor = (x: number): string => {
      return colorScale.filter((c) => x >= c[0] && x < c[1])[0][2];
    };

    const VersionCell = memo((props: VersionCellProps) => {
      const { lc, ver, algos } = props;
      if (!algos || !lc || !ver) {
        return <></>;
      }
      let algo_list: string[] = algos.split(SEP_ALGO);
      const dur: number = (Number(algo_list[0]));
      const alg_display = algo_list.slice(1).join(" ");
      const bgColor: string = getColor(dur);
      const tooltip: string = `${intl.get("browsepage.legend.title")} ${dur.toLocaleString(
        langCode,
        dec1,
      )}h\n${intl.get("browsepage.tooltip.right_click_tab")}`;
      return (
        <Button
          onClick={() => handleNavigate(lc, ver)}
          onAuxClick={() => handleNewTab(lc, ver)}
          title={tooltip}
          variant="contained"
          // color="secondary"
          size="small"
          sx={{
            color: "#eee",
            backgroundColor: bgColor,
            textTransform: "none",
            margin: "2px",
            padding: "8px 2px",
            textAlign: "center",
            width: "40px",
            maxWidth: "40px",
            height: "50px",
            maxHeight: "50px",
            whiteSpace: "pre-wrap",
          }}
        >
          {alg_display}
        </Button>
      );
    });

    VersionCell.displayName = "VersionCell";

    const NameCell = (props: { lc: string }) => {
      const { lc } = props;
      if (!lc) {
        return <></>;
      }
      const langInfo = getCVLanguageRecord(lc);
      if (!langInfo) {
        return <></>;
      }
      return (
        <>
          {/* {langInfo.native_name}
          <br /> */}
          {intl.get("lang." + langInfo.name)}
        </>
      );
    };

    NameCell.displayName = "LanguageNameCell";

    const col_lc: TableColumn<SUPPORT_MATRIX_ROW_TYPE> = {
      id: "lc",
      name: intl.get("col.locale"),
      sortable: true,
      center: true,
      width: "80px",
      selector: (row) => row.lc,
    };

    const col_nname: TableColumn<SUPPORT_MATRIX_ROW_TYPE> = {
      id: "nname",
      name: intl.get("col.nname"),
      sortable: true,
      center: false,
      width: "120px",
      cell: (row) => (cvLanguages ? <NameCell lc={row.lc} /> : ""),
    };

    // const CreateVersionCols = (): TableColumn<SUPPORT_MATRIX_ROW_TYPE>[] => {
    //   const cols: TableColumn < SUPPORT_MATRIX_ROW_TYPE > [] = []
    //   CONF?.cv_versions.reverse().forEach((ver, inx) => {
    //     cols.push({
    //       id: ver,
    //       name: ver,
    //       center: true,
    //       width: "70px",
    //       cell: (row) => (
    //         <VersionCell lc={row.lc} ver={ver} algos={row.v18_0} />
    //       ),
    //     });
    //   })
    //   return cols
    // };

    const version_cols: TableColumn<SUPPORT_MATRIX_ROW_TYPE>[] = [
      {
        id: "v18_0",
        name: "v18.0",
        center: true,
        width: "70px",
        cell: (row) => <VersionCell lc={row.lc} ver="18.0" algos={row.v18_0} />,
      },
      {
        id: "v17_0",
        name: "v17.0",
        center: true,
        width: "70px",
        cell: (row) => <VersionCell lc={row.lc} ver="17.0" algos={row.v17_0} />,
      },
      {
        id: "v16_1",
        name: "v16.1",
        center: true,
        width: "70px",
        cell: (row) => <VersionCell lc={row.lc} ver="16.1" algos={row.v16_1} />,
      },
      {
        id: "v15_0",
        name: "v15.0",
        center: true,
        width: "70px",
        cell: (row) => <VersionCell lc={row.lc} ver="15.0" algos={row.v15_0} />,
      },
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
        omit: showOlder,
        cell: (row) => <VersionCell lc={row.lc} ver="9.0" algos={row.v9_0} />,
      },
      {
        id: "v8_0",
        name: "v8.0",
        center: true,
        width: "70px",
        omit: showOlder,
        cell: (row) => <VersionCell lc={row.lc} ver="8.0" algos={row.v8_0} />,
      },
      {
        id: "v7_0",
        name: "v7.0",
        center: true,
        width: "70px",
        omit: showOlder,
        cell: (row) => <VersionCell lc={row.lc} ver="7.0" algos={row.v7_0} />,
      },
      {
        id: "v6_1",
        name: "v6.1",
        center: true,
        width: "70px",
        omit: showOlder,
        cell: (row) => <VersionCell lc={row.lc} ver="6.1" algos={row.v6_1} />,
      },
      {
        id: "v5_1",
        name: "v5.1",
        center: true,
        width: "70px",
        omit: showOlder,
        cell: (row) => <VersionCell lc={row.lc} ver="5.1" algos={row.v5_1} />,
      },
      {
        id: "v4",
        name: "v4",
        center: true,
        width: "70px",
        omit: showOlder,
        cell: (row) => <VersionCell lc={row.lc} ver="4" algos={row.v4} />,
      },
      {
        id: "v3",
        name: "v3",
        center: true,
        width: "70px",
        omit: showOlder,
        cell: (row) => <VersionCell lc={row.lc} ver="3" algos={row.v3} />,
      },
      {
        id: "v1",
        name: "v1",
        center: true,
        width: "70px",
        omit: showOlder,
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

  // const ToggleOldVersions = (): JSX.Element => {
  //   return (
  //     <Button variant="contained" color="secondary" sx={{ mr: 1 }}>
  //       <ReadMoreIcon sx={{ color: "#f0f0f0", cursor: "e-resize" }} />{" "}
  //     </Button>
  //   );
  // };

  return !supportMatrix || !initDone ? (
    <div>...</div>
  ) : (
    <>
      <Box>
        <h3>
          {intl.get("browsepage.title")}
          {"   "}
          <Button
            variant="contained"
            color="secondary"
            title={intl.get("browsepage.button.older")}
            sx={{ mr: 1 }}
            onClick={() => setShowOlder(!showOlder)}
          >
            <ReadMoreIcon sx={{ color: "#f0f0f0", cursor: "e-resize" }} />{" "}
          </Button>
        </h3>
      </Box>
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
        // title={intl.get("browsepage.title")}
        direction={Direction.AUTO}
        defaultSortFieldId={0}
        persistTableHead
        fixedHeader
        customStyles={TABLE_STYLE}
      />
      <Box>
        {intl.get("browsepage.tooltip.right_click_tab")}
      </Box>
      <Box marginTop={2}>
        <ColorLegend />
      </Box>
    </>
  );
};

export const SupportMatrixMemo = memo(SupportMatrix);
