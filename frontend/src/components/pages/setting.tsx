import { FormGroup } from "@blueprintjs/core";
import * as React from "react";

// Component import
import Banner from "../share/topbanner";
import Usermenu from "../share/usermenu";

// Media asset import
import headerImg from "../icons/setting.svg";
import Alipay from "../images/payment/alipay.png";
import Paypal from "../images/payment/paypal.png";
import Stripe from "../images/payment/stripe.png";
import Wechatpay from "../images/payment/wechatpay.png";
import profilePic from "../images/profiles/circle-head.png";

export default class Setting extends React.Component {
  constructor(props: {}) {
    super(props);
  }
  public render() {
    return (
      <div className="page-content-container">
        <Banner header="Setting" image={headerImg} />
        <img className="setting-img" src={profilePic} alt="" />
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
