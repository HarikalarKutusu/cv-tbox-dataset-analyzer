import AutoSizer from "react-virtualized-auto-sizer";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
} from "recharts";
import { ScaleType } from "recharts/types/util/types";

import { GRAPH_COLORS } from "../../helpers/graphHelper";
import { IFreqTableRow } from "../../helpers/tableHelper";
import { useStore } from "../../stores/store";

interface IFreqChartProps {
  data: IFreqTableRow[];
  xKey: string;
  yKey: string;
  seriesName: string;
  yScale: ScaleType;
  mean?: number;
  median?: number;
}

// TODO Add mean/median/yScale support

export const FreqChart = (props: IFreqChartProps) => {
  const { data, xKey, yKey, seriesName, mean, median, yScale } = props;
  const { langCode } = useStore();
  console.log("here");

  return (
    // <div style={{ width: "100%"}}>
    // <h3>&nbsp;</h3>
    <AutoSizer>
      {({ width, height }) => (
        <BarChart
          width={width}
          height={height}
          data={data}
          margin={{ top: 20, bottom: 0, left: 25, right: 10 }}
        >
          <XAxis
            dataKey={xKey}
            style={{
              fontSize: "0.8rem",
              fontFamily: "Arial",
            }}
          />
          <YAxis
            // scale={yScale}
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
          <Legend />
          <Bar
            name={seriesName}
            key={xKey + "-" + yKey}
            dataKey={yKey}
            fill={GRAPH_COLORS[Math.floor(Math.random() * GRAPH_COLORS.length)]}
          />
        </BarChart>
      )}
    </AutoSizer>
    // </div>
  );
};
