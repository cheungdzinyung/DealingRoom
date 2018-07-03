import * as React from "react";

// Media asset import
import Stripe from "../../assets/images/payment/stripe.png";

// Importing interfaces
import { OrderStatus } from "../../../modules";

import StripeCheckout from 'react-stripe-checkout';

import { STRIPE_PUBLISHABLE } from "src/redux/store";

// import redux and friends
import { connect } from "react-redux";
import { IRootState } from "src/redux/store";
import { payWithStripe, resetPaymentResult } from "../../../redux/mobile/actions/actions_payment";

// for redir
import * as History from "history";

interface IPaymentInfo {
    userName: string,
    orderId: number,
    amount: number,
}

interface IPaymentResult {
    order_id: number,
    status: OrderStatus,
    isPaid: boolean,
}

interface IPurePaymentProps {
    // handle payment
    paymentInfo: IPaymentInfo,
    
    paymentResult: IPaymentResult,
    payWithStripe: (orderId: number, token?: any) => void,
    // handling redirect
    history: History.History,
    resetPaymentResult: () => void,
}

const CURRENCY = 'HKD';

class PureMySrtipeComponent extends React.Component<IPurePaymentProps, {}> {
    constructor(props: IPurePaymentProps) {
        super(props);
    }

    public fromDollarToCent = (amount: number) => (
        amount * 100
    )

    public onTokenReceive = (amount: number, description: any) => (token: any) => {
        // localStorage.setItem("dealingRoomStripeToken", token.id);
        this.props.payWithStripe(this.props.paymentInfo.orderId, token.id);
    }

    public componentDidUpdate() {
        if (this.props.paymentResult.isPaid) {
            // alert("Payment successful :)");
            this.props.history.push(`/customer/order`);
            this.props.resetPaymentResult();
        }
    }

    public render() {
        return (
            <StripeCheckout
                name={this.props.paymentInfo.userName}
                description={`Dealingroom.live order#${this.props.paymentInfo.orderId}`}
                currency={CURRENCY}
                amount={this.fromDollarToCent(this.props.paymentInfo.amount)}
                token={this.onTokenReceive(this.props.paymentInfo.amount, `Dealingroom.live orderID: ${this.props.paymentInfo.orderId}`)}
                stripeKey={STRIPE_PUBLISHABLE || ""}>
                <img src={Stripe} alt="" className="payment-banner" />
            </StripeCheckout>
        );
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        paymentResult: state.customer.payment.paymentResult,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        payWithStripe: (orderId: number, token?: any) => {
            dispatch(payWithStripe(orderId, token));
        },
        resetPaymentResult: () => {
            dispatch(resetPaymentResult());
        },
    }
}

const MySrtipeComponent = connect(mapStateToProps, mapDispatchToProps)(PureMySrtipeComponent);

export default MySrtipeComponent;