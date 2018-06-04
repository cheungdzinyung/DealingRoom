import { Card, Collapse, Elevation } from "@blueprintjs/core";
import * as React from "react";
import Usermenu from "../share/usermenu";

import { items } from "../fakedata";

interface IMenuItem {
  name: string;
  currentPrice: number;
  percentage: number;
  description: string;
}

interface IMenuState {
  items: IMenuItem[];
  isOpen: boolean;
}

export default class Menu extends React.Component<{}, IMenuState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isOpen: false,
      items
    };
  }

  public onOff = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  public render() {
    return (
      <div className="page-content-container">
        <input
          className="pt-input searchbar"
          type="search"
          placeholder="Search input"
          dir="auto"
        />
        {this.state.items.map((item, i) => (
          <div className="item-container">
            <Card
              className="item-cards item-price-up"
              interactive={true}
              elevation={Elevation.FOUR}
              onClick={this.onOff}
              key={i}
            >
              <span>{item.name}</span>
              <span>${item.currentPrice}</span>
              <span>{item.percentage}%</span>
              {/* <svg className="testicon" viewBox="0 0 100 100" height="100mm" width="100mm" >
                <path
                  d="M50 12.533L94.027 88.79H5.973z"
                  fill="none"
                  stroke="#000"
                  strokeWidth={2.646}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> */}
            </Card>
            <Collapse key={i} className={"item-details" + " " + (this.state.isOpen ? "item-detail-onflex" : '')} isOpen={this.state.isOpen} >
              <span>{item.description}</span>
            </Collapse>
          </div>
        ))}
        <Usermenu />
      </div>
    );
  }
}
