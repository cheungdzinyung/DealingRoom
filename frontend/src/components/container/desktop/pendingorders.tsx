// Importing modules
import * as React from "react";

// Importing UI components
import PageHeader from "../../ui/desktop/pageheader";
import AdminSideMenu from "../../ui/desktop/sidemenu";
import OrderCard from "../../ui/desktop/ordercard";

import { IOrder } from "src/modules";

import { pendingOrders } from "../../../fakedata";

export default class PendingOrders extends React.Component<IOrder[]> {
    constructor(props: IOrder[]) {
        super(props);

        this.state = {

        }
    }
    public render() {
        return (
            // tslint:disable-next-line:no-unused-expression
            <div className="desktop-page-container">
                <AdminSideMenu />
                <div className="currentorder-container-center">
                    <div className="currentorder-wrapper">
                        <div className="currentorder-header">
                            <PageHeader header="Pending Orders" />
                        </div>
                        <div className="order-card-display">
                            {pendingOrders.filter}
                            {pendingOrders.map((oneOrder, index) => (<OrderCard {...oneOrder} key={index} />))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}