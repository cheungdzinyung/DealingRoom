// Importing modules
import * as React from "react";

// Importing UI elements
import {
  RadarChart,
  PolarGrid,
  // PolarAngleAxis,
  // PolarRadiusAxis,
  Radar,
  Legend
} from "recharts";
import UserMenu from "../../ui/mobile/usermenu";
import PageHeader from "src/components/ui/mobile/pageheader";
import { IConsumptionGraphData } from "src/modules";

interface IUserProfileProps {
  userConsumption: IConsumptionGraphData[];
}

export default class PureProfile extends React.Component<
  IUserProfileProps,
  {}
> {
  constructor(props: IUserProfileProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div className="page-content-container">
        <PageHeader header={"Profile"} subHeader={"You are what you eat"} />
        <RadarChart
          cx={300}
          cy={250}
          outerRadius={150}
          width={200}
          height={300}
          data={this.props.userConsumption}
        >
          <PolarGrid />
          {/* <PolarAngleAxis dataKey="subject" /> */}
          {/* <PolarRadiusAxis angle={30} domain={[0, 150]} /> */}
          <Radar
            // name="Mike"
            dataKey="you"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            // name="Lily"
            dataKey="everyone"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
        <UserMenu />
      </div>
    );
  }
}
