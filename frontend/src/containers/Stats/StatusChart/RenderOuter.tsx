import React from "react";
import { Sector } from "recharts";

type Coordinate = {
  x: number;
  y: number;
};

type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
};

type GeometrySector = {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
};

type PieSectorDataItem = React.SVGProps<SVGPathElement> &
  Partial<GeometrySector> &
  PieSectorData;

const RenderOuter: React.FC<PieSectorDataItem> = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  name,
  percent,
  value,
  color,
}) => {
  const RADIAN: number = Math.PI / 180;
  const sin: number = Math.sin(-RADIAN * (midAngle ?? 1));
  const cos: number = Math.cos(-RADIAN * (midAngle ?? 1));
  const sx: number = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy: number = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx: number = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my: number = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex: number = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey: number = my;
  const textAnchor: "start" | "end" = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={color}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={color}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={color} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={color}
      >{`${value} ${name}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${((percent ?? 1) * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default RenderOuter;
