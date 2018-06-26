// Importing modules from library
import * as React from "react"

// Importing static assets
import downWhite from "../../assets/icons/down-white.svg";
import upWhite from "../../assets/icons/up-white.svg";

import { ResponsiveContainer, LineChart, Line } from "recharts";

import { IMenuItemWithFlux } from "src/modules"
import { percentageChange } from "src/util/utility";

export class DisplayFlexItemLine extends React.Component<IMenuItemWithFlux, {}>{
    constructor(props: IMenuItemWithFlux) {
        super(props);
    }

    public render() {
        const firstPrice = this.props.chartData[0].purchasePrice;
        const lastPrice = this.props.chartData[(this.props.chartData.length - 1)].purchasePrice
        const percentage = percentageChange(firstPrice, lastPrice)
        return (
            <div className="display-data-prices-flux-line">
                {(percentage < 0) ?
                    < img src={upWhite} alt="" className="display-data-arrow" /> :
                    < img src={downWhite} alt="" className="display-data-arrow" />
                }
                <span className="display-data-prices-flux-line-item-name">Alcohol</span>
                <div className="display-data-prices-flux-line-item-fluxchart">
                    <ResponsiveContainer>
                        <LineChart data={this.props.chartData}>
                            <Line type='monotone' dataKey='pv' stroke='#8884d8' strokeWidth={2} />

                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <span className="display-data-prices-flux-line-price">$123</span>
            </div>
        )
    }
}