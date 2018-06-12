// Importing modules
// import { Card, Elevation } from "@blueprintjs/core";
import * as History from "history";
import * as React from "react";
import { IPureOrder } from "../../modules"

// Importing components
import OrderBanner from "../share/orderbanner";
import Usermenu from "../share/usermenu";

// Importing static assets
// import checkIcon from "../../icons/check.svg";
import headerImg from "../../icons/orders.svg";

// Importing fake data
import { singleOrder } from "../../fakedata";

interface IPureOrderProps {
    history: History.History;
}

interface IPureOrdersStates {
    order: IPureOrder
}

export default class Order extends React.Component<IPureOrderProps, IPureOrdersStates> {
    constructor(props: IPureOrderProps) {
        super(props);

        this.state = {
            order: singleOrder
        };

    }
    public render() {
        return (
            <div className="page-content-container">
                <OrderBanner displayName={this.state.order.displayName} tableNumber={this.state.order.table} image={headerImg} status="Order" statusNumber={this.state.order.orders_id} />

                <Usermenu />
            </div>
        );
    }
}
