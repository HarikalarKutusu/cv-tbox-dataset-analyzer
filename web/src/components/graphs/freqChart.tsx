import AutoSizer from "react-virtualized-auto-sizer";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

import { GRAPH_COLORS, IFreqChartProps } from "../../helpers/graphHelper";
import { useStore } from "../../stores/store";

// TODO Add mean/median/yScale support

export const FreqChart = (props: IFreqChartProps) => {
  const {
    data,
    xKey,
    yKey,
    seriesName,
    mean,
    median,
    yScale = "linear",
  } = props;
  let { cnt } = props;
  const { langCode } = useStore();

  cnt = cnt
    ? cnt
    : Math.floor(Math.random() * GRAPH_COLORS.length) % GRAPH_COLORS.length;

  return (
    <AutoSizer>
      {({ width, height }) => (
        <BarChart
          width={width}
          height={height}
          data={data}
          margin={{ top: 50, bottom: 0, left: 25, right: 10 }}
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
          <Legend />
          <Bar
            name={seriesName}
            key={xKey + "-" + yKey}
            dataKey={yKey}
            fill={GRAPH_COLORS[cnt! % GRAPH_COLORS.length]}
          />
        </BarChart>
      )}
    </AutoSizer>
  );
};
