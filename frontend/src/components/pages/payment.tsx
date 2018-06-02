import * as React from "react";
import Banner from "../share/topbanner";
import Usermenu from "../share/usermenu";

import Alipay from "../../images/payment/alipay.png";
import Paypal from "../../images/payment/paypal.png";
import Stripe from "../../images/payment/stripe.png";
import Wechatpay from "../../images/payment/wechatpay.png";

interface IProfileProps {
  paymentMethods: string[];
}

import headerImg from "../../icons/credit.svg";

export default class Profile extends React.Component<IProfileProps> {
  constructor(props: IProfileProps) {
    super(props);

    this.state = {};
  }
  public render() {
    return (
      <div className="userInterface">
        <Banner header="Payment" image={headerImg} />
        <img src={Stripe} alt="" className="payment" />
        <img src={Paypal} alt="" className="payment" />
        <img src={Alipay} alt="" className="payment" />
        <img src={Wechatpay} alt="" className="payment" />
        <Usermenu />
      </div>
    );
  }
}
