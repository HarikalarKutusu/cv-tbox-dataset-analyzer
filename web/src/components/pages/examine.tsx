// react
import { useState } from "react";
import { useParams } from "react-router-dom";
// i10n
import intl from "react-intl-universal";
// MUI
// import Typography from "@mui/material/Typography";
import { Box, Tab, Tabs} from "@mui/material"

// Store
import { useStore } from "./../../stores/store";
// App
import { DATASET_INFO_VIEW_TYPES } from "./../../helpers/tableHelper";
import { DataSetInfo } from "../datasetInfo";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(s: string) {
  return {
    id: `tab-${s}`,
    "aria-controls": `${intl.get(s)}`,
  };
}

export const ExaminePage = () => {
  const { lc, ver } = useParams();
  const [tabValue, setTabValue] = useState(0);

  // const { selectedDataset, setSelectedDataset } = useStore();
  const { datasetInfoView, setDatasetInfoView } = useStore();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setDatasetInfoView(DATASET_INFO_VIEW_TYPES[newValue])
  };

  const titleAddition = " (" + lc + " - v" + ver + ")"

  return (
    <>
      <h3>{intl.get("examinepage.title") + titleAddition}</h3>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={intl.get("examinepage.tab.general")}
              {...a11yProps("examinepage.tab.general")}
            />
            <Tab
              label={intl.get("examinepage.tab.duration")}
              {...a11yProps("examinepage.tab.duration")}
            />
            <Tab
              label={intl.get("examinepage.tab.voices")}
              {...a11yProps("examinepage.tab.voices")}
            />
            <Tab
              label={intl.get("examinepage.tab.sentences")}
              {...a11yProps("examinepage.tab.sentences")}
            />
            <Tab
              label={intl.get("examinepage.tab.comperative")}
              {...a11yProps("examinepage.tab.comperative")}
            />
            <Tab
              label={intl.get("examinepage.tab.health")}
              {...a11yProps("examinepage.tab.health")}
            />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <DataSetInfo lc={lc} ver={ver} view={datasetInfoView} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <DataSetInfo lc={lc} ver={ver} view={datasetInfoView} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <DataSetInfo lc={lc} ver={ver} view={datasetInfoView} />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <DataSetInfo lc={lc} ver={ver} view={datasetInfoView} />
        </TabPanel>
      </Box>
    </>
  );
};
