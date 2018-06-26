// Importing modules
import * as React from "react";

// Importing UI components
import PageHeader from "../../ui/desktop/pageheader";
import AdminSideMenu from "../../ui/desktop/sidemenu";
import OrderCard from "../../ui/desktop/ordercard";

// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { getAllOrders, updateOrderStatusServed } from "../../../redux/desktop/actions/actions_waiter";


interface IPendingOrdersProps {
    allOrders: any,
    allOrdersReady: boolean,
    getAllOrders: () => void,
    updateOrderStatusServed: (orderId: number) => void,
}

const mapStateToProps = (state: IRootState) => {
    return {
        allOrders: state.staff.bartender.allOrders,
        allOrdersReady: state.staff.bartender.allOrdersReady,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getAllOrders: () => {
            dispatch(getAllOrders());
        },
        updateOrderStatusServed: (orderId: number) => {
            dispatch(updateOrderStatusServed(orderId));
        },
    };
};

import { allOrders } from "../../../fakedata";

class PurePendingOrders extends React.Component<IPendingOrdersProps> {
    constructor(props: IPendingOrdersProps) {
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
                            { allOrders
                                .filter((each: any) => each.status === "confirmed" || each.status === "made")
                                .map((oneOrder, index) => (<OrderCard {...oneOrder} key={index} />))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const PendingOrders = connect(
    mapStateToProps,
    mapDispatchToProps
)(PurePendingOrders);

export default PendingOrders;