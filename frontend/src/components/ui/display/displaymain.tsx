// Importing modules from library
import * as React from "react"
import { AreaChart, Area, ResponsiveContainer, XAxis } from "recharts";
import { IItemPriceGraphData } from "src/modules"


export interface IDisplayMainProps {
    singleCategory: string
    pirceChange: number
    data: IItemPriceGraphData[]
}

export class DisplayMain extends React.Component<IDisplayMainProps, {}>{
    constructor(props: IDisplayMainProps) {
        super(props);
    }

    public render() {
        return (
            <div className="display-data-main-container">
                <div className="display-data-category-name-container"><h1 className="display-data-category-name-text">
                    {this.props.singleCategory}</h1>
                </div>
                <div className="display-data-category-price-fluctuation-container">
                    <p className="price">&#36;{this.props.pirceChange}</p>
                    <p className="info">Today Increase Sales</p>
                </div>
                <div className="display-data-category-price-graph-container">
                    <ResponsiveContainer>
                        <AreaChart
                            data={this.props.data}
                            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                            <XAxis dataKey="time" />
                            {/* <YAxis /> */}
                            <Area type='monotone' dataKey="purchasePrice" stroke='#8884d8' fill='#8884d8' />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }
}