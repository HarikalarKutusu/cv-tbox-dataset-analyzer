// React
import { useCallback } from "react";
// MUI
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
// Charts
import AutoSizer from "react-virtualized-auto-sizer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
// Saving
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";
// App
import { useStore } from "../../stores/store";
import { GRAPH_COLORS, IFreqChartProps } from "../../helpers/graphHelper";
import { cleanFn } from "../../helpers/appHelper";

// TODO Add mean/median/yScale support

export const FreqChart = (props: IFreqChartProps) => {
  const {
    data,
    xKey,
    yKey,
    seriesName,
    mean,
    median,
    std,
    yScale = "linear",
    title,
    subTitle,
    isXNumber = false,
  } = props;
  let { cnt } = props;
  const { langCode } = useStore();
  const [getPng, { ref }] = useCurrentPng();

  cnt = cnt
    ? cnt
    : Math.floor(Math.random() * GRAPH_COLORS.length) % GRAPH_COLORS.length;

  const handleDownload = useCallback(async () => {
    const png = await getPng();
    if (png) {
      FileSaver.saveAs(png, cleanFn(title + "-" + subTitle + ".png"));
    }
  }, [getPng, subTitle, title]);

  return (
    <AutoSizer>
      {({ width, height }) => (
        <div style={{ position: "relative" }}>
          <BarChart
            width={width}
            height={height}
            data={data}
            margin={{ top: 50, bottom: 0, left: 25, right: 10 }}
            ref={ref}
          >
            <XAxis
              dataKey={xKey}
              type={isXNumber ? "number" : "category"}
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
              // scale={yScale}
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
            {/* <Legend /> */}
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
            <Bar
              name={seriesName}
              key={xKey + "-" + yKey}
              dataKey={yKey}
              fill={GRAPH_COLORS[cnt! % GRAPH_COLORS.length]}
            />
            {/* {mean ? (
              <ReferenceLine
                x={mean}
                stroke="gray"
                label={{
                  position: "insideBottomRight",
                  value: "x\u0305=" + mean.toFixed(1),
                  fill: "black",
                  fontSize: 14,
                }}
              />
            ) : (
              <></>
            )}
            {median ? (
              <ReferenceLine
                x={median}
                stroke="gray"
                label={{
                  position: "insideTopLeft",
                  value: "̃̃x\u0303=" + median.toFixed(1),
                  fill: "black",
                  fontSize: 14,
                  // angle: -90
                }}
              />
            ) : (
              <></>
            )} */}
            {mean || median || std ? (
              <text
                x={width - 80}
                y={50}
                fill="#999"
                fontSize="0.8rem"
                fontWeight={500}
              >
                <tspan x={width - 80} dy={15}>
                  {"x\u0305 = " + (mean ? mean : "-")}
                </tspan>
                <tspan x={width - 80} dy={15}>
                  {"x\u0303 = " + (median ? median : "-")}
                </tspan>
                <tspan x={width - 80} dy={15}>
                  {"\u03c3 = " + (std ? std : "-")}
                </tspan>
              </text>
            ) : (
              <></>
            )}
          </BarChart>
          <div style={{ position: "absolute", top: -5, left: 30 }}>
            <DownloadForOfflineIcon
              color="secondary"
              onClick={handleDownload}
            />
          </div>
        </div>
      )}
    </AutoSizer>
  );
};
