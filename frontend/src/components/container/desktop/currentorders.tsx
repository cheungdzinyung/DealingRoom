// Importing modules
import * as React from "react";

// Importing UI components
import AdminSideMenu from "../../ui/desktop/sidemenu";
import OrderCard from "../../ui/desktop/ordercard";
import { IOrder } from "src/modules";

import { orderItems } from "../../../fakedata";

// import paymentTest from "../../assets/images/payment/stripe.png"

// interface ICurrentOrdersProps{
//     // orderItems: IOrder[];
// }

export default class CurrentOrders extends React.Component<IOrder[]> {
    constructor(props: IOrder[]) {
        super(props)
    }
    public render() {
        return (
            // tslint:disable-next-line:no-unused-expression
            <div className="desktop-page-container">
                <AdminSideMenu />

                <div className="order-card-display">
                    <OrderCard {...orderItems} />
                </div>
            </div>
        )
    }

}