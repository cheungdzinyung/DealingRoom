// Importing modules from library
import * as React from "react";

// Importing static assets
// import downWhite from "../../assets/icons/down-white.svg";
// import upWhite from "../../assets/icons/up-white.svg";
import tempImg from "../../assets/images/categories/squarebeer.jpg";

// Importing temporary data
import { singleCategoryMenuItems } from "../../../fakedata";

// Importing utility function and classes
import { IPureCategoryWithItem } from "src/modules";
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";
// import { percentageChange } from '../../../util/utility';



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

    public render() {
        return (
            <div className="display-container">
                <div className="category-display">
                    <img className="display-img" src={tempImg} alt="display-pic" />
                    <h2>{this.state.singleCategory.categoryName}</h2>
                </div>

                <div className="price-fluctuation-graph">
                    <LineChart width={500} height={180} data={[
                        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
                        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
                        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
                        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
                        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
                        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
                        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
                    ]}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                    </LineChart>
                </div>
                <div className="category-item-container">
                    {this.state.singleCategory.items.map((item, i) => {
                        return (
                            <div className="category-item-display" key={i}>
                                <span>{item.itemName}</span>
                                <span>${item.currentPrice}</span>
                            </div>
                        )
                    })
                    }
                </div>

                <div className="rss-feed">
                <span className="feed-text">This round of discount is brought to you by dealingroom!</span>
                </div>
            </div>
        );
    }

}