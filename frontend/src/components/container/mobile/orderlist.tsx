// Importing modules
import * as History from "history";
import * as React from "react";


// Importing UI components
import { Card, Elevation } from "@blueprintjs/core";
import Usermenu from "../../ui/mobile/usermenu";

// Importing static assets
import checkIcon from "../../assets/icons/check.svg";

// import redux and friends
import { connect } from "react-redux";
import { IRootState } from "../../../redux/reducers/index";
import { getOrdersByUserToken } from "../../../redux/actions/actions_orders";

interface IOrdersProps {
  history: History.History,
  // user_id: number,
  ordersList: any,
  getOrdersByUserToken: () => void,
}

class PureOrderList extends React.Component<IOrdersProps, {}> {
  constructor(props: IOrdersProps) {
    super(props);
  }

  public openSingleOrder = (orderNumber: number) => {
    this.props.history.push(`/order/${orderNumber}`);
  }

  public componentDidMount() {
    this.props.getOrdersByUserToken();
  }

  public render() {
    return (
      <div className="page-content-container">

        { /* check if new customer has no history to display */
          (this.props.ordersList.orders.length === 0) ?
            ( <div className="order-header-container">
                <h3 className="order-header">Your order history is empty, get a drink</h3>
              </div>) : <div />
        }

        {this.props.ordersList.orders.filter((each: any) => !each.isPaid).length > 0 && (
          <div className="order-header-container">
            <h3 className="order-header">To be paid</h3>
          </div>
        )}
        {this.props.ordersList.orders
          .filter((each: any) => !each.isPaid)
          .map((indOrd: any, index: any) => (
            <Card
              className="order-cards"
              interactive={true}
              elevation={Elevation.TWO}
              key={`unpaid_${index}`}
              onClick={this.openSingleOrder.bind(this, indOrd.orders_id)}
            >
              <div className="top">
                <div className="order-details">
                  <h3 className="order-number">Order #{indOrd.orders_id}</h3>
                  <p className="order-amount">Total Amount: ${indOrd.orderItems.reduce((accu: number, curr: any) => (accu + parseFloat(curr.purchasePrice)), 0)}</p>
                  <p className="order-time">
                    Ordering time: {indOrd.orderingTime}
                  </p>
                </div>
              </div>
              <hr />
              <button className="paynow-button">
                <span>Pay Now</span>
              </button>
            </Card>
          ))}
        {/* Split into two parts */}
        {this.props.ordersList.orders.filter((each: any) => each.isPaid === true).length >
          0 && (
            <div className="order-header-container">
              <h3 className="order-header">Paid</h3>
            </div>
          )}
        {this.props.ordersList.orders
          .filter((each: any) => each.isPaid === true)
          .map((indOrd: any, index: any) => (
            <Card
              className="order-cards"
              interactive={true}
              elevation={Elevation.TWO}
              key={`paid_${index}`}
            >
              <div className="top">
                <div className="order-details">
                  <h3 className="order-number">Order #{indOrd.orders_id}</h3>
                  <p className="order-amount">Total Amount: ${indOrd.orderItems.reduce((accu: number, curr: any) => (accu + parseFloat(curr.purchasePrice)), 0)}</p>
                  <p className="order-time">
                    Ordering time: {indOrd.orderingTime}
                  </p>
                </div>
                <img src={checkIcon} className="order-icon" alt="" />
              </div>
            </Card>
          ))}
        {/* End of Dynamic content*/}
        <Usermenu />

      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    // user_id: state.user.user_id,
    ordersList: state.orders.ordersList,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getOrdersByUserToken: () => {
      dispatch(getOrdersByUserToken());
    },
  }
}

const OrderList = connect(mapStateToProps, mapDispatchToProps)(PureOrderList);

export default OrderList