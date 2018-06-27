// Importing modules from library
import * as React from "react";

// Importing static assets
import upArrow from "src/components/assets/icons/item/up.svg";
import downArrow from "src/components/assets/icons/item/down.svg";

import { ResponsiveContainer, LineChart, Line } from "recharts";

import { IMenuItemWithFlux } from "src/modules";
import { percentageChange } from "src/util/utility";

export class DisplayFlexItemLine extends React.Component<
  IMenuItemWithFlux,
  {}
> {
  constructor(props: IMenuItemWithFlux) {
    super(props);
  }

  public render() {
    const firstPrice = this.props.chartData[0].purchasePrice;
    const lastPrice = this.props.chartData[this.props.chartData.length - 1]
      .purchasePrice;
    const percentage = percentageChange(lastPrice, firstPrice);
    return (
      <div className="display-data-prices-flux-line">
        {percentage < 0 ? (
          <img src={downArrow} alt="" className="display-data-arrow" />
        ) : (
          <img src={upArrow} alt="" className="display-data-arrow" />
        )}
        <span className="display-data-prices-flux-line-item-name">
          {this.props.itemName}
        </span>
        <div className="display-data-prices-flux-line-item-fluxchart">
          <ResponsiveContainer>
            <LineChart data={this.props.chartData}>
              <Line
                type="monotone"
                dataKey="purchasePrice"
                stroke={percentage < 0 ? "#F46868" : "#73EDA6"}
                strokeWidth={1}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <span className="display-data-prices-flux-line-price">$123</span>
      </div>
    );
  }
}
