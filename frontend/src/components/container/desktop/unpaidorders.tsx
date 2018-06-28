// Importing modules
import * as React from "react";

// Importing UI components
import PageHeader from "../../ui/desktop/pageheader";
import AdminSideMenu from "../../ui/desktop/sidemenu";
import OrderCard from "../../ui/desktop/ordercard";
// import bell from "../../assets/icons/desktop/sidemenu/bell.svg"

// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { getAllOrders } from "../../../redux/desktop/actions/actions_bartender";


interface IPendingOrdersProps {
    allOrders: any,
    allOrdersReady: boolean,
    getAllOrders: () => void,
    // updateOrderStatusMade: (orderId: number) => void,
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
        // updateOrderStatusMade: (orderId: number) => {
        //     dispatch(updateOrderStatusMade(orderId));
        // },
    };
};

class PureUnpaidOrders extends React.Component<IPendingOrdersProps> {
    constructor(props: IPendingOrdersProps) {
        super(props);
    }

    public componentDidMount() {
        this.props.getAllOrders();
    }

    public refresh = () => {
        this.props.getAllOrders();
    }

    public render() {
        return (
            <div className="desktop-page-container">
                <AdminSideMenu />
                <div className="currentorder-container-center">
                    <div className="currentorder-wrapper">
                        <div className="currentorder-header">
                            <PageHeader header="Unpaid Orders" />
                            {/* <span><img src={bell} onClick={this.refresh} className="refresh" /></span> */}
                        </div>
                        <div className="order-card-display">
                            {this.props.allOrders
                                .filter((each: any) => each.isPaid === false)
                                .map((oneOrder: any, index: number) => (
                                    <OrderCard
                                        {...oneOrder}
                                        paymentPage={true}
                                        key={index} />))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const UnpaidOrders = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureUnpaidOrders);

export default UnpaidOrders;