// Importing modules from library
import * as React from "react"
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { IItemPriceGraphData } from "src/modules"


export interface IDisplayMainProps {
    singleCategory: string
    averagePrice: number
    data: IItemPriceGraphData[]
}

export class DisplayMain extends React.Component<IDisplayMainProps, {}>{
    constructor(props: IDisplayMainProps) {
        super(props);
    }

    public render() {
        return (
            <div className="display-data-main-container">
                <div className="display-data-category-name-container">
                    <h1 className="display-data-category-name-text">
                        {this.props.singleCategory}
                    </h1>
                </div>
                <div className="display-data-category-price-fluctuation-container">
                    <p className="price">&#36;{this.props.averagePrice}</p>
                    <p className="info">Average Price</p>
                </div>
                <div className="display-data-category-price-graph-container">
                    <ResponsiveContainer>
                        <AreaChart
                            data={this.props.data}
                            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>

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
        )
    }
}