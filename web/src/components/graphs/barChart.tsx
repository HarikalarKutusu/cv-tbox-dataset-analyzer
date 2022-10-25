import AutoSizer from "react-virtualized-auto-sizer";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // ReferenceLine,
  Legend,
  LabelList,
} from "recharts";

import { GRAPH_COLORS, IAppChartProps } from "../../helpers/graphHelper";
import { useStore } from "../../stores/store";

export const AppBarChart = (props: IAppChartProps) => {
  const { data, xKey, yKeys, stacked, seriesNames, title, subTitle } = props;
  const { langCode } = useStore();
  let i = 0;

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
          {yKeys && yKeys.length > 1 && stacked
            ? yKeys.map((yKey: string) => (
                <Bar
                  name={seriesNames[i]}
                  key={xKey + "-" + yKey}
                  stackId="a"
                  dataKey={yKey}
                  fill={GRAPH_COLORS[i++ % GRAPH_COLORS.length]}
                />
              ))
            : yKeys &&
              yKeys.map((yKey: string) => (
                <Bar
                  name={seriesNames[i]}
                  key={xKey + "-" + yKey}
                  dataKey={yKey}
                  // fill={GRAPH_COLORS[i++ % GRAPH_COLORS.length]}
                  fill={
                    yKeys.length > 1
                      ? GRAPH_COLORS[i++ % GRAPH_COLORS.length]
                      : GRAPH_COLORS[
                          Math.floor(Math.random() * GRAPH_COLORS.length)
                        ]
                  }
                >
                  {/* <LabelList dataKey={yKey} color="grey" /> */}
                </Bar>
              ))}
        </BarChart>
      )}
    </AutoSizer>
  );
};
