// Importing modules
import { Card, Elevation } from "@blueprintjs/core";
import * as React from "react";

// Importing components
import OrderBanner from "../share/orderbanner";
import Usermenu from "../share/usermenu";

// Importing static assets
import checkIcon from "../../icons/check.svg";
import headerImg from "../../icons/orders.svg";

// Importing fake data
import { orderList } from "../fakedata";

interface IPureOrder {
  orderNumber: number;
  amount: number;
  orderTime: number;
  isPaid: boolean;
}

interface IPureOrdersProps {
  listOfOrder: IPureOrder[];
}

interface IPureOrdersStates {
  listOfOrder: IPureOrder[];
}

export default class Orders extends React.Component<
  IPureOrdersProps,
  IPureOrdersStates
> {
  constructor(props: IPureOrdersProps) {
    super(props);

    this.state = {
      listOfOrder: orderList.listOfOrder
    };
  }

  public render() {
    return (
      <div className="page-content-container">
        <OrderBanner displayName="Ivan" tableNumber={3} image={headerImg} />
        {/* Dynamic content, TODO: refactorize it */}
        {this.state.listOfOrder.filter(each => !each.isPaid).length > 0 && (
          <div className="order-header-container">
            <h3 className="order-header">To be paid</h3>
          </div>
        )}
        {this.state.listOfOrder
          .filter(each => !each.isPaid)
          .map((indOrd, index) => (
            <Card
              className="order-cards"
              interactive={true}
              elevation={Elevation.TWO}
            >
              <div className="top">
                <div className="order-details">
                  <h3 className="order-number">Order #{indOrd.orderNumber}</h3>
                  <p className="order-amount">Total Amount: ${indOrd.amount}</p>
                  <p className="order-time">
                    Ordering time: {indOrd.orderTime}
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
        {this.state.listOfOrder.filter(each => each.isPaid === true).length >
          0 && (
          <div className="order-header-container">
            <h3 className="order-header">Paid</h3>
          </div>
        )}
        {this.state.listOfOrder
          .filter(each => each.isPaid === true)
          .map((indOrd, index) => (
            <Card
              className="order-cards"
              interactive={true}
              elevation={Elevation.TWO}
            >
              <div className="top">
                <div className="order-details">
                  <h3 className="order-number">Order #{indOrd.orderNumber}</h3>
                  <p className="order-amount">Total Amount: ${indOrd.amount}</p>
                  <p className="order-time">
                    Ordering time: {indOrd.orderTime}
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
