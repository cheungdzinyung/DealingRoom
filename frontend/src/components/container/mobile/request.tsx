// Importing modules
import * as React from "react";

// import redux and friends
import { connect } from "react-redux";
import { IRootState } from "../../../redux/mobile/reducers/index";
import { removeFromCurrentOrder, confirmOrder } from "../../../redux/mobile/actions/actions_orders";

// for redir
import * as History from "history";
import { withRouter } from "react-router";
import { redirectPage, resetTargetPage } from "../../../redux/mobile/actions/actions_user";

// Importing UI
import UserMenu from "../../ui/mobile/usermenu";
import { Button, Card, Elevation, Intent } from "@blueprintjs/core";

// Importing interfaces
import { IRequestItem, ICurrentOrder } from "../../../modules";

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
}

class PureRequest extends React.Component<IRequestProps, {}> {
  constructor(props: IRequestProps) {
    super(props);
  }

  public componentDidMount () {
    if (this.props.currentOrder.length === 0) {
      alert("your shopping cart is empty")
      this.props.redirectPage("/menu", this.props.history);
      this.props.resetTargetPage();
    }
  }

  public componentDidUpdate() {
    if (this.props.currentOrder.length === 0) {
      this.props.redirectPage("/order", this.props.history);
      this.props.resetTargetPage();
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
            <span className="request-amount">${this.props.currentTotal}</span>
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
        <UserMenu />
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    user_id: state.user.userProfile.users_id,
    currentOrder: state.orders.currentOrder,
    currentTotal: state.orders.currentTotal,
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
  }
}

  const Request = connect(mapStateToProps, mapDispatchToProps)(PureRequest);

  export default withRouter(Request as any);