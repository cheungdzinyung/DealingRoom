import * as React from "react";
// import { TextArea } from "@blueprintjs/core";
import tempImg from "../../images/circle-head.png";

import { categories, items } from "../fakedata";

interface IMenuItem {
    name: string;
    percentage: number;
    description: string;
    currentPrice: number;
}

interface IMenuCategory {
    name: string[];
}
interface IDisplayState {
    items : IMenuItem[];
    categories : IMenuCategory;

  }

export default class Display extends React.Component<{}, IDisplayState> {
    constructor(props: {}) {
      super(props);

      this.state = {
          // tslint:disable-next-line:object-literal-shorthand
          categories: categories,
          // tslint:disable-next-line:object-literal-shorthand
          items: items
      }
    }

    public render() {
        // const itemName = this.state.items;
        // const itemCat = this.state.categories;
        // const nameDisplay = itemName.map(name)
        return (
            <div className="display-container">
                <div className="display-banner">
                    <img className="display-img" src={tempImg} alt="display-pic" />
                    <h2>${categories.name}</h2>
                </div>
                <div className="display-grid">
                    <div className="item-name">{this.state.items[0].name}</div>
                    <div className="item-percentage">{this.state.items[0].description}</div>
                </div>
            </div>
              );
    }
}