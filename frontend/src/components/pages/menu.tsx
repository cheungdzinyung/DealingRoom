import { Card, Collapse, Elevation } from "@blueprintjs/core";
import * as React from "react";
import Usermenu from "../share/usermenu";

import { items } from "../fakedata";

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
          type="search"
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
                <img className='arrow' src={item.percentage > 0 ? up : down} alt="" />
              </div>
            </Card>
            <Collapse
              key={i}
              className={
                "item-details" +
                " " +
                (this.state.isItemDetailsOpen[i] ? "item-detail-onflex" : "")
              }
              isOpen={this.state.isItemDetailsOpen[i]}
            >
              <span>{item.description}</span>
            </Collapse>
          </div>
        ))}
        <Usermenu />
      </div>
    );
  }
}
