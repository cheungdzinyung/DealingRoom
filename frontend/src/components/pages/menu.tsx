import { Card, Collapse, Elevation } from "@blueprintjs/core";
import * as React from "react";
import Usermenu from "../share/usermenu";

import { chartData, items } from "../fakedata";

import { Line } from "react-chartjs-2";
import down from "../../icons/down.svg";
import up from "../../icons/up.svg";

interface IMenuItem {
  name: string;
  currentPrice: number;
  percentage: number;
  description: string;
}

interface IMenuState {
  items: IMenuItem[];
  isItemDetailsOpen: boolean[];
}

export default class Menu extends React.Component<{}, IMenuState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isItemDetailsOpen: items.map(data => false),
      items
    };
  }

  public isOpen = (i: number) => {
    // const temp = e.target.index;
    this.setState({
      isItemDetailsOpen: items.map(
        (data, index) =>
          i === index
            ? !this.state.isItemDetailsOpen[index]
            : this.state.isItemDetailsOpen[index]
      )
    });
  };

  public render() {
    return (
      <div className="page-content-container">
        <input
          className="pt-input searchbar"
          type="text"
          placeholder="Search input"
          dir="auto"
        />
        {this.state.items.map((item, i) => (
          <div className="item-container">
            <Card
              className={
                !this.state.isItemDetailsOpen[i]
                  ? "item-cards"
                  : item.percentage > 0
                    ? "item-cards item-price-up"
                    : "item-cards item-price-down"
              }
              interactive={true}
              elevation={Elevation.FOUR}
              onClick={this.isOpen.bind(this, i)}
              key={i}
            >
              <div className="pricetag">
                <span>{item.name}</span>
                <span>${item.currentPrice}</span>
              </div>
              <div className="arrow-container">
                <img
                  className="arrow"
                  src={item.percentage > 0 ? up : down}
                  alt=""
                />
              </div>
            </Card>
            {/* ------------Seperate card and card details */}
            <Collapse
              key={i}
              className={
                "item-details" +
                " " +
                (this.state.isItemDetailsOpen[i] ? "item-detail-onflex" : "")
              }
              isOpen={this.state.isItemDetailsOpen[i]}
            >
              <div className="description">
                <span>{item.description}</span>
              </div>
              <div className="chartVar">
                <div className="variables">
                  <img
                    className="detail-arrow"
                    src={item.percentage > 0 ? up : down}
                    alt=""
                  />
                  <span className="detail-percentage">{item.percentage}%</span>
                </div>
                <div className="chart">
                  <Line width={100} data={chartData} />
                </div>
              </div>
            </Collapse>
          </div>
        ))}
        <Usermenu />
      </div>
    );
  }
}
