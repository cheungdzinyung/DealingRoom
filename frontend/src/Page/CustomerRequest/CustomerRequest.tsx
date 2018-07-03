// Importing modules
import * as React from "react";

// Importing styling and static assets
import "./CustomerRequest.scss";

// import redux and friends
import { connect } from "react-redux";
import { IRootState } from "src/redux/store";
import { removeFromCurrentOrder, confirmOrder, resetConfirmOrderStatus } from "src/redux/mobile/actions/actions_orders";

// for redir
import * as History from "history";
import { withRouter } from "react-router";
import { redirectPage, resetTargetPage } from "src/redux/mobile/actions/actions_user";

// Importing UI
// import UserMenu from "src/Components/CustomerAccessMenu/usermenu";
import { Button, Card, Elevation, Intent } from "@blueprintjs/core";
import { AppToaster } from "src/Components/ToastAlert/toast";

// Importing interfaces
import { IRequestItem, ICurrentOrder } from "src/modules";
import PageHeader from "src/Components/CustomerPageHeader/pageheader";

interface IRequestProps {
  // handling orders
  user_id: number,
  // table_id: number,
  currentOrder: IRequestItem[],
  currentTotal: number,
  removeFromCurrentOrder: (thisItemID: number) => void,
  confirmOrder: (orderToConfirm: ICurrentOrder) => void,
  // handling redirect
  history: History.History,
  redirectPage: (redirectTarget: string, history: any) => void,
  resetTargetPage: () => void,
  confirmOrderStatus: "null" | "confirmed" | "failed",
  resetConfirmOrderStatus: () => void,
}

class PureRequest extends React.Component<IRequestProps, {}> {
  constructor(props: IRequestProps) {
    super(props);
  }

  public componentDidMount() {
    if (this.props.currentOrder.length === 0) {
      this.props.redirectPage("/customer/menu", this.props.history);
      this.props.resetTargetPage();
      AppToaster.show({
        message: "Try grabbing something to drink first!",
        intent: Intent.WARNING,
        icon: "issue",
        timeout: 1500
      });
    }
  }

  public componentDidUpdate() {
    if (this.props.currentOrder.length === 0 && this.props.confirmOrderStatus === "confirmed") {
      this.props.redirectPage("/customer/order", this.props.history);
      this.props.resetTargetPage();
      this.props.resetConfirmOrderStatus();
      AppToaster.show({
        message: "Your order is confirmed!",
        intent: Intent.PRIMARY,
        icon: "thumbs-up",
        timeout: 2000
      })
    } else if (this.props.currentOrder.length === 0) {
      this.props.redirectPage("/customer/menu", this.props.history);
      this.props.resetTargetPage();
      AppToaster.show({
        message: "Your basket is empty!",
        intent: Intent.WARNING,
        icon: "issue",
        timeout: 2000
      });
    }
  }

  public removeFromCurrentOrder = (e: React.MouseEvent<HTMLDivElement>) => {
    const thisItemID = e.currentTarget.dataset.thisitemid;
    if (thisItemID !== undefined) {
      this.props.removeFromCurrentOrder(parseInt(thisItemID, 10));
    }
  }

  public confirmOrder = () => {
    const orderToConfirm: ICurrentOrder = {
      users_id: this.props.user_id,  // get from root state
      table: 1,   // get from root state
      status: "confirmed", // change to confirmed
      item: this.props.currentOrder,
    }
    this.props.confirmOrder(orderToConfirm);
  }


  public render() {
    return (
      <div className="page-content-container">
        <PageHeader header="Request" subHeader="Make up your mind" />
        {this.props.currentOrder.map((item, i) => (
          <Card key={i}
            className="request-line"
            interactive={true}
            elevation={Elevation.TWO}
            onClick={this.removeFromCurrentOrder}
            data-thisitemid={item.thisItemID}
          >
            <span className="line-item">{item.itemName}</span>
            <Button icon="menu" intent={Intent.DANGER} className="extra-mod" minimal={true} />
          </Card>
        ))}
        <Card
          className="request-summary"
          elevation={Elevation.TWO}
        >
          <div className="request-top">
            <h3 className="request-header">Total Amount:</h3>
            <span className="request-amount">${this.props.currentTotal.toFixed(2)}</span>
          </div>

          {/*hide button when list is empty*/}
          {(this.props.currentOrder.length === 0) ? <div /> :
            <div>
              <hr />
              <button className="confirm-button" onClick={this.confirmOrder}>
                <span>Confirm Order</span>
              </button>
            </div>
          }
        </Card>
        {/* <UserMenu /> */}
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    user_id: state.customer.user.userProfile.users_id,
    currentOrder: state.customer.orders.currentOrder,
    currentTotal: state.customer.orders.currentTotal,
    confirmOrderStatus: state.customer.orders.confirmOrderStatus,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeFromCurrentOrder: (thisItemID: number) => {
      dispatch(removeFromCurrentOrder(thisItemID));
    },
    confirmOrder: (orderToConfirm: ICurrentOrder) => {
      dispatch(confirmOrder(orderToConfirm));
    },
    redirectPage: (redirectTarget: string, history: any) => {
      dispatch(redirectPage(redirectTarget, history));
    },
    resetTargetPage: () => {
      dispatch(resetTargetPage());
    },
    resetConfirmOrderStatus: () => {
      dispatch(resetConfirmOrderStatus());
    }
  }
}

const Request = connect(mapStateToProps, mapDispatchToProps)(PureRequest);

export default withRouter(Request as any);