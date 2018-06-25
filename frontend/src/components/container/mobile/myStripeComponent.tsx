import * as React from "react";

// Media asset import
import Stripe from "../../assets/images/payment/stripe.png";

// Importing interfaces
// import { ICustomerOrderList } from "../../../modules";

import StripeCheckout from 'react-stripe-checkout';

import { STRIPE_PUBLISHABLE } from "../../../redux/store";
// const PAYMENT_SERVER_URL = API_SERVER;


interface IPurePaymentProps {
    paymentInfo: {
        userName: string,
        orderId: number,
        amount: number,
    }
}

const CURRENCY = 'HKD';

export default class MySrtipeComponent extends React.Component<IPurePaymentProps, {}> {
    constructor(props: IPurePaymentProps) {
        super(props);
    }

    public fromDollarToCent = (amount: number) => (
        amount * 100
    )

    public onTokenReceive = (amount: number, description: any) => (token: any) => {

        // axios.post(PAYMENT_SERVER_URL,
        //     {
        //         description,
        //         source: token.id,
        //         currency: CURRENCY,
        //         amount: this.fromDollarToCent(this.props.paymentInfo.amount),
        //     })
        //     .then(this.successPayment)
        //     .catch(this.errorPayment);
    }

    public render() {
        return (
            <StripeCheckout
                name          ={this.props.paymentInfo.userName}
                description   ={`Dealingroom.live order#${this.props.paymentInfo.orderId}`}
                currency      ={CURRENCY}
                amount        ={this.fromDollarToCent(this.props.paymentInfo.amount)}
                token         ={this.onTokenReceive(this.props.paymentInfo.amount, `Dealingroom.live orderID: ${this.props.paymentInfo.orderId}`)}
                stripeKey     ={STRIPE_PUBLISHABLE || ""}>
                <img src={Stripe} alt="" className="payment-banner" />
            </StripeCheckout>
        );
    }
}


