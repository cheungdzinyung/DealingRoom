import { FormGroup } from "@blueprintjs/core";
import * as React from "react";

// Component import
import Usermenu from "../../ui/mobile/usermenu";

// Media asset import
import Alipay from "../../assets/images/payment/alipay.png";
import Paypal from "../../assets/images/payment/paypal.png";
import Stripe from "../../assets/images/payment/stripe.png";
import Wechatpay from "../../assets/images/payment/wechatpay.png";
import PageHeader from "src/components/ui/mobile/pageheader";

export default class Setting extends React.Component {
  constructor(props: {}) {
    super(props);
  }
  public render() {
    return (
      <div className="page-content-container">
        <PageHeader header="Setting" subHeader="Column A, or try column B"/>
        <FormGroup
          className="user-info-form"
          labelFor="login"
        >
          <input
            placeholder="Display Name"
            type="text"
            className="pt-large input-field"
            dir="auto"
          />
          <input
            placeholder="Email"
            type="text"
            className="pt-large input-field"
          />
          <input
            placeholder="Password"
            type="password"
            className="pt-large input-field"
          />
          <input
            placeholder="Confirm Password"
            type="password"
            className="pt-large input-field"
          />
        </FormGroup>
        <img src={Stripe} alt="" className="payment-banner" />
        <img src={Paypal} alt="" className="payment-banner" />
        <img src={Alipay} alt="" className="payment-banner" />
        <img src={Wechatpay} alt="" className="payment-banner" />
        <button className="conf-button" type="submit">
          <span>Confirm</span>
        </button>
        <Usermenu />
      </div>
    );
  }
}
