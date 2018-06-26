// Importing modules
import * as React from "react";
import { match } from "react-router-dom";

// for redir
import * as History from "history";
import { withRouter } from "react-router";
import { redirectPage, resetTargetPage } from "../../../redux/mobile/actions/actions_user";
import {setPaymentTargetId } from "../../../redux/mobile/actions/actions_payment";
// Importing UI elements
import { Card, Elevation } from "@blueprintjs/core";

// Importing components
import Usermenu from "../../ui/mobile/usermenu";

// Importing static assets
import paymentTest from "../../assets/images/payment/stripe.png"

// Importing types
// import { IOrder } from "../../modules";

// import redux and friends
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import PageHeader from "src/components/ui/mobile/pageheader";

interface IOrderProps {
  match: match<{ orderId: number }>;
  ordersList: any;

  // handling redirect
  history: History.History,
  redirectPage: (redirectTarget: string, history: any) => void,
  resetTargetPage: () => void,

  // set target order id
  setPaymentTargetId: (paymentTargetId: number, totalAmount: number) => void,
}

interface IOrderState {
  displayName: string,
  orderID: number,
  tableNumber: number,
  thisOrder: any,
  amount: number,

  paymentMethod: string
  // order: IOrder
}

class PureOrder extends React.Component<IOrderProps, IOrderState> {
  constructor(props: IOrderProps) {
    super(props);

    this.state = {
      displayName: "",
      orderID: 0,
      tableNumber: 0,
      thisOrder: { orderItems: "empty" },
      amount: 0,

      paymentMethod: paymentTest,
    }
  }

  public componentDidMount() {

    const displayName = this.props.ordersList.displayName;
    const orderID = this.props.match.params.orderId;
    const thisOrder = (this.props.ordersList.orders.find((e: any) => {
      return (`${e.orders_id}` === `${orderID}`);
    }));

    if (thisOrder !== undefined) {
      const tableNumber = thisOrder.table;
      const amount = thisOrder.orderItems.reduce((accu: number, curr: any) => (accu + parseFloat(curr.purchasePrice)), 0);
      this.setState({
        displayName, orderID, tableNumber, thisOrder, amount
      });
    }
  }

  public toPaymentPage = () => {
    this.props.setPaymentTargetId(this.state.orderID, this.state.amount);
    this.props.redirectPage("/payment", this.props.history);
    this.props.resetTargetPage();
  }

  public render() {
    return (
      <div className="page-content-container">
        <PageHeader header={`Order ${this.state.orderID}`} subHeader="Your wish is our command" />
        {
          this.state.thisOrder.orderItems !== "empty" ?
            <div>
              {this.state.thisOrder.orderItems.map((line: any, i: number) => (
                <Card
                  key={`order_${i}`}
                  className="order-line"
                  interactive={true}
                  elevation={Elevation.TWO}
                >
                  <span className="order-item">{line.itemName}</span>
                </Card>
              ))}
              <img className="payment-method" src={this.state.paymentMethod} alt="" />
              <Card className="order-summary" elevation={Elevation.TWO}>
                <button className="payment-button" onClick={this.toPaymentPage}>
                  <span className="payment-header">Pay Now</span>
                  <span className="payment-amount">HK&#36; {this.state.amount}</span>
                </button>
              </Card>
            </div> : <div />
        }
        <Usermenu />
      </div>
    );
  }
}


const mapStateToProps = (state: IRootState) => {
  return {
    ordersList: state.customer.orders.ordersList,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setPaymentTargetId: (paymentTargetId: number, totalAmount: number) => {
      dispatch(setPaymentTargetId(paymentTargetId, totalAmount));
    },
    redirectPage: (redirectTarget: string, history: any) => {
      dispatch(redirectPage(redirectTarget, history));
    },
    resetTargetPage: () => {
      dispatch(resetTargetPage());
    },
  }
}

  const Order = connect(mapStateToProps, mapDispatchToProps)(PureOrder);

  export default withRouter(Order as any);