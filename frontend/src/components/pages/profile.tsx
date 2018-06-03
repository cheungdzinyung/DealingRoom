import * as React from "react";
import Banner from "../share/topbanner";
import Usermenu from "../share/usermenu";

import { Bar } from "react-chartjs-2";

import { Card, Elevation } from "@blueprintjs/core";
import tempImg from "../../images/circle-head.png";

interface IProfileProps {
  header: string;
}

interface IProfileState {
  dataaa: any;
}

export default class Profile extends React.Component<
  IProfileProps,
  IProfileState
> {
  constructor(props: IProfileProps) {
    super(props);

    this.state = {
      dataaa: {
        labels: [
          "Eating",
          "Drinking",
          "Sleeping",
          "Designing",
          "Coding",
          "Cycling",
          "Running"
        ],
        // tslint:disable-next-line:object-literal-sort-keys
        datasets: [
          {
            label: "My First dataset",
            // tslint:disable-next-line:object-literal-sort-keys
            backgroundColor: "rgba(220,220,220,1)",
            strokeColor: "rgba(220,220,220,1)",
            // tslint:disable-next-line:object-literal-sort-keys
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 90, 81, 56, 55, 0]
          },
          {
            label: "My Second dataset",
            // tslint:disable-next-line:object-literal-sort-keys
            backgroundColor: "rgba(151,187,205,1)",
            strokeColor: "rgba(151,187,205,1)",
            // tslint:disable-next-line:object-literal-sort-keys
            pointColor: "rgba(234,60,90,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 96, 27, 100]
          }
        ]
      }
    };
  }
  public render() {
    return (
      <div className="page-content-container">
        <Banner header="Profile" image={tempImg} />
        <Bar data={this.state.dataaa} />
        <Card interactive={true} elevation={Elevation.FOUR}>
          <Bar data={this.state.dataaa} />
        </Card>
        <Card interactive={true} elevation={Elevation.FOUR}>
          <Bar data={this.state.dataaa} />
        </Card>
        <Usermenu />
      </div>
    );
  }
}
