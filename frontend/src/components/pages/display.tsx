import * as React from "react";
// import { TextArea } from "@blueprintjs/core";
import tempImg from "../../images/circle-head.png";

import { categories, items } from "../fakedata";

import down from "../../icons/down.svg";
import up from "../../icons/up.svg";

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
    categoryName: string;
  }

export default class Display extends React.Component<{}, IDisplayState> {
    constructor(props: {}) {
      super(props);

      this.state = {
          // tslint:disable-next-line:object-literal-shorthand
          categories: categories,

          categoryName: '',
          // tslint:disable-next-line:object-literal-shorthand
          items: items
      }
    }

    // public componentWillMount(){} // use it for calling backend

    public componentDidMount() {
        // the category name should be either from previous page or from the backend
        const categoryName = this.state.categories.name.find((name) => name === 'cocktail');
        if (categoryName) {
            this.setState({categoryName});
        }
    }

    public render() {
       
        return (
            <div className="display-content-container">
                <div className="display-banner">
                    <img className="display-img" src={tempImg} alt="display-pic" />
                    <h2>{this.state.categoryName}</h2>
                </div>
                {/* style={{display: 'flex, flexWrap: 'wrap}} */}
                <div className="display-container">
                {this.state.items.map((item, i) => {
                        return (
                            // style={{ width: '400px', height: '150px' }}
                            <div className="display-grid" key={i}>
                                <div className="item-name-display">
                                    <span>{item.name}</span>
                                </div>
                                <div className="item-arrow-display">
                                    <img className='arrow-img' src={item.percentage > 0 ? up : down} alt="" />
                                </div>
                            </div>
                        )
                    }
                )}
                </div>
            </div>
              );
    }
}