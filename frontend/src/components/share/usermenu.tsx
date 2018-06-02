import * as React from "react";
import creditCard from "../../icons/credit.svg";
import menu from '../../icons/menu.svg';
import receipt from '../../icons/orders.svg';
import screwDriver from '../../icons/setting.svg';
import icon from '../../images/circle-head.png';

import { withRouter } from "react-router";


import * as History from 'history';
class PureUsermenu extends React.Component<{ history: History.History }> {



  public toProfile = () => { this.props.history.push(`/profile`); }
  public toOrder = () => { this.props.history.push(`/order`); }
  public toPayment = () => { this.props.history.push(`/payment`); }
  public toSetting = () => { this.props.history.push(`/setting`); }



  public render() {
    return (
      <div className="bot-menu">
        <div className="menu-item" onClick={this.toProfile}>
          <img className="user-icon" src={icon} alt="" />
          <span>Profile</span>
        </div>
        <div className="menu-item" onClick={this.toOrder}>
          <img src={receipt} alt="" />
          <span>Orders</span>
        </div>
        <div className="menu-item">
          <img src={menu} alt="" />
        </div>
        <div className="menu-item" onClick={this.toPayment}>
          <img src={creditCard} alt="" />
          <span>Payment</span>
        </div>
        <div className="menu-item" onClick={this.toSetting}>
          <img src={screwDriver} alt="" />
          <span>Setting</span>
        </div>
      </div>

    );
  }
}

export default withRouter(PureUsermenu as any);