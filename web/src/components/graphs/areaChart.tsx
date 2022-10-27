// React
import { useCallback } from "react";
// MUI
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
// Charts
import AutoSizer from "react-virtualized-auto-sizer";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  // ReferenceLine,
  // Label,
} from "recharts";
// Saving
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";
// App
import { useStore } from "../../stores/store";
import { GRAPH_COLORS, IAppChartProps } from "../../helpers/graphHelper";
import { cleanFn } from "../../helpers/appHelper";

export const AppAreaChart = (props: IAppChartProps) => {
  const { data, xKey, yKeys, stacked, seriesNames, title, subTitle, cnt } = props;
  const { langCode } = useStore();
  const [getPng, { ref: refArea, isLoading }] = useCurrentPng();

  const handleAreaDownload = useCallback(async () => {
    if (isLoading) return;
    console.log("here");
    const png = await getPng();
    if (png) {
      FileSaver.saveAs(png, cleanFn(title + "-" + subTitle + ".png"));
    }
  }, [getPng, isLoading, subTitle, title]);

  const DLIcon = () => {
    return (
      <DownloadForOfflineIcon color="secondary" onClick={handleAreaDownload} />
    );
  };

  return (
    <AutoSizer>
      {({ width, height }) => (
        <div style={{ position: "relative" }}>
          <AreaChart
            width={width}
            height={height}
            data={data}
            margin={{ top: 50, bottom: 0, left: 25, right: 10 }}
            ref={refArea}
          >
            <XAxis
              dataKey={xKey}
              style={{
                fontSize: "0.8rem",
                fontFamily: "Arial",
              }}
            />
            <YAxis
              style={{
                fontSize: "0.8rem",
                fontFamily: "Arial",
              }}
              tickFormatter={(val) => {
                return val.toLocaleString(langCode);
              }}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
            />
            <Tooltip
              formatter={(val) => {
                return val.toLocaleString(langCode);
              }}
            />
            {yKeys && yKeys.length !== 1 ? <Legend /> : <></>}
            {title ? (
              <text
                x={width / 2}
                y={10}
                fill="#999"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="1.1rem"
                fontWeight={500}
              >
                {title}
              </text>
            ) : (
              <></>
            )}
            {subTitle ? (
              <text
                x={width / 2}
                y={30}
                fill="#666"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="0.9rem"
                fontWeight={400}
              >
                {subTitle}
              </text>
            ) : (
              <></>
            )}
            {yKeys.length > 1 && stacked
              ? yKeys.map((yKey: string, inx) => (
                  <Area
                    name={seriesNames[inx]}
                    key={xKey + "-" + yKey}
                    stackId="a"
                    dataKey={yKey}
                    fill={GRAPH_COLORS[(cnt + inx) % GRAPH_COLORS.length]}
                    stroke={GRAPH_COLORS[(cnt + inx) % GRAPH_COLORS.length]}
                  />
                ))
              : yKeys.map((yKey: string, inx) => (
                  <Area
                    name={seriesNames[inx]}
                    key={xKey + "-" + yKey}
                    dataKey={yKey}
                    fill={GRAPH_COLORS[(cnt + inx) % GRAPH_COLORS.length]}
                    stroke={GRAPH_COLORS[(cnt + inx) % GRAPH_COLORS.length]}
                  />
                ))}
          </AreaChart>
          <div
            style={{ position: "absolute", top: -5, left: -5 }}
            onClick={handleAreaDownload}
          >
            <DLIcon />
          </div>
        </div>
      )}
    </AutoSizer>
  );
};
