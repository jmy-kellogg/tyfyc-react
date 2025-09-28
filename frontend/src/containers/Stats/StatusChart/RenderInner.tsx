import React from "react";
import { SectorProps, Sector } from "recharts";

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

type PieSectorDataItem = React.SVGProps<SVGPathElement> &
  Partial<SectorProps> &
  PieSectorData;

const RenderInner: React.FC<PieSectorDataItem> = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  name,
  percent,
  value,
  color,
}) => {
  return (
    <g>
      <text x={cx} y={cy} dy={0} textAnchor="middle" fill={color} fontSize={20}>
        {`${value} ${name}`}
      </text>
      <text
        x={cx}
        y={cy}
        dy={20}
        textAnchor="middle"
        fill={color}
        fontSize={20}
      >
        {`(Rate ${((percent ?? 1) * 100).toFixed(2)}%)`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={color}
      />
    </g>
  );
};

export default RenderInner;
