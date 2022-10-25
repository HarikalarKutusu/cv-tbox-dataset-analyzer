import AutoSizer from "react-virtualized-auto-sizer";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // ReferenceLine,
  Legend,
} from "recharts";

import { GRAPH_COLORS, IAppChartProps } from "../../helpers/graphHelper";
import { useStore } from "../../stores/store";

export const AppLineChart = (props: IAppChartProps) => {
  const { data, xKey, yKeys, stacked, seriesNames, title, subTitle } = props;
  const { langCode } = useStore();
  let i = 0;

  return (
    <AutoSizer>
      {({ width, height }) => (
        <LineChart
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
          {yKeys.map((yKey: string) => (
            <Line
              name={seriesNames[i]}
              key={xKey + "-" + yKey}
              dataKey={yKey}
              // fill={GRAPH_COLORS[i]}
              stroke={GRAPH_COLORS[i++]}
            />
          ))}
        </LineChart>
      )}
    </AutoSizer>
  );
};
