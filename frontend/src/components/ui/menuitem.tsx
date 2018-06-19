import * as React from "react";

// importing UI elements
import { Card, Elevation } from "@blueprintjs/core";

interface IMenuItemProps {
    key: number
    itemName: string
    price: number
    priceDelta: number
    details: string
    // image: "*.jpg" | "*.png"
}

export default class MenuItem extends React.Component<IMenuItemProps>{
    constructor(props: IMenuItemProps) {
        super(props);
    }
    public render() {
        return (
            <div className="menu-item-container">
                <Card className="menu-item-card rd-corner" interactive={true} elevation={Elevation.ONE} key={this.props.key}>
                    <span className="menu-item-name">
                        {this.props.itemName}
                    </span>
                </Card>

            </div>
        );
    }
}
