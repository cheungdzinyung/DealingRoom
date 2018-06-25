// import { FormGroup } from "@blueprintjs/core";
import * as React from "react";
// import ReactScriptLoaderMixin from 'react-script-loader';

// Component import
import Usermenu from "../../ui/mobile/usermenu";
import PageHeader from "src/components/ui/mobile/pageheader";
import MySrtipeComponent from "./myStripeComponent";


// Media asset import
// import Alipay from "../../assets/images/payment/alipay.png";
// import Paypal from "../../assets/images/payment/paypal.png";
// import Stripe from "../../assets/images/payment/stripe.png";
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
}

interface IPurePaymentState {
    userName: string,
    orderId: number,
    amount: number,
}

class PurePayment extends React.Component<IPurePaymentProps, IPurePaymentState> {
    constructor(props: IPurePaymentProps) {
        super(props);

        this.state = {
            userName: "",
            orderId: 0,
            amount: 0,
        }
    }

    public fromDollarToCent = (amount: number) => (
        amount * 100
    )

    public onFormSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        // this.setState({ submitDisabled: true, paymentError: null });
    }

    public successPayment = (data: any) => {
        alert('Payment Successful');
    };

    public errorPayment = (data: any) => {
        alert('Payment Error');
    };

    public componentDidMount () {
        this.setState ({
            userName: "",
            orderId: this.props.paymentTargetId,
            amount: this.props.totalAmount,
        })
    }


    public render() {
        return (
            <div className="page-content-container">
                <PageHeader header={`Order # ${this.props.paymentTargetId}`} subHeader={`Order Total $${this.props.totalAmount} `} />
                <br />
                < MySrtipeComponent paymentInfo={this.state} />
                <Usermenu />
            </div>
        );
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        paymentTargetId: state.customer.payment.paymentTargetId,
        totalAmount: state.customer.payment.totalAmount,
        userName: state.customer.user.userProfile.displayName,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        //   removeFromCurrentOrder: (thisItemID: number) => {
        //     dispatch(removeFromCurrentOrder(thisItemID));
        //   },
    }
}


const Payment = connect(mapStateToProps, mapDispatchToProps)(PurePayment);

export default withRouter(Payment as any);