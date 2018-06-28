// Importing modules from library
import * as React from "react";

// Importing static assets
// import upArrow from "src/components/assets/icons/item/up.svg";
// import downArrow from "src/components/assets/icons/item/down.svg";

import { ResponsiveContainer, LineChart, Line } from "recharts";

import { IMenuItemWithFlux, IItemPriceGraphData } from "src/modules";
import { percentageChange } from "src/util/utility";



export class DisplayFlexItemLine extends React.Component<
  IMenuItemWithFlux,
  { delta: number }
  > {
  constructor(props: IMenuItemWithFlux) {
    super(props);

    const percentage = (chartData: IItemPriceGraphData[]) => {
      if (chartData.length !== 0) {
        const firstPrice = chartData[0].purchasePrice;
        const lastPrice = chartData[(this.props.chartData.length - 1)].purchasePrice
        return percentageChange(lastPrice, firstPrice)
      }
      return 0;
    }
    this.state = {
      delta: percentage(this.props.chartData)
    }
  }

  public render() {

    return (
      <div className="display-data-prices-flux-line">
        {/* {this.state.delta < 0 ? (
          <img src={downArrow} alt="" className="display-data-arrow" />
        ) : (
            <img src={upArrow} alt="" className="display-data-arrow" />
          )} */}
        <span className="display-data-prices-flux-line-item-name">
          {this.props.itemName}
        </span>
        <div className="display-data-prices-flux-line-item-fluxchart">
          <ResponsiveContainer>
            <LineChart data={this.props.chartData}>
              <Line
                type="monotone"
                dataKey="purchasePrice"
                stroke={this.state.delta > 0 ? "#73EDA6" : "#F46868"}
                strokeWidth={1}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <span className={
          this.state.delta > 0 ? "display-data-prices-flux-line-price increase-price" :
            "display-data-prices-flux-line-price decrease-price"
        }>&#36;{this.props.currentPrice}</span>
      </div>
    );
  }
}
