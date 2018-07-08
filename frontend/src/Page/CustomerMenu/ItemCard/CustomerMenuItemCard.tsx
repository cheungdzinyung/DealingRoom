import * as React from "react";

// importing UI elements
import { Card, Elevation, Collapse } from "@blueprintjs/core";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

// Importing styling and static assets
import "./CustomerMenuItemCard.scss";
import wallet from "./img/wallet.svg";
import info from "./img/info.svg";
import upArrowImg from "./img/up.svg";
import downArrowImg from "./img/down.svg";
import plus from "./img/plus.svg";

// Import types
import { IItemPriceGraphData } from "src/modules";
import { percentageChange } from "src/util/utility";

// Import util
import { sortGraphDataArray } from "src/util/utility";

interface IMenuItemProps {
  items_id: number;
  itemName: string;
  categoryName: string;
  itemDescription: string;
  minimumPrice: number;
  currentPrice: number;
  itemPhoto: string;
  isSpecial: boolean;
  isActive: boolean;
  chartData: IItemPriceGraphData[];
  addToCurrentOrder: (
    itemID: number,
    itemName: string,
    currentPrice: number
  ) => void;
}

interface IMenuItemState {
  detailIsOpen: boolean;
  delta: number;
  graphDisplayData: IItemPriceGraphData[];
}

export default class MenuItem extends React.Component<
  IMenuItemProps,
  IMenuItemState
  > {
  constructor(props: IMenuItemProps) {
    super(props);

    const percentage = (
      chartData: IItemPriceGraphData[],
      currentPrice: number
    ) => {
      const sortedData = sortGraphDataArray(chartData);
      if (chartData.length > 0) {
        const firstPrice = sortedData[0].purchasePrice;
        const lastPrice = currentPrice;
        return percentageChange(lastPrice, firstPrice);
      }
      return 0;
    };

    const cleanGraphData = (
      chartData: IItemPriceGraphData[],
      currentPrice: number
    ) => {
      if (chartData.length < 2) {
        const newChartData = [...chartData];
        newChartData.push({ time: "now", purchasePrice: currentPrice });
        return newChartData;
      } else {
        return chartData;
      }
    };

    this.state = {
      detailIsOpen: false,
      delta: percentage(this.props.chartData, this.props.currentPrice),
      graphDisplayData: cleanGraphData(
        this.props.chartData,
        this.props.currentPrice
      )
    };
  }

  public addToCurrentOrder = (e: React.MouseEvent<HTMLImageElement>) => {
    // also fix price for user
    this.props.addToCurrentOrder(
      this.props.items_id,
      this.props.itemName,
      this.props.currentPrice
    );
  };

  public toggle = () => {
    this.setState({
      detailIsOpen: !this.state.detailIsOpen
    });
  };

  public render() {
    return (
      <div className="menu-item-container">
        <div className="menu-item-card-container">
          {/* Product images */}

          <Card
            className="menu-item-card rd-corner"
            elevation={Elevation.ONE}
            data-productId={this.props.items_id}
          >
            {/* Info button  */}
            <img
              className="item-info"
              src={info}
              alt=""
              onClick={this.toggle}
            />
            {/* Add item button */}
            <img
              className="add-item"
              src={plus}
              alt=""
              onClick={this.addToCurrentOrder}
            />
            <img src={this.props.itemPhoto} className="menu-item-img" alt="" />
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
                  <img
                    className="flux-img"
                    src={this.state.delta > 0 ? upArrowImg : downArrowImg}
                    alt=""
                  />
                  <span className="item-fluctuation-display">
                    {this.state.delta}&#37;
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Expandable bottom card */}
        <Collapse
          className="item-detail-collapse"
          isOpen={this.state.detailIsOpen}
        >
          <div className="item-detail-wrapper">
            <h3 className="item-detail-subheader">Details</h3>
            <hr className="item-deatils-split" />
            <p className="item-detail">{this.props.itemDescription}</p>
            <h3 className="item-detail-subheader">Performance</h3>
            <hr className="item-performance-split" />
            <div className="menu-item-detail-graph-container">
              <ResponsiveContainer>
                <AreaChart data={this.state.graphDisplayData}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EB5757" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#2D9CDB"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="purchasePrice"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}
