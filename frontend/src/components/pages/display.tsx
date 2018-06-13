// Importing modules from library
import * as React from "react";

// Importing static assets
import downWhite from "../../icons/down-white.svg";
import upWhite from "../../icons/up-white.svg";
import tempImg from "../../images/profiles/circle-head.png";

// Importing temporary data
import { categories, menuItems } from "../../fakedata";

// Importing utility function and classes
import { IPureMenuItemWithFluctuation } from "src/modules";
import { percentageChange } from '../../util/utility';


interface IPureMenuCategory {
    name: string[];
}
interface IDisplayState {
    items : IPureMenuItemWithFluctuation[];
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
          items: menuItems
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
                                    <span>{item.itemName}</span>
                                </div>
                                <div className={
                                    this.state.items.map[i]
                                        ? "item-arrow-display"
                                        : percentageChange(item.chartData.datasets[0].data[item.chartData.datasets[0].data.length - 1], item.chartData.datasets[0].data[0]) > 0
                                            ? "item-arrow-display item-price-up"
                                            : "item-arrow-display item-price-down"
                                }>
                                    <img className='arrow' src={percentageChange(item.chartData.datasets[0].data[item.chartData.datasets[0].data.length - 1], item.chartData.datasets[0].data[0]) > 0 ? upWhite : downWhite} alt="" />
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