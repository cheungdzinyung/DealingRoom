import * as React from "react";

// importing UI elements
import { Card, Elevation, Collapse } from "@blueprintjs/core";
import { AreaChart, Area, Tooltip } from "recharts";

// import static icons
import wallet from "../icons/item/wallet.svg";
import info from "../icons/item/info.svg";
import up from "../icons/item/up.svg";
// import down from "../icons/item/down.svg";
import plus from "../icons/item/plus.svg";

// Import types 
import { IItemPriceGraphData } from "src/modules";

interface IMenuItemProps {
    item_id: number;
    categoryName: string;
    itemName: string;
    currentPrice: number;
    priceDelta: number;
    itemDescription: string;
    itemPhoto: "*.jpg" | "*.png" | "*.jpeg";
    detailIsOpen: boolean
    chartData: IItemPriceGraphData[]
    // openDetail => cb
    // add item => cb
}

export default class MenuItem extends React.Component<IMenuItemProps> {
    constructor(props: IMenuItemProps) {
        super(props);
    }
    public render() {
        return (
            <div className="menu-item-container">
                <Card
                    className="menu-item-card rd-corner"
                    elevation={Elevation.ONE}
                    data-productId={this.props.item_id}
                >
                    {/* Absolute location */}
                    {/* Product images */}
                    <img src={this.props.itemPhoto} className="menu-item-img" alt="" />
                    {/* Info button  */}
                    <img className="item-info" src={info} alt="" />
                    <img className="add-item" src={plus} alt="" />
                    <span className="menu-item-name">{this.props.itemName}</span>
                    <div className="menu-item-bot">
                        {/* Divider */}
                        <hr className="item-split" />
                        {/* Bottom part of the card */}
                        <div className="item-fluctuation">
                            <div className="item-flucutation-container">
                                <img className="flux-img" src={wallet} alt="" />
                                <span className="item-fluctuation-display">
                                    &#36;{this.props.currentPrice}
                                </span>
                            </div>
                            <div className="item-flucutation-container">
                                <img className="flux-img" src={up} alt="" />
                                <span className="item-fluctuation-display">
                                    {this.props.priceDelta}%
                </span>
                            </div>
                        </div>
                    </div>
                </Card>
                <Collapse className="item-detail-collapse rd-corner" isOpen={this.props.detailIsOpen}>
                    <div className="item-detail-wrapper">
                        <h3 className="item-detail-subheader">Details</h3>
                        <hr className="item-split" />
                        <p className="item-detail">{this.props.itemDescription}</p>
                        <h3 className="item-detail-subheader">Performance</h3>
                        <hr className="item-split" />
                        <AreaChart width={180} height={80} data={this.props.chartData}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Tooltip />
                            <Area type="monotone" dataKey="purchasePrice" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        </AreaChart>
                    </div>
                </Collapse>
            </div>
        );
    }
}
