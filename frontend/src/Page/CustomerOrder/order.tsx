// Importing modules
import * as React from "react";
import { match } from "react-router-dom";

// for redir
import * as History from "history";
import { withRouter } from "react-router";
import { redirectPage, resetTargetPage } from "../../../redux/mobile/actions/actions_user";
import { setPaymentTargetId } from "../../../redux/mobile/actions/actions_payment";
// Importing UI elements
import { Card, Elevation } from "@blueprintjs/core";
import { AppToaster } from "src/Components/ui/mobile/toast";
import { Intent } from "@blueprintjs/core";

// Importing components
import Usermenu from "../../ui/mobile/usermenu";

// Importing static assets
import paymentTest from "../../assets/images/payment/stripe.png"

// Importing types
// import { IOrder } from "../../modules";

// import redux and friends
import { connect } from "react-redux";
import { IRootState } from "src/redux/store";
import PageHeader from "src/Components/ui/mobile/pageheader";
import MySrtipeComponent from "../../ui/mobile/myStripeComponent";

interface IOrderProps {
  match: match<{ orderId: number }>;
  ordersList: any;
  userName: string;     // === displayname

  // handling redirect
  history: History.History,
  redirectPage: (redirectTarget: string, history: any) => void,
  resetTargetPage: () => void,

  // set target order id
  setPaymentTargetId: (paymentTargetId: number, totalAmount: number) => void,
}

interface IOrderState {
  tableNumber: number,
  thisOrder: any,
  paymentMethod: string,

  /* vvv needed for stripe */
  userName: string,
  orderId: number,
  amount: number,
}

class PureOrder extends React.Component<IOrderProps, IOrderState> {
  constructor(props: IOrderProps) {
    super(props);

    this.state = {
      tableNumber: 0,
      thisOrder: { orderItems: "empty" },
      paymentMethod: paymentTest,

      userName: "",   // as in display name
      orderId: 0,
      amount: 0,
    }
  }

  public componentDidMount() {
    // make sure selected order exist in array
    const userName = this.props.ordersList.displayName;
    const orderId = this.props.match.params.orderId;
    const thisOrder = (this.props.ordersList.orders.find((e: any) => {
      return (`${e.orders_id}` === `${orderId}`);
    }));
    // setState for Card to render
    if (thisOrder !== undefined) {
      const tableNumber = thisOrder.table;
      const amount = thisOrder.orderItems.reduce((accu: number, curr: any) => (accu + parseFloat(curr.purchasePrice)), 0).toFixed(2);
      this.setState({
        userName, orderId, tableNumber, thisOrder, amount
      });
    } else {
      // either err or F5
      // alert("opps, sth wrong, redirecting to order history page");
      AppToaster.show({
        message: "opps, sth wrong, redirecting to order history page",
        intent: Intent.WARNING,
        icon: "cross",
        timeout: 2000
    });
      this.props.history.push("/customer/order");
    }

  }

  public render() {
    return (
      <div className="page-content-container">
        <PageHeader header={`Order #${this.state.orderId}`} subHeader="Your wish is our command" />
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

              <Card className="order-summary" elevation={Elevation.TWO}>

                <button className="payment-button rd-corner">
                  <span className="payment-header rd-corner">Click To Choose Your Prefered Payment Method</span>
                  <span className="payment-amount">HK&#36; {this.state.amount}</span>
                </button>

                <div className="payment-method rd-corner">
                  <MySrtipeComponent
                    paymentInfo={{
                      userName: this.props.userName,
                      orderId: this.props.match.params.orderId,
                      amount: this.state.amount
                    }}
                    history={this.props.history}
                  />
                </div>
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

    paymentTargetId: state.customer.payment.paymentTargetId,
    totalAmount: state.customer.payment.totalAmount,
    userName: state.customer.user.userProfile.displayName,
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