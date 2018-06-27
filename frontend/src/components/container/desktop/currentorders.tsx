// Importing modules
import * as React from "react";

// Importing UI components
import PageHeader from "../../ui/desktop/pageheader";
import AdminSideMenu from "../../ui/desktop/sidemenu";
import OrderCard from "../../ui/desktop/ordercard";

import { allOrders } from "../../../fakedata";

// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { getAllOrders, updateOrderStatusMade } from "../../../redux/desktop/actions/actions_bartender";

interface ICurrentOrdersProps {
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

class PureCurrentOrders extends React.Component<ICurrentOrdersProps> {
    constructor(props: ICurrentOrdersProps) {
        super(props)
    }

    public componentDidMount() {
        if (!this.props.allOrdersReady) {
            this.props.getAllOrders();
        }
    }

    public made = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.props.updateOrderStatusMade(4);
    }

    public render() {
        return (
            // tslint:disable-next-line:no-unused-expression
            <div className="desktop-page-container">
                <AdminSideMenu />
                <div className="currentorder-container-center">
                    <div className="currentorder-wrapper">
                        <div className="currentorder-header">
                            <PageHeader header="Current Orders" />
                            <button className="test-socket" onClick={this.made}>TEST SOCKET</button>
                        </div>
                        <div className="order-card-display">
                            {allOrders
                                .filter((each: any) => each.status === "made" || each.status === "served")
                                // .filter((each: any) => each.isPaid && undefined)  
                                .map((oneOrder, index) => (<OrderCard {...oneOrder} key={index}/>))
                            }              
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const CurrentOrders = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureCurrentOrders);

export default CurrentOrders;