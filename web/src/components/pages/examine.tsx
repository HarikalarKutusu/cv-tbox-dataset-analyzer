// react
import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
// i10n
import intl from "react-intl-universal";
// MUI
// import Typography from "@mui/material/Typography";
import { Box, Button, Tab, Tabs } from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

// App
import { ANALYZER_DATA_URL, ILoaderData } from "../../helpers/appHelper";
import {
  DATASET_INFO_VIEW_TYPES,
  SEP_ALGO,
  SUPPORT_MATRIX_ROW_TYPE,
} from "./../../helpers/tableHelper";
import { DataSetInfoMemo } from "../datasetInfo";
import { TextCorpusMemo } from "../textCorpus";
import { GraphBuilder } from "../graphBuilder";
import { ReportedSentencesMemo } from "../reportedSentences";
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
      // style={{ display: value === index ? "block" : "none" }}
      {...other}
    >
      {/* {value === index && <Box sx={{ p: 0 }}>{children}</Box>} */}
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
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
  const [algos, setAlgos] = useState<string[]>([]);

  const [tabValue, setTabValue] = useState(0);

  const loaderData = useLoaderData() as ILoaderData;
  const supportMatrix = loaderData.supportMatrix;
  const cvLanguages = loaderData.cvLanguages;

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getCVLanguageRecord = (lc: string): CV_LANGUAGE_ROW | null => {
    if (cvLanguages) {
      return cvLanguages.filter((row) => row.name === lc)[0];
    } else return null;
  };

  // get algorithms in the dataset
  useEffect(() => {
    if (lc && ver && supportMatrix && supportMatrix.length > 0) {
      const rec = supportMatrix.filter((row) => row.lc === lc)[0];
      if (rec !== undefined) {
        const keyInx = `v${ver.replace(".", "_")}`;
        const key = (
          Object.keys(rec) as Array<keyof SUPPORT_MATRIX_ROW_TYPE>
        ).find((k) => k === keyInx);
        const algoData = rec[key!];
        setAlgos(algoData ? algoData.split(SEP_ALGO) : []);
      }
    }
  }, [lc, ver, supportMatrix]);

  let titleAddition = "";
  if (cvLanguages)
    titleAddition =
      " (" +
      lc +
      " - " +
      getCVLanguageRecord(lc!)!.native_name +
      " - v" +
      ver +
      ")";

  if (!algos || !cvLanguages || !supportMatrix) return <>...</>;

  const tab_list = [
    { id: 0, name: "examinepage.tab.general" },
    { id: 1, name: "examinepage.tab.duration" },
    { id: 2, name: "examinepage.tab.voices" },
    { id: 3, name: "examinepage.tab.gender" },
    { id: 4, name: "examinepage.tab.age" },
    { id: 5, name: "examinepage.tab.votes" },
    { id: 6, name: "examinepage.tab.sentences" },
    { id: 7, name: "examinepage.tab.text-corpus" },
    { id: 8, name: "examinepage.tab.reported" },
    // { id: 9, name: "examinepage.tab.comperative" },
    // { id: 10, name: "examinepage.tab.health" },
  ];

  return (
    <>
      <Box>
        <h3>
          {intl.get("examinepage.title") + titleAddition}
          {"   "}
          {/* <SplitDownloadLinks algos={algos} /> */}
        </h3>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="Dataset Analyzer Tabs"
          >
            {tab_list.map((item) => {
              return (
                <Tab
                  key={item.id}
                  label={intl.get(item.name)}
                  disableRipple
                  {...a11yProps(item.name)}
                />
              );
            })}
          </Tabs>
        </Box>
        {/* general */}
        <TabPanel value={tabValue} index={0}>
          <DataSetInfoMemo
            lc={lc}
            ver={ver}
            view={DATASET_INFO_VIEW_TYPES[tabValue]}
          />
        </TabPanel>
        {/* duration */}
        <TabPanel value={tabValue} index={1}>
          <DataSetInfoMemo
            lc={lc}
            ver={ver}
            view={DATASET_INFO_VIEW_TYPES[tabValue]}
          />
        </TabPanel>
        {/* voices */}
        <TabPanel value={tabValue} index={2}>
          <DataSetInfoMemo
            lc={lc}
            ver={ver}
            view={DATASET_INFO_VIEW_TYPES[tabValue]}
          />
        </TabPanel>
        {/* GENDER */}
        <TabPanel value={tabValue} index={3}>
          <DataSetInfoMemo
            lc={lc}
            ver={ver}
            view={DATASET_INFO_VIEW_TYPES[tabValue]}
          />
        </TabPanel>
        {/* AGE */}
        <TabPanel value={tabValue} index={4}>
          <DataSetInfoMemo
            lc={lc}
            ver={ver}
            view={DATASET_INFO_VIEW_TYPES[tabValue]}
          />
        </TabPanel>
        {/* Votes */}
        <TabPanel value={tabValue} index={5}>
          <DataSetInfoMemo
            lc={lc}
            ver={ver}
            view={DATASET_INFO_VIEW_TYPES[tabValue]}
          />
        </TabPanel>
        {/* sentences */}
        <TabPanel value={tabValue} index={6}>
          <DataSetInfoMemo
            lc={lc}
            ver={ver}
            view={DATASET_INFO_VIEW_TYPES[tabValue]}
          />
        </TabPanel>
        {/* text-corpus */}
        <TabPanel value={tabValue} index={7}>
          <TextCorpusMemo lc={lc} />
        </TabPanel>
        {/* Reported Sentences */}
        <TabPanel value={tabValue} index={8}>
          <ReportedSentencesMemo lc={lc} ver={ver} />
        </TabPanel>
      </Box>
      <div style={{ height: "4px" }}></div>
      <GraphBuilder view={DATASET_INFO_VIEW_TYPES[tabValue]} />
    </>
  );
};
