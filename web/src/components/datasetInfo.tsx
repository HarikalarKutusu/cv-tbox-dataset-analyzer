// React
import { useEffect } from "react";
import axios from "axios";
// i10n
import intl from "react-intl-universal";

// DataTable
import DataTable, { Direction, TableColumn } from "react-data-table-component";

// Store
import { useStore } from "../stores/store";

// App
import { DATASET_INFO_ROW_TYPE, DATASET_INFO_VIEW_TYPES } from "../helpers/tableHelper";

//
// JSX
//

export type DatasetInfoProps = {
  lc?: string;
  ver?: string;
  view?: string;
};

export const DataSetInfo = (props: DatasetInfoProps) => {
  const { lc, ver } = props;

  const { initDone } = useStore();
  const { langCode } = useStore();
  const { versionFilter } = useStore();
  const { languageFilter } = useStore();

  const { selectedDataset, setSelectedDataset } = useStore();
  const { datasetInfo, setDatasetInfo } = useStore();
  const { datasetInfoView, setDatasetInfoView } = useStore();

  // const [datasetInfo, setDatasetInfo] = useState<
  //   DATASET_INFO_ROW_TYPE[] | undefined
  // >(undefined);
  
  // {
  //   id: "lc",
  //   name: intl.get("colnames.locale"),
  //   sortable: true,
  //   center: true,
  //   width: "100px",
  //   selector: (row: DATASET_INFO_ROW_TYPE) => row.lc,
  //   // cell: (row) => <VersionCell row={row} />,
  // },
  // {
  //   id: "ver",
  //   name: intl.get("colnames.version"),
  //   sortable: true,
  //   center: true,
  //   width: "100px",
  //   selector: (row: DATASET_INFO_ROW_TYPE) => row.ver,
  // },

  const getColumns = (): TableColumn<DATASET_INFO_ROW_TYPE>[] => {
    return [
      {
        id: "alg",
        name: intl.get("colnames.algorithm"),
        sortable: true,
        center: true,
        width: "120px",
        selector: (row: DATASET_INFO_ROW_TYPE) => row.alg,
      },
      {
        id: "split",
        name: intl.get("colnames.split"),
        sortable: true,
        right: true,
        width: "100px",
        selector: (row: DATASET_INFO_ROW_TYPE) => row.sp,
      },
      {
        id: "clips",
        name: intl.get("colnames.clips"),
        sortable: true,
        right: true,
        // width: "100px",
        selector: (row: DATASET_INFO_ROW_TYPE) => row.clips.toLocaleString(langCode),
      },
      {
        id: "dur_total",
        name: intl.get("colnames.duration_total"),
        sortable: true,
        right: true,
        // width: "100px",
        selector: (row: DATASET_INFO_ROW_TYPE) => (row.dur_total / 3600).toLocaleString(langCode),
      },
      {
        id: "uq_v",
        name: intl.get("colnames.unique_voices"),
        sortable: true,
        right: true,
        // width: "100px",
        selector: (row: DATASET_INFO_ROW_TYPE) => row.uq_v.toLocaleString(langCode),
      },
      {
        id: "uq_s",
        name: intl.get("colnames.unique_sentences"),
        sortable: true,
        right: true,
        // width: "100px",
        selector: (row: DATASET_INFO_ROW_TYPE) => row.uq_s.toLocaleString(langCode),
      },
    ];
  };

  const paginationComponentOptions = {
    rowsPerPageText: intl.get("pagination.perpage"),
    rangeSeparatorText: intl.get("pagination.rangeseparator"),
    selectAllRowsItem: true,
    selectAllRowsItemText: intl.get("pagination.selectallrows"),
  };

  // const applyFilters = (data: CV_METADATATABLE_TYPE) => {
  //   let res: CV_METADATATABLE_TYPE = data;
  //   if (versionFilter.length > 0) {
  //     res = res.filter((row) => versionFilter.includes(row.version));
  //   }
  //   if (languageFilter.length > 0) {
  //     res = res.filter((row) => languageFilter.includes(row.locale));
  //   }
  //   return res;
  // };

  useEffect(() => {
    // requested dataset
    const reqds = lc + '_' + ver;
    // check if it is the same, if not, we need to reload a new one
    if (reqds !== selectedDataset) {
      setDatasetInfo(undefined)
      // make sure data is ready
      if (!datasetInfo) {
        const url =
          "/assets/data/" + lc + "/" + reqds + "_splits.json";
        axios
          .get(url, { headers: { "Content-Type": "application/json" } })
          .then((response) => {
            const data = response.data.data;
            setSelectedDataset(reqds);
            setDatasetInfoView(DATASET_INFO_VIEW_TYPES[0])
            setDatasetInfo(data);
          });
      }
    }
  }, [lc, ver, datasetInfo, setDatasetInfo, selectedDataset, setSelectedDataset, setDatasetInfoView]);

  if (!lc || !ver) {
    return <div>Error in parameters.</div>;
  }

  return !datasetInfo || !initDone ? (
    <div>...</div>
  ) : (
    <>
      <DataTable
        columns={getColumns()}
        data={datasetInfo}
        progressPending={!datasetInfo}
        responsive
        dense
        pagination
        paginationPerPage={15}
        paginationComponentOptions={paginationComponentOptions}
        direction={Direction.AUTO}
        highlightOnHover
        // title={intl.get("examinepage.title")}
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
