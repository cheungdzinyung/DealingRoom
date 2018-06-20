// Importing modules from library
import * as React from "react";

// Importing static assets
import downWhite from "../icons/down-white.svg";
import upWhite from "../icons/up-white.svg";
import tempImg from "../images/profiles/circle-head.png";

// Importing temporary data
import { singleCategoryMenuItems } from "../../fakedata";

// Importing utility function and classes
import { IPureCategoryWithItem } from "src/modules";
import { percentageChange } from '../../util/utility';



interface IDisplayState {
    // items : IPureMenuItemWithFluctuation[];
    // categories : IPureMenuCategory;
    // categoryName: string;

    singleCategory: IPureCategoryWithItem
}

export default class Display extends React.Component<{}, IDisplayState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            //   Sorry Judith, I depleted the original fake data structure, this is the newest one
            singleCategory: singleCategoryMenuItems
        }
    }

    // public componentWillMount(){} // use it for calling backend

    // Sorry for the following method is depleted becuase the data structure is now changed to the exact format that we will be receiving from the backend, which the category will also come with the path, hence it is no longer necessary to create just a state for just the item category.

    // public componentDidMount() {
    //     // the category name should be either from previous page or from the backend
    //     const categoryName = this.state.categories.name.find((name) => name === 'Cocktails');
    //     if (categoryName) {
    //         this.setState({categoryName});
    //     }
    // }

    public render() {
        return (
            <div className="display-content-container">
                <div className="display-banner">
                    <img className="display-img" src={tempImg} alt="display-pic" />
                    <h2>{this.state.singleCategory.categoryName}</h2>
                </div>
                <div className="display-container">
                    {this.state.singleCategory.items.map((item, i) => {
                        return (
                            <div className="display-grid" key={i}>
                                <div className="item-name-display">
                                    <span>{item.itemName}</span>
                                </div>
                                <div className={
                                    this.state.singleCategory.items.map[i]
                                        ? "item-arrow-display"
                                        : percentageChange(item.chartData[item.chartData.length - 1].purchasePrice, item.chartData[0].purchasePrice) > 0
                                            ? "item-arrow-display item-price-up"
                                            : "item-arrow-display item-price-down"
                                }>
                                    <img className='arrow' src={percentageChange(item.chartData[item.chartData.length - 1].purchasePrice, item.chartData[0].purchasePrice) > 0 ? upWhite : downWhite} alt="" />
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
                <div className="rssFeed">This round of discount is brought to you by dealingroom!</div>
            </div>
        );
    }
}