// Importing modules
import * as React from "react";
import { Radar } from "react-chartjs-2";

// Importing UI elements
import { Card, Elevation } from "@blueprintjs/core";
import Banner from "../share/topbanner";
import Usermenu from "../share/usermenu";

// Importing static 
import tempImg from "../images/profiles/circle-head.png";

// Importing types
import { IGraphDataCombiner } from "src/modules";

// Importing fake data
import { comparisonData } from "../../fakedata";

interface IPureProfileState {
    chartData: IGraphDataCombiner
    profilePicture: "*.png" | "*.jpg"
}


export default class PureProfile extends React.Component<{}, IPureProfileState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      chartData: comparisonData,
      profilePicture: tempImg
    }
  }

  public render() {
    return (
      <div className="page-content-container">
        <Banner header="Profile" image={this.state.profilePicture} />
        <Card className="comparison-chart" interactive={true} elevation={Elevation.FOUR}>
          <Radar height={200} data={this.state.chartData} />
        </Card>
        <Usermenu />
      </div>
    );
  }
}
