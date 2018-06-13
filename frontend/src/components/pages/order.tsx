// Importing modules
import * as History from "history";
import * as React from "react";
import { match } from "react-router-dom";

// Importing UI elements
import { Card, Elevation } from "@blueprintjs/core";

// Importing components
import OrderBanner from "../share/orderbanner";
import Usermenu from "../share/usermenu";

// Importing static assets
// import checkIcon from "../../icons/check.svg";
import headerImg from "../../icons/orders.svg";
import paymentTest from "../../images/payment/stripe.png"

// Importing types
import { IPureOrder } from "../../modules";

// Importing fake data
import { singleOrder } from "../../fakedata";

interface IPureOrderProps {
  history: History.History;
  match: match<{ orderId: number }>;
}

interface IPureOrdersStates {
  order: IPureOrder;
}

export default class Order extends React.Component<
  IPureOrderProps,
  IPureOrdersStates
> {
  constructor(props: IPureOrderProps) {
    super(props);

    this.state = {
      order: singleOrder
    };
  }
  public render() {
    return (
      <div className="page-content-container">
        <OrderBanner
          displayName={this.state.order.displayName}
          tableNumber={this.state.order.table}
          image={headerImg}
          status="Order"
          statusNumber={this.props.match.params.orderId}
        />

        {this.state.order.orderItems.map((line, i) => (
          <Card
            key={i}
            className="order-line"
            interactive={true}
            elevation={Elevation.TWO}
          >
            <span className="order-item">{line.itemName}</span>
          </Card>
        ))}
        <Card className="order-summary" elevation={Elevation.TWO}>
          <img className="payment-method" src={paymentTest} alt="" />
          <button className="payment-button">
            <span className="payment-header">Pay Now</span>
            <span className="payment-amount">&#36;360</span>
          </button>
        </Card>

        <Usermenu />
      </div>
    );
  }
}
