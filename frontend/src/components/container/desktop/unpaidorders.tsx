// Importing modules
import * as React from "react";

// Importing UI components
import PageHeader from "../../ui/desktop/pageheader";
import AdminSideMenu from "../../ui/desktop/sidemenu";
import OrderCard from "../../ui/desktop/ordercard";
// import bell from "../../assets/icons/desktop/sidemenu/bell.svg"

// for redir
import * as History from "history";
import { withRouter } from "react-router";

import { IUserProfile } from "src/modules";

// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { getAllOrders } from "../../../redux/desktop/actions/actions_bartender";


// Using an ES6 transpiler like Babel
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';


interface IPendingOrdersProps {
    allOrders: any,
    allOrdersReady: boolean,
    getAllOrders: () => void,
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
    };
};

class PureUnpaidOrders extends React.Component<IPendingOrdersProps> {
    constructor(props: IPendingOrdersProps) {
        super(props);
    }

    public componentWillMount() {
        // TODO: check user role, redir if un-auth
    }

    public componentDidMount() {
        this.props.getAllOrders();
    }

    // public refresh = () => {
    //     this.props.getAllOrders();
    // }

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

export default withRouter(UnpaidOrders as any);