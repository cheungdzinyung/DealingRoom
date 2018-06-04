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
  isItemDetailsOpen: boolean[];
}

export default class Menu extends React.Component<{}, IMenuState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isItemDetailsOpen: items.map((data) => false),
      items
    };

    
  }

  // public onOff = (e) => {
  //   this.setState({
  //     isItemDetailsOpen[e]:  !isItemDetailsOpen[e]
  //   });
  // };

  public isOpen = (i: number) => {
    // const temp = e.target.index;
    this.setState({
      isItemDetailsOpen: items.map((data, index) => (i === index) ? !this.state.isItemDetailsOpen[index] : this.state.isItemDetailsOpen[index])
    });
  }

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
              onClick={this.isOpen.bind(this, i)}
              key={i}
            >
              <span>{item.name}</span>
              <span>${item.currentPrice}</span>
              <span>{item.percentage}%</span>
            </Card>
            <Collapse key={i} className={"item-details" + " " + (this.state.isItemDetailsOpen[i] ? "item-detail-onflex" : '')} isOpen={this.state.isItemDetailsOpen[i]} >
              <span>{item.description}</span>
            </Collapse>
          </div>
        ))}
        <Usermenu />
      </div>
    );
  }
}
