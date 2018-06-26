import * as React from "react";

// importing UI elements
import { Card, Elevation, Collapse } from "@blueprintjs/core";
import { AreaChart, Area, Tooltip } from "recharts";

// import static icons
import wallet from "../../assets/icons/item/wallet.svg";
import info from "../../assets/icons/item/info.svg";
import up from "../../assets/icons/item/up.svg";
// import down from "../icons/item/down.svg";
import plus from "../../assets/icons/item/plus.svg";

// Import types 
import { IItemPriceGraphData } from "src/modules";

interface IMenuItemProps {
    // key: number;
    // details: string;
    addToCurrentOrder: (itemID: number, itemName: string, currentPrice: number) => void;
    item_id: number;
    categoryName: string;
    itemName: string;
    currentPrice: number;
    priceDelta: number;
    itemDescription: string;
    itemPhoto: "*.jpg" | "*.png" | "*.jpeg";
    detailIsOpen: boolean
    chartData: IItemPriceGraphData[]
}

interface IMenuItemState {
    detailIsOpen: boolean
}

export default class MenuItem extends React.Component<IMenuItemProps, IMenuItemState> {
    constructor(props: IMenuItemProps) {
        super(props);

        this.state = {
            detailIsOpen: false
        }
    }

    public addToCurrentOrder = (e: React.MouseEvent<HTMLImageElement>) => {
        // public addToCurrentOrder = (e: React.MouseEvent<HTMLDivElement>) => {
        // const itemid = e.currentTarget.dataset.itemid;
        // const itemName = e.currentTarget.dataset.itemname;    // dataset attr are all lowercase
        // if (itemid !== undefined && itemName !== undefined) {
        //   const currentPrice = this.props.entireMenu[this.state.displayCategoryIndex].items.find((element: any) => (parseFloat(itemid) === element.items_id)).currentPrice;
        this.props.addToCurrentOrder(this.props.item_id, this.props.itemName, this.props.currentPrice);
        // }
    }

    public toggle = () => {
        this.setState({
            detailIsOpen: !this.state.detailIsOpen
        })
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
                    <img className="item-info" src={info} alt="" onClick={this.toggle} />
                    <img className="add-item" src={plus} alt="" onClick={this.addToCurrentOrder} />
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
                                    {this.props.priceDelta}
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
                <Collapse className="item-detail-collapse rd-corner" isOpen={this.state.detailIsOpen}>
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
