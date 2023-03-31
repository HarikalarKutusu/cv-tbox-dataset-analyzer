// react
import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
// i10n
import intl from "react-intl-universal";
// MUI
// import Typography from "@mui/material/Typography";
import { Box, Button, Tab, Tabs } from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

// Store
import { useStore } from "./../../stores/store";
// App
import { ANALYZER_DATA_URL, ILoaderData } from "../../helpers/appHelper";
import {
  DATASET_INFO_VIEW_TYPES,
  SEP_ALGO,
  SUPPORT_MATRIX_ROW_TYPE,
} from "./../../helpers/tableHelper";
import { DataSetInfo } from "../datasetInfo";
import { TextCorpus } from "../textCorpus";
import { GraphBuilder } from "../graphBuilder";
import { ReportedSentences } from "../reportedSentences";
import { CV_LANGUAGE_ROW } from "../../helpers/cvHelper";

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
        <Box sx={{ p: 1 }}>
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
  const [algos, setAlgos] = useState<string[]>([]);
  const { datasetInfoView, setDatasetInfoView } = useStore();

  const supportMatrix = (useLoaderData() as ILoaderData).supportMatrix;
  const cvLanguages = (useLoaderData() as ILoaderData).cvLanguages;

  interface SplitDownloadLinksProps {
    algos: string[];
  }

  const SplitDownloadLinks = (props: SplitDownloadLinksProps): JSX.Element => {
    const { algos } = props;
    const dlLinkBase = `${ANALYZER_DATA_URL}/${lc}/${lc}_${ver}_`;
    return (
      <>
        {algos.map((algo) => (
          <a
            href={dlLinkBase + algo + ".tar.xz"}
            download
            key={algo}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="secondary" sx={{ mr: 1 }}>
              <DownloadForOfflineIcon
                sx={{ color: "#f0f0f0", cursor: "grab" }}
              />{" "}
              <span style={{ color: "#f0f0f0", textTransform: "none" }}>
                {algo}
              </span>
            </Button>
          </a>
        ))}
      </>
    );
  };

  useEffect(() => {
    if (lc && ver && supportMatrix.length > 0) {
      const rec = supportMatrix.filter((row) => row.lc === lc)[0];
      if (rec) {
        const keyInx = `v${ver.replace(".", "_")}`;
        const key = (
          Object.keys(rec) as Array<keyof SUPPORT_MATRIX_ROW_TYPE>
        ).find((k) => k === keyInx);
        const algoData = rec[key!];
        setAlgos(algoData ? algoData.split(SEP_ALGO) : []);
      }
    }
  }, [lc, supportMatrix, ver]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setDatasetInfoView(DATASET_INFO_VIEW_TYPES[newValue]);
  };

  const getCVLanguageRecord = (lc: string): CV_LANGUAGE_ROW => {
    return cvLanguages.filter((row) => row.name === lc)[0];
  };

  const titleAddition =
    " (" +
    lc +
    " - " +
    getCVLanguageRecord(lc!).native_name +
    " - v" +
    ver +
    ")";

  if (!algos) return null;

  return (
    <>
      <Box>
        <h3>
          {intl.get("examinepage.title") + titleAddition}
          {"   "}
          <SplitDownloadLinks algos={algos} />
        </h3>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="Dataset Analyzer Tabs"
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
              label={intl.get("examinepage.tab.gender")}
              {...a11yProps("examinepage.tab.gender")}
            />
            <Tab
              label={intl.get("examinepage.tab.age")}
              {...a11yProps("examinepage.tab.age")}
            />
            <Tab
              label={intl.get("examinepage.tab.votes")}
              {...a11yProps("examinepage.tab.votes")}
            />
            <Tab
              label={intl.get("examinepage.tab.reported")}
              {...a11yProps("examinepage.tab.reported")}
            />
            <Tab
              label={intl.get("examinepage.tab.sentences")}
              {...a11yProps("examinepage.tab.sentences")}
            />
            <Tab
              label={intl.get("examinepage.tab.text-corpus")}
              {...a11yProps("examinepage.tab.text-corpus")}
            />
            {/* <Tab
              label={intl.get("examinepage.tab.comperative")}
              {...a11yProps("examinepage.tab.comperative")}
            />
            <Tab
              label={intl.get("examinepage.tab.health")}
              {...a11yProps("examinepage.tab.health")}
            /> */}
          </Tabs>
        </Box>
        {/* general */}
        <TabPanel value={tabValue} index={0}>
          <DataSetInfo lc={lc} ver={ver} view={datasetInfoView} />
        </TabPanel>
        {/* duration */}
        <TabPanel value={tabValue} index={1}>
          <DataSetInfo lc={lc} ver={ver} view={datasetInfoView} />
        </TabPanel>
        {/* voices */}
        <TabPanel value={tabValue} index={2}>
          <DataSetInfo lc={lc} ver={ver} view={datasetInfoView} />
        </TabPanel>
        {/* GENDER */}
        <TabPanel value={tabValue} index={3}>
          <DataSetInfo lc={lc} ver={ver} view={datasetInfoView} />
        </TabPanel>
        {/* AGE */}
        <TabPanel value={tabValue} index={4}>
          <DataSetInfo lc={lc} ver={ver} view={datasetInfoView} />
        </TabPanel>
        {/* Votes */}
        <TabPanel value={tabValue} index={5}>
          <DataSetInfo lc={lc} ver={ver} view={datasetInfoView} />
        </TabPanel>
        {/* Reported Sentences */}
        <TabPanel value={tabValue} index={6}>
          <ReportedSentences lc={lc} ver={ver} />
        </TabPanel>
        {/* sentences */}
        <TabPanel value={tabValue} index={7}>
          <DataSetInfo lc={lc} ver={ver} view={datasetInfoView} />
        </TabPanel>
        {/* text-corpus */}
        <TabPanel value={tabValue} index={8}>
          <TextCorpus lc={lc} />
        </TabPanel>
      </Box>
      <GraphBuilder />
    </>
  );
};
