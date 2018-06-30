// Importing modules
import * as React from "react";

// Importing UI components
import PageHeader from "../../ui/desktop/pageheader";
import AdminSideMenu from "../../ui/desktop/sidemenu";
import OrderCard from "../../ui/desktop/ordercard";

// for redir
import * as History from "history";
import { withRouter } from "react-router";
import { IUserProfile } from "src/modules";

// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { getAllOrders, updateOrderStatusMade } from "../../../redux/desktop/actions/actions_bartender";


interface IPendingOrdersProps {
    allOrders: any,
    allOrdersReady: boolean,
    getAllOrders: () => void,
    updateOrderStatusMade: (orderId: number) => void,
    // handling redirect
    customerProfile: IUserProfile,
    history: History.History,
}

const mapStateToProps = (state: IRootState) => {
    return {
        allOrders: state.staff.bartender.allOrders,
        allOrdersReady: state.staff.bartender.allOrdersReady,
        customerProfile: state.customer.user.userProfile,
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

    public componentWillMount() {
        // const isStaff = (
        //     this.props.customerProfile.role === "manager" ||
        //     this.props.customerProfile.role === "bartender" ||
        //     this.props.customerProfile.role === "waiter"
        // );
        // allow access b4 staff login is ok
        // const isStaff = false;
        // if (!isStaff) {
        //     this.props.history.push("/menu");
        // }
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
                                .map((oneOrder: any, index: number) => (
                                <OrderCard {...oneOrder}
                                confirmMade={this.props.updateOrderStatusMade}
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

export default withRouter(PendingOrders as any);