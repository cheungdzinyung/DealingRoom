// Importing modules
import * as React from "react";

// Importing styling and static assets
import "./AdminCurrentOrders.scss";

// Importing UI components
import PageHeader from "src/Components/AdminPageHeader/AdminPageHeader";
import AdminSideMenu from "src/Components/AdminAccessMenu/AdminAccessMenu";
import OrderCard from "src/Components/AdminOrderCard/AdminOrderCard";

// for redir
import * as History from "history";
import { withRouter } from "react-router";

import { IOrderListStaff, IUserProfile } from "src/modules";

// redux
import { connect } from "react-redux";
import { IRootState } from "src/redux/store";
import {
  getAllOrders,
  updateOrderStatusServed
} from "src/redux/desktop/actions/actions_waiter";

interface ICurrentOrdersProps {
  allOrders: IOrderListStaff[];
  allOrdersReady: boolean;
  getAllOrders: () => void;
  updateOrderStatusServed: (orderId: number) => void;
  // handling redirect
  customerProfile: IUserProfile;
  history: History.History;
}

const mapStateToProps = (state: IRootState) => {
  return {
    allOrders: state.staff.bartender.allOrders,
    allOrdersReady: state.staff.bartender.allOrdersReady,
    customerProfile: state.customer.user.userProfile
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllOrders: () => {
      dispatch(getAllOrders());
    },
    updateOrderStatusServed: (orderId: number) => {
      dispatch(updateOrderStatusServed(orderId));
    }
  };
};

class PureCurrentOrders extends React.Component<ICurrentOrdersProps> {
  constructor(props: ICurrentOrdersProps) {
    super(props);
  }

  public componentDidMount() {
    if (!this.props.allOrdersReady) {
      this.props.getAllOrders();
    }
  }

  public render() {
    return (
      <div className="desktop-page-container">
        <AdminSideMenu />
        <div className="currentorder-container-center">
          <div className="currentorder-wrapper">
            <div className="currentorder-header">
              <PageHeader header="Current Orders" />
            </div>
            <div className="order-card-display">
              {this.props.allOrders
                .filter((each: IOrderListStaff) => each.status === "made")
                .map((oneOrder: IOrderListStaff, index: number) => (
                  <OrderCard
                    {...oneOrder}
                    key={index}
                    confirmServed={this.props.updateOrderStatusServed}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const CurrentOrders = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureCurrentOrders);

export default withRouter(CurrentOrders as any);
