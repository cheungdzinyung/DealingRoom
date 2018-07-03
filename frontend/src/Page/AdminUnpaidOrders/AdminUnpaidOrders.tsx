// Importing modules
import * as React from "react";
// import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

// Importing UI components
import PageHeader from "src/Components/AdminPageHeader/AdminPageHeader";
import AdminSideMenu from "src/Components/AdminAccessMenu/AdminAccessMenu";
import OrderCard from "src/Components/AdminOrderCard/AdminOrderCard";

// for redir
import * as History from "history";
import { withRouter } from "react-router";

import { IUserProfile } from "src/modules";

// redux
import { connect } from "react-redux";
import { IRootState } from "src/redux/store";
import { getAllOrders } from "src/redux/desktop/actions/actions_bartender";

interface IUnpaidOrdersProps {
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

interface IUnpaidOrdersState {
    allOrders: any,
}

class PureUnpaidOrders extends React.Component<IUnpaidOrdersProps, IUnpaidOrdersState> {
    constructor(props: IUnpaidOrdersProps) {
        super(props);

        this.state = {
            allOrders: {},
        }
    }

    public componentWillMount() {
        // TODO: check user role, redir if un-auth
    }

    public componentDidMount() {
        this.props.getAllOrders();
    }

    public componentDidUpdate() {
        this.setState({
            allOrders: this.props.allOrders
        })
    }

    // public onSortEnd = ({ oldIndex, newIndex }:{ oldIndex:number, newIndex: number}) => {
    //     this.setState({
    //         allOrders: arrayMove(this.state.allOrders, oldIndex, newIndex),
    //     });
    // };

    public render() {
        // const SortableItem = SortableElement(({ oneOrder, index }) =>
        //     <li>
        //         <OrderCard
        //             {...oneOrder}
        //             paymentPage={true}
        //             key={index} />
        //     </li>
        // )

        // const SortableList = SortableContainer(() => {
        //     return (
        //         <ul>
        //             {this.state.allOrders
        //                 .filter((each: any) => each.isPaid === false)
        //                 .map((oneOrder: any, index: number) => (
        //                     <SortableItem
        //                         key={`item-${index}`}
        //                         index={index}
        //                         {...oneOrder}
        //                     // sortIndex={index}
        //                     // value={value}
        //                     />
        //                 ))}
        //         </ul>
        //     );
        // })

        return (
            <div className="desktop-page-container">
                <AdminSideMenu />
                <div className="currentorder-container-center">
                    <div className="currentorder-wrapper">
                        <div className="currentorder-header">
                            <PageHeader header="Unpaid Orders" />
                        </div>
                        <div className="order-card-display">
                            {this.props.allOrders
                                .filter((each: any) => each.isPaid === false)
                                .map((oneOrder: any, index: number) => (
                                    <OrderCard
                                        {...oneOrder}
                                        paymentPage={true}
                                        key={index} />))}
                            {/* <SortableList onSortEnd={this.onSortEnd} /> */}
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