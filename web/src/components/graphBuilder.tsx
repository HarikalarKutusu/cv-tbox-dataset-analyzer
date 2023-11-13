// react
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
// i10n
import intl from "react-intl-universal";
// MUI
import { Container, Grid, Paper } from "@mui/material";

// App
import { useStore } from "./../stores/store";
import { ILoaderData } from "../helpers/appHelper";
import {
  DATASET_INFO_ROW_TYPE,
  CROSSTAB_ROW_TYPE,
  DATASET_INFO_VIEW_TYPE,
} from "../helpers/tableHelper";

// App Charts
import {
  ALGORITM_TYPE,
  GRAPH_DATA,
  GRAPH_VIEW_TYPE,
  ICrossTabGraphProps,
  IDatasetGraphProps,
  SPLIT_TYPE,
} from "../helpers/graphHelper";
import { AppBarChart } from "./graphs/barChart";
import { AppAreaChart } from "./graphs/areaChart";
import { AppLineChart } from "./graphs/lineChart";

//
// Graph Builder
//
interface IGraphBuilderProps {
  view: DATASET_INFO_VIEW_TYPE;
}

export const GraphBuilder = (props: IGraphBuilderProps) => {
  const { view } = props;
  const { initDone } = useStore();
  const { datasetInfo } = useStore();
  const { selectedDataset } = useStore();
  // const { versionFilter, languageFilter } = useStore();

  const [gEnable, setGEnable] = useState<boolean>(false);
  const [gData, setGData] = useState<DATASET_INFO_ROW_TYPE[]>();
  const [viewGraphs, setViewGraphs] = useState<GRAPH_VIEW_TYPE[]>();

  const textCorpusStats = (useLoaderData() as ILoaderData).textCorpusStats;

  const getSeriesNames = (lst: string[]) => {
    let res: string[] = [];
    lst.forEach((s: string) => res.push(intl.get(s)));
    return res;
  };

  const getDataSubset = (
    recs: DATASET_INFO_ROW_TYPE[],
    gSpecs: GRAPH_VIEW_TYPE,
  ): DATASET_INFO_ROW_TYPE[] => {
    const subset = recs.filter(
      (row) =>
        gSpecs.algos.includes(row.alg as ALGORITM_TYPE) &&
        gSpecs.splits.includes(row.sp as SPLIT_TYPE),
    );
    return subset;
  };

  const getCrossTab = (
    recs: DATASET_INFO_ROW_TYPE[],
    gSpecs: GRAPH_VIEW_TYPE,
  ): CROSSTAB_ROW_TYPE[] => {
    const ct: CROSSTAB_ROW_TYPE[] = [];
    gSpecs.algos.forEach((a) => {
      const newRec: CROSSTAB_ROW_TYPE = {
        alg: a,
        train: 0,
        dev: 0,
        test: 0,
      };
      gSpecs.splits.forEach((s) => {
        let val: number = 0;
        const reclist = recs.filter((row) => row.alg === a && row.sp === s);
        if (reclist.length === 1) {
          const rec = reclist[0];
          const entry = Object.entries(rec).find(
            (entry) => entry[0] === gSpecs.crosstabField,
          );
          val = 0;
          if (entry) val = entry[1] as number;
          switch (rec.sp) {
            case "train":
              newRec.train = val as number;
              break;
            case "dev":
              newRec.dev = val as number;
              break;
            case "test":
              newRec.test = val as number;
              break;
            default:
              console.log("PROGRAMMER ERROR - No such split for Crosstab");
          }
        }
      });
      ct.push(newRec);
    });
    // console.log(ct);
    return ct;
  };

  const AppCrossTabGraph = (props: ICrossTabGraphProps) => {
    const { data, gd, cnt } = props;
    const [dataReady, setDataReady] = useState<boolean>(false);
    const lc = selectedDataset.split("_")[0];
    const ver = selectedDataset.split("_")[1];

    useEffect(() => {
      if (data && data.length > 0) {
        setDataReady(true);
      }
    }, [data]);

    return !dataReady ? (
      <>...</>
    ) : (
      <>
        {gd.type === "bar" ? (
          <AppBarChart
            data={data}
            xKey={gd.xKey}
            yKeys={gd.yKeys}
            stacked={gd.stacked}
            seriesNames={getSeriesNames(gd.seriesNames)}
            title={
              gd.title ? intl.get(gd.title) : "Common Voice " + lc + " v" + ver
            }
            subTitle={gd.subTitle ? intl.get(gd.subTitle) : undefined}
            fillPercent={gd.fillPercent}
            cnt={cnt}
          />
        ) : (
          <>
            {gd.type === "area" ? (
              <AppAreaChart
                data={data}
                xKey={gd.xKey}
                yKeys={gd.yKeys}
                stacked={gd.stacked}
                seriesNames={getSeriesNames(gd.seriesNames)}
                title={
                  gd.title
                    ? intl.get(gd.title)
                    : "Common Voice " + lc + " v" + ver
                }
                subTitle={gd.subTitle ? intl.get(gd.subTitle) : undefined}
                fillPercent={gd.fillPercent}
                cnt={cnt}
              />
            ) : (
              <>
                {gd.type === "line" ? (
                  <AppLineChart
                    data={data}
                    xKey={gd.xKey}
                    yKeys={gd.yKeys}
                    stacked={gd.stacked}
                    seriesNames={getSeriesNames(gd.seriesNames)}
                    title={
                      gd.title
                        ? intl.get(gd.title)
                        : "Common Voice " + lc + " v" + ver
                    }
                    subTitle={gd.subTitle ? intl.get(gd.subTitle) : undefined}
                    fillPercent={gd.fillPercent}
                    cnt={cnt}
                  />
                ) : (
                  <div>Unsupported chart</div>
                )}
              </>
            )}
          </>
        )}
      </>
    );
  };

  const AppDatasetGraph = (props: IDatasetGraphProps) => {
    const { data, gd, cnt } = props;
    const lc = selectedDataset.split("_")[0];
    const ver = selectedDataset.split("_")[1];
    return (
      <>
        {gd.type === "bar" ? (
          <AppBarChart
            data={data}
            xKey={gd.xKey}
            yKeys={gd.yKeys}
            stacked={gd.stacked}
            seriesNames={getSeriesNames(gd.seriesNames)}
            title={
              gd.title ? intl.get(gd.title) : "Common Voice " + lc + " v" + ver
            }
            subTitle={gd.subTitle ? intl.get(gd.subTitle) : undefined}
            fillPercent={gd.fillPercent}
            cnt={cnt}
          />
        ) : (
          <>
            {gd.type === "area" ? (
              <AppBarChart
                data={getCrossTab(gData as DATASET_INFO_ROW_TYPE[], gd)}
                xKey={gd.xKey}
                yKeys={gd.yKeys}
                stacked={gd.stacked}
                seriesNames={getSeriesNames(gd.seriesNames)}
                title={
                  gd.title
                    ? intl.get(gd.title)
                    : "Common Voice " + lc + " v" + ver
                }
                subTitle={gd.subTitle ? intl.get(gd.subTitle) : undefined}
                fillPercent={gd.fillPercent}
                cnt={cnt}
              />
            ) : (
              <>
                {gd.type === "line" ? (
                  <AppBarChart
                    data={getCrossTab(gData as DATASET_INFO_ROW_TYPE[], gd)}
                    xKey={gd.xKey}
                    yKeys={gd.yKeys}
                    stacked={gd.stacked}
                    seriesNames={getSeriesNames(gd.seriesNames)}
                    title={
                      gd.title
                        ? intl.get(gd.title)
                        : "Common Voice " + lc + " v" + ver
                    }
                    subTitle={gd.subTitle ? intl.get(gd.subTitle) : undefined}
                    fillPercent={gd.fillPercent}
                    cnt={cnt}
                  />
                ) : (
                  <div>Unsupported chart</div>
                )}
              </>
            )}
          </>
        )}
      </>
    );
  };

  useEffect(() => {
    if (datasetInfo) {
      setGEnable(true);
      setViewGraphs(GRAPH_DATA.filter((row) => row.view === view));
      setGData(datasetInfo);
    } else {
      setGEnable(false);
    }
  }, [datasetInfo, view, textCorpusStats]);

  return !datasetInfo || !initDone || !viewGraphs || !gEnable ? (
    <>...</>
  ) : (
    <Container maxWidth={false} style={{ padding: 0 }}>
      <Grid container spacing={1}>
        {/* Loop graphs */}
        {viewGraphs.map((gd, index) => {
          return (
            <Grid item xs={12} sm={12} md={6} key={index}>
              <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ width: "100%", height: "300px" }}>
                  {/* BAR CHART */}
                  {gd.data === "crosstab" ? (
                    <AppCrossTabGraph
                      data={getCrossTab(gData as DATASET_INFO_ROW_TYPE[], gd)}
                      gd={gd}
                      cnt={index}
                    />
                  ) : (
                    <AppDatasetGraph
                      data={getDataSubset(gData as DATASET_INFO_ROW_TYPE[], gd)}
                      gd={gd}
                      cnt={index}
                    />
                  )}
                </div>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
