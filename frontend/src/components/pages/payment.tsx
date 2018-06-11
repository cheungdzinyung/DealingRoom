// Importing modules from library
import * as React from "react";

// Importing components
import Banner from "../share/topbanner";
import Usermenu from "../share/usermenu";

// Importing static assets
import headerImg from "../../icons/credit.svg";
import Alipay from "../../images/payment/alipay.png";
import Paypal from "../../images/payment/paypal.png";
import Stripe from "../../images/payment/stripe.png";
import Wechatpay from "../../images/payment/wechatpay.png";

interface IProfileProps {
  paymentMethods: string[];
}

export default class Profile extends React.Component<IProfileProps> {
  constructor(props: IProfileProps) {
    super(props);

    this.state = {};
  }
  public render() {
    return (
      <div className="page-content-container">
        <Banner header="Payment" image={headerImg} />
        <img src={Stripe} alt="" className="payment-banner" />
        <img src={Paypal} alt="" className="payment-banner" />
        <img src={Alipay} alt="" className="payment-banner" />
        <img src={Wechatpay} alt="" className="payment-banner" />
        <Usermenu />
      </div>
    );
  }
}
