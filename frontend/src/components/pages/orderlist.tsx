// Importing modules
import { Card, Elevation } from "@blueprintjs/core";
import * as History from "history";
import * as React from "react";
// import { IPureUsersOrderList } from "../../modules"

// Importing components
import OrderBanner from "../share/orderbanner";
import Usermenu from "../share/usermenu";

// Importing static assets
import checkIcon from "../../icons/check.svg";
import headerImg from "../../icons/orders.svg";

// Importing fake data
// import { orderList } from "../../fakedata";

// import redux and friends
import { connect } from "react-redux";
import { IRootState } from "../reducers/index";
import { getOrdersByUserid } from "../actions/actions_orders";

interface IOrdersProps {
  history: History.History,
  ordersList: any,
  getOrdersByUserid: (userID: number) => void,
}

class PureOrderList extends React.Component<IOrdersProps, {}> {
  constructor(props: IOrdersProps) {
    super(props);
  }

  public openSingleOrder = (orderNumber: number) => {
    this.props.history.push(`/order/${orderNumber}`);
  }

  public componentDidMount () {
    const userID = 1;
    this.props.getOrdersByUserid(userID);
  }

  public render() {
    return (
      
      <div className="page-content-container">
        <OrderBanner displayName="Ivan" tableNumber={3} image={headerImg} />
        {this.props.ordersList.orders.filter( (each:any) => !each.isPaid).length > 0 && (
          <div className="order-header-container">
            <h3 className="order-header">To be paid</h3>
          </div>
        )}
        {this.props.ordersList.orders
          .filter((each:any) => !each.isPaid)
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
          .filter((each:any) => each.isPaid === true)
          .map((indOrd:any, index:any) => (
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
    ordersList: state.orders.ordersList,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getOrdersByUserid: (userID: number) => {
      dispatch(getOrdersByUserid(userID));
    },
  }
}

const OrderList = connect(mapStateToProps, mapDispatchToProps)(PureOrderList);

export default OrderList