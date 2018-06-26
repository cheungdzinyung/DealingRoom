// Importing modules
import * as React from "react";

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

  public render() {
    return (
      <div className="profile-graph-container">
        <ResponsiveContainer>
          <RadarChart data={this.props.data}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EB5757" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#EB5757" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2D9CDB" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2D9CDB" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <PolarGrid />
            <PolarAngleAxis dataKey="purchasePrice" />
            <PolarRadiusAxis angle={30} domain={[0, 250]} />
            <Radar
              //   name="Mike"
              dataKey="you"
              stroke="#EB5757"
              fill="url(#colorUv)"
              fillOpacity={1}
            />
            <Radar
              // name="Lily"
              dataKey="everyone"
              stroke="#2D9CDB"
              fill="url(#colorPv)"
              fillOpacity={1}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
