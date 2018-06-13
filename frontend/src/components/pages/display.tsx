// Importing modules from library
import * as React from "react";

// Importing static assets
import downWhite from "../../icons/down-white.svg";
import upWhite from "../../icons/up-white.svg";
import tempImg from "../../images/profiles/circle-head.png";

// Importing temperary data
import { categories, items } from "../../fakedata";


interface IPureMenuItem {
    name: string;
    percentage: number;
    description: string;
    currentPrice: number;
}

interface IPureMenuCategory {
    name: string[];
}
interface IDisplayState {
    items : IPureMenuItem[];
    categories : IPureMenuCategory;
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
        const categoryName = this.state.categories.name.find((name) => name === 'Cocktails');
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
                <div className="display-container">
                {this.state.items.map((item, i) => {
                        return (
                            <div className="display-grid" key={i}>
                                <div className="item-name-display">
                                    <span>{item.name}</span>
                                </div>
                                <div className={
                                    this.state.items.map[i]
                                        ? "item-arrow-display"
                                        : item.percentage > 0
                                            ? "item-arrow-display item-price-up"
                                            : "item-arrow-display item-price-down"
                                }>
                                    <img className='arrow' src={item.percentage > 0 ? upWhite : downWhite} alt="" />
                                </div>
                            </div>
                        )
                    }
                )}
            </div>
                <div className="rssFeed">This round of discount is brought to you by...</div>
            </div>
              );
    }
}