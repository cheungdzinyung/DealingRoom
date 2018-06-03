import { Card, Elevation } from "@blueprintjs/core";
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
}

export default class Menu extends React.Component<{}, IMenuState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      items
    };
  }
  public render() {
    return (
      <div className="page-content-container">
        {this.state.items.map(itm => (
          <Card interactive={true} elevation={Elevation.FOUR}>
            <h2>{itm.name}</h2>
            <p>${itm.currentPrice}</p>
            <p>{itm.percentage}%</p>
            <p>{itm.description}</p>
          </Card>
        ))}
        <Usermenu />
      </div>
    );
  }
}
