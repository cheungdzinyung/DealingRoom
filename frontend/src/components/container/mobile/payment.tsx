// import { FormGroup } from "@blueprintjs/core";
import * as React from "react";
// import ReactScriptLoaderMixin from 'react-script-loader';

// Component import
import Usermenu from "../../ui/mobile/usermenu";
import PageHeader from "src/components/ui/mobile/pageheader";

// Media asset import
// import Alipay from "../../assets/images/payment/alipay.png";
// import Paypal from "../../assets/images/payment/paypal.png";
import Stripe from "../../assets/images/payment/stripe.png";
// import Wechatpay from "../../assets/images/payment/wechatpay.png";

// import redux and friends
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
// import { removeFromCurrentOrder, confirmOrder } from "../../../redux/mobile/actions/actions_orders";

// for redir
import * as History from "history";
import { withRouter } from "react-router";
// import { redirectPage, resetTargetPage } from "../../../redux/mobile/actions/actions_user";

// Importing interfaces
// import { ICustomerOrderList } from "../../../modules";

interface IPurePaymentProps {
    paymentTargetId: number,
    totalAmount: number,

    history: History.History,

    // stripe
    // mixins: [ReactScriptLoaderMixin];
}

interface IPurePaymentState {
    cardNumber: string,
    expMonth: string,
    expYear: string,
    cvc: string,
    submitDisabled: boolean,
    stripeLoading: boolean,
    stripeLoadingError: boolean,
    paymentComplete: boolean,
    paymentError: any,
    token: string,
}

class PurePayment extends React.Component<IPurePaymentProps, IPurePaymentState> {
    constructor(props: IPurePaymentProps) {
        super(props);

        this.state = {
            cardNumber: "",
            expMonth: "",
            expYear: "",
            cvc: "",
            submitDisabled: false,
            stripeLoading: false,
            stripeLoadingError: false,
            paymentComplete: false,
            paymentError: null,
            token: "",
        }
    }

    public getScriptURL = () => {
        return 'https://js.stripe.com/v2/';
    }

    // public onScriptLoaded = () => {
    //     if (!this.state.token) {
    //       // Put your publishable key here
    //       Stripe.setPublishableKey('pk_test_xxxx');
    
    //       this.setState({ stripeLoading: false, stripeLoadingError: false });
    //     }
    //   }
    
    // public onScriptError = () => {
    //     this.setState({ stripeLoading: false, stripeLoadingError: true });
    //   }

    public onFormSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.setState({ submitDisabled: true, paymentError: null });
        // send form here
        // Stripe.createToken(e.target, (status: any, response: any) => {
        //     if (response.error) {
        //         this.setState({ paymentError: response.error.message, submitDisabled: false });
        //     }
        //     else {
        //         this.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
        //         // make request to your server here!
        //     }
        // });
    }


    public render() {
        if (this.state.stripeLoading) {
            return (
                <div>
                    <div>Loading</div>
                    <Usermenu />
                </div>
            )
        }
        else if (this.state.stripeLoadingError) {
            return (
                <div>
                    <div>Error</div>
                    <Usermenu />
                </div>
            );
        }
        else if (this.state.paymentComplete) {
            return (
                <div>
                    <div>Payment Complete!</div>
                    <Usermenu />
                </div>
            );
        }
        else {
            return (
                <div className="page-content-container">
                    <PageHeader header={`Order # ${this.props.paymentTargetId}`} subHeader={`Order Total $${this.props.totalAmount} `} />
                    <form className="user-info-form" onSubmit={this.onFormSubmit} >
                        <span>{this.state.paymentError}</span><br />
                        <input type='text' data-stripe='number' placeholder='credit card number' className="pt-large input-field" /><br />
                        <input type='text' data-stripe='exp-month' placeholder='expiration month' className="pt-large input-field" /><br />
                        <input type='text' data-stripe='exp-year' placeholder='expiration year' className="pt-large input-field" /><br />
                        <input type='text' data-stripe='cvc' placeholder='cvc' className="pt-large input-field" /><br />
                        <input disabled={this.state.submitDisabled} type='submit' value='Pay by :' className="conf-button" />
                    </form>
                    <br />
                    <img src={Stripe} alt="" className="payment-banner" />
                    <Usermenu />
                </div>
            );
        }
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        paymentTargetId: state.customer.payment.paymentTargetId,
        totalAmount: state.customer.payment.totalAmount,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        //   removeFromCurrentOrder: (thisItemID: number) => {
        //     dispatch(removeFromCurrentOrder(thisItemID));
        //   },
        //   confirmOrder: (orderToConfirm: ICurrentOrder) => {
        //     dispatch(confirmOrder(orderToConfirm));
        //   },
        //   redirectPage: (redirectTarget: string, history: any) => {
        //     dispatch(redirectPage(redirectTarget, history));
        //   },
        //   resetTargetPage: () => {
        //     dispatch(resetTargetPage());
        //   },
    }
}

const Payment = connect(mapStateToProps, mapDispatchToProps)(PurePayment);

export default withRouter(Payment as any);