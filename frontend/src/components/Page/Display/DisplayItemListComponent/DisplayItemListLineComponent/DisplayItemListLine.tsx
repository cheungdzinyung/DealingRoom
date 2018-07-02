// Importing modules from library
import * as React from "react";

// Importing styling and static assets
import "./DisplayItemListLine.scss";

// Importing presentation components
import { ResponsiveContainer, LineChart, Line } from "recharts";
// Importing interfaces from module
import { IMenuItemWithFlux, IItemPriceGraphData } from "src/modules";
// Importing assisting utility functions
import { percentageChange, sortGraphDataArray } from "src/util/utility";

export class DisplayItemListLine extends React.Component<
  IMenuItemWithFlux,
  { delta: number; graphDisplayData: IItemPriceGraphData[] }
> {
  constructor(props: IMenuItemWithFlux) {
    super(props);

    const percentage = (chartData: IItemPriceGraphData[]) => {
      const sortedData = sortGraphDataArray(chartData);
      if (chartData.length > 0) {
        const firstPrice = sortedData[0].purchasePrice;
        const lastPrice = sortedData[sortedData.length - 1].purchasePrice;
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
      delta: percentage(this.props.chartData),
      graphDisplayData: cleanGraphData(
        this.props.chartData,
        this.props.currentPrice
      )
    };
  }

  public render() {
    return (
      <div className="display-data-prices-flux-line">
        <span className="display-data-prices-flux-line-item-name">
          {this.props.itemName}
        </span>
        <div className="display-data-prices-flux-line-item-fluxchart">
          <ResponsiveContainer>
            <LineChart data={this.state.graphDisplayData}>
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
        <span
          className={
            this.state.delta > 0
              ? "display-data-prices-flux-line-price increase-price"
              : "display-data-prices-flux-line-price decrease-price"
          }
        >
          &#36;{this.props.currentPrice}
        </span>
      </div>
    );
  }
}
