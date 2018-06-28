// Importing modules
import * as React from "react";

// Importing UI components
import PageHeader from "../../ui/desktop/pageheader";
import AdminSideMenu from "../../ui/desktop/sidemenu";
import OrderCard from "../../ui/desktop/ordercard";

// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { getAllOrders, updateOrderStatusMade } from "../../../redux/desktop/actions/actions_bartender";


interface IPendingOrdersProps {
    allOrders: any,
    allOrdersReady: boolean,
    getAllOrders: () => void,
    updateOrderStatusMade: (orderId: number) => void,
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
        updateOrderStatusMade: (orderId: number) => {
            dispatch(updateOrderStatusMade(orderId));
        },
    };
};

class PurePendingOrders extends React.Component<IPendingOrdersProps> {
    constructor(props: IPendingOrdersProps) {
        super(props);
    }

    public componentDidMount() {
        if(!this.props.allOrdersReady){
            this.props.getAllOrders();
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
                            { this.props.allOrders
                                .filter((each: any) => each.status === "confirmed")
                                // .filter((each: any) => each.isPaid || !each.isPaid) 
                                .map((oneOrder: any, index: number) => (
                                <OrderCard {...oneOrder}
                                confirmMade={this.props.updateOrderStatusMade}
                                // users_id={oneOrder.users_id}
                                // userName={oneOrder.userName} 
                                // displayName={oneOrder.displayName}
                                // orders_id={oneOrder.orders_id} 
                                // table={oneOrder.table} 
                                // status={oneOrder.status} 
                                // // isPaid?={} boolean;
                                // orderTotal={oneOrder.orderTotal}
                                // orderItems={oneOrder.orderItems} 
                                key={index} />))}
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