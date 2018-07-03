// Importing modules
import * as React from "react";

// Importing styling and static assets
import "./CustomerPerformanceGraph.scss";

// Importing UI elements
import {
  RadarChart,
  PolarGrid,
  Radar,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

import { IConsumptionGraphData } from "src/modules";

interface IUserProfileGraphProps {
  data: IConsumptionGraphData[];
}

export default class UserProfileGraph extends React.Component<
  IUserProfileGraphProps,
  {}
  > {
  constructor(props: IUserProfileGraphProps) {
    super(props);
  }

  public fakerTickFunction = (a: any) => {
    return null;
  };

  public render() {
    return (
      <div className="profile-graph-container">
        <ResponsiveContainer>
          <RadarChart data={this.props.data}>
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EE5353" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#EE5353" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1174ac" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1174ac" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <PolarGrid />
            <PolarAngleAxis
              tickFormatter={this.fakerTickFunction}
              dataKey="category"
            // axisLine={false}
            />
            <PolarRadiusAxis
              tickFormatter={this.fakerTickFunction}
              angle={30}
            // axisLine={false}
            />
            {/* Draw second */}
            <Radar
              dataKey="everyone"
              stroke="#EE5353"
              fill="url(#colorPv)"
              fillOpacity={1}
            />
            {/* Draw first */}
            <Radar
              dataKey="you"
              stroke="#1174ac"
              fill="url(#colorUv)"
              fillOpacity={1}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
