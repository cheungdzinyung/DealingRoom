// Importing modules
import { Card, Elevation } from "@blueprintjs/core";
import * as History from "history";
import * as React from "react";
import { IPureUsersOrderList } from "../../modules"

// Importing components
import OrderBanner from "../share/orderbanner";
import Usermenu from "../share/usermenu";

// Importing static assets
import checkIcon from "../../icons/check.svg";
import headerImg from "../../icons/orders.svg";

// Importing fake data
import { orderList } from "../../fakedata";


interface IPureOrdersProps {
  history: History.History
}

interface IPureOrdersStates {
  userOrders: IPureUsersOrderList; 
}

export default class OrderList extends React.Component<IPureOrdersProps, IPureOrdersStates> {
  constructor(props: IPureOrdersProps) {
    super(props);

    this.state = {
      userOrders:  orderList
    };
  }

  public openSingleOrder = (orderNumber: number) => {
    this.props.history.push(`/order/${orderNumber}`);
  }

  public render() {
    return (
      
      <div className="page-content-container">
        <OrderBanner displayName="Ivan" tableNumber={3} image={headerImg} />
        {this.state.userOrders.orders.filter(each => !each.isPaid).length > 0 && (
          <div className="order-header-container">
            <h3 className="order-header">To be paid</h3>
          </div>
        )}
        {this.state.userOrders.orders
          .filter(each => !each.isPaid)
          .map((indOrd, index) => (
            <Card
              className="order-cards"
              interactive={true}
              elevation={Elevation.TWO}
              onClick={this.openSingleOrder.bind(this, indOrd.orders_id)}
            >
              <div className="top">
                <div className="order-details">
                  <h3 className="order-number">Order #{indOrd.orders_id}</h3>
                  <p className="order-amount">Total Amount: ${indOrd.orderTotal}</p>
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
        {this.state.userOrders.orders.filter(each => each.isPaid === true).length >
          0 && (
            <div className="order-header-container">
              <h3 className="order-header">Paid</h3>
            </div>
          )}
        {this.state.userOrders.orders
          .filter(each => each.isPaid === true)
          .map((indOrd, index) => (
            <Card
              className="order-cards"
              interactive={true}
              elevation={Elevation.TWO}
            >
              <div className="top">
                <div className="order-details">
                  <h3 className="order-number">Order #{indOrd.orders_id}</h3>
                  <p className="order-amount">Total Amount: ${indOrd.orderTotal}</p>
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
