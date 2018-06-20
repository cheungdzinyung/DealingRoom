import * as React from "react";

// importing UI elements
import { Card, Elevation, Collapse } from "@blueprintjs/core";
import { AreaChart, Area, Tooltip, XAxis } from "recharts";

// import static icons
import wallet from "../icons/item/wallet.svg";
import info from "../icons/item/info.svg";
import up from "../icons/item/up.svg";
// import down from "../icons/item/down.svg";
import plus from "../icons/item/plus.svg";

// Import types 
import { IItemPriceGraphData } from "src/modules";

interface IMenuItemProps {
    key: number;
    itemName: string;
    price: number;
    priceDelta: number;
    details: string;
    image: "*.jpg" | "*.png" | "*.jpeg";
    detailIsOpen: boolean
    priceData: IItemPriceGraphData[]
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
                    interactive={true}
                    elevation={Elevation.ONE}
                    key={this.props.key}
                >
                    {/* Absolute location */}
                    {/* Product images */}
                    <img src={this.props.image} className="menu-item-img" alt="" />
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
                                    &#36;{this.props.price}
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
                    <h3>Details</h3>
                    <hr className="item-split" />
                    <p>{this.props.details}</p>
                    <h3>Performance</h3>
                    <hr className="item-split" />
                    <AreaChart width={200} height={100} data={this.props.priceData}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="time" />
                        {/* <YAxis /> */}
                        <Tooltip />
                        <Area type="monotone" dataKey="purchasePrice" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                </Collapse>
            </div>
        );
    }
}
