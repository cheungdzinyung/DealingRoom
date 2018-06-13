import * as React from "react";
import Banner from "../share/topbanner";
import Usermenu from "../share/usermenu";

import { Radar } from "react-chartjs-2";

import { Card, Elevation } from "@blueprintjs/core";
import tempImg from "../../images/profiles/circle-head.png";

import { chartData } from "../../fakedata";

interface IDatasetConfig {
  dataset: {
    label: string;
    backgroundColor: string;
    strokeColor: string;
    pointColor: string;
    pointStrokeColor: string;
    pointHighlightFill: string;
    pointHighlightStroke: string;
    data: [number];
  };
}

interface IProfileProps {
  lables: string[];
  datasets: IDatasetConfig[];
}

export default class Profile extends React.Component<IProfileProps> {
  constructor(props: IProfileProps) {
    super(props);
  }
  public render() {
    return (
      <div className="page-content-container">
        <Banner header="Profile" image={tempImg} />
        <Card className="comparison-chart" interactive={true} elevation={Elevation.FOUR}>
          <Radar height={200}  data={chartData} />
        </Card>
        <Usermenu />
      </div>
    );
  }
}
