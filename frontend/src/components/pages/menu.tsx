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
            >
              <span>{item.name}</span>
              <span>${item.currentPrice}</span>
              <span>{item.percentage}%</span>
            </Card>
            <Collapse className={"item-details"+ " " + (this.state.isOpen ? "item-detail-onflex" : '')} isOpen={this.state.isOpen}>
              <span>{item.description}</span>
            </Collapse>
          </div>
        ))}
        <Usermenu />
      </div>
    );
  }
}
