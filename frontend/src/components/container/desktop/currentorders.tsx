// Importing modules
import * as React from "react";

// Importing UI components
import PageHeader from "../../ui/desktop/pageheader";
import AdminSideMenu from "../../ui/desktop/sidemenu";
import OrderCard from "../../ui/desktop/ordercard";

import { IOrderListStaff } from "src/modules";

// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { getAllOrders, updateOrderStatusServed } from "../../../redux/desktop/actions/actions_waiter";

interface ICurrentOrdersProps {
    allOrders: IOrderListStaff[],
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

class PureCurrentOrders extends React.Component<ICurrentOrdersProps> {
    constructor(props: ICurrentOrdersProps) {
        super(props)
    }

    public componentDidMount() {
        if (!this.props.allOrdersReady) {
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
                            <PageHeader header="Current Orders" />
                            {/* <button className="test-socket" onClick={this.made}>TEST SOCKET</button> */}
                        </div>
                        <div className="order-card-display">
                            {this.props.allOrders
                                .filter((each: IOrderListStaff) => each.status === "made")
                                // .filter((each: any) => each.isPaid && undefined)  
                                .map((oneOrder: IOrderListStaff, index: number) => (
                                    <OrderCard 
                                        {...oneOrder} 
                                        key={index}
                                        confirmServed={this.props.updateOrderStatusServed}/>
                                ))
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