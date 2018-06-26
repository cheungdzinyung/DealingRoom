// Importing modules from library
import * as React from "react";

// Importing static assets
// import downWhite from "../../assets/icons/down-white.svg";
import upWhite from "../../assets/icons/up-white.svg";
// import tempImg from "../../assets/images/categories/squarebeer.jpg";

// Importing temporary data
import { singleCategoryMenuItems } from "../../../fakedata";

// Importing utility function and classes
// import { LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";
// import { percentageChange } from '../../../util/utility';
import { IMenuCategoryWithFlux } from "src/modules";
import { AreaChart, Tooltip, Area, Line, ResponsiveContainer } from "recharts";

// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { getEntireMenu } from "../../../redux/desktop/actions/actions_display";


interface IDisplayProps {
    entireMenu: IMenuCategoryWithFlux[],
    menuReady: boolean,
    categories: string[],
    getEntireMenu: () => void,
}

interface IDisplayState {
    singleCategory: IMenuCategoryWithFlux
}

const mapStateToProps = (state: IRootState) => {
    return {
        entireMenu: state.staff.display.entireMenu,
        menuReady: state.staff.display.menuReady,
        categories: state.staff.display.categories,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getEntireMenu: () => {
            dispatch(getEntireMenu());
        },
    };
};

class PureDisplay extends React.Component<IDisplayProps, IDisplayState> {
    constructor(props: IDisplayProps) {
        super(props);

        this.state = {
            singleCategory: singleCategoryMenuItems
        }
    }

    public componentDidMount () {
        if (!this.props.menuReady) {
            this.props.getEntireMenu();
        }
    }

    public render() {

        const data = [
            { name: 'Page A', uv: 4000 },
            { name: 'Page B', uv: 3000 },
            { name: 'Page C', uv: 2000 },
            { name: 'Page D', uv: 2780 },
            { name: 'Page E', uv: 1890 },
            { name: 'Page F', uv: 2390 },
            { name: 'Page G', uv: 3490 },
        ];
        return (
            <div className="display-container">
                <div className="display-data-container">
                    <div className="display-data-main-container">
                        <div className="display-data-category-name-container"><h1 className="display-data-category-name-text">
                            {this.state.singleCategory.categoryName}</h1>
                        </div>
                        <div className="display-data-category-price-fluctuation-container">
                            <p className="price">$304</p>
                            <p className="info">Today Increase Sales</p>
                        </div>
                        <div className="display-data-category-price-graph-container">
                            <ResponsiveContainer>
                                <AreaChart
                                    data={data}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                    {/* <XAxis dataKey="name" /> */}
                                    {/* <YAxis /> */}
                                    <Tooltip />
                                    <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="display-data-sub-container">12</div>
                    <div className="display-data-info-container">12</div>
                    <div className="display-data-prices-container">
                        <div className="display-data-prices-flux-line">
                            <img src={upWhite} alt="" className="display-data-arrow" />
                            <span className="display-data-prices-flux-line-item-name">Alcohol</span>
                            {/* Graph */}
                            <div className="display-data-prices-flux-line-item-fluxchart">
                                <ResponsiveContainer>
                                    <AreaChart data={data}>
                                        <Line type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            {/* End of graph */}
                            <span className="display-data-prices-flux-line-price">$123</span>
                        </div>

                    </div>
                </div>
                {/* <div className="category-display">
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
                </div> */}

                <div className="rss-feed">
                    <span className="feed-text">This round of discount is brought to you by dealingroom!</span>
                </div>
            </div>
        );
    }

}

const Display = connect(mapStateToProps, mapDispatchToProps)(PureDisplay);

export default Display;