import * as React from "react";
import creditCard from "../icons/credit.svg";
import menu from '../icons/menu.svg';
import receipt from '../icons/orders.svg';
import screwDriver from '../icons/setting.svg';
import icon from '../images/circle-head.png'

export default class Usermenu extends React.Component {
  public render() {
    return (
      <div className="bot-menu">
        <div className="menu-item">
          <img className="user-icon"src={icon} alt="" />
          <span>Profile</span>
        </div>
        <div className="menu-item">
          <img src={receipt} alt="" />
          <span>Orders</span>
        </div>
        <div className="menu-item">
          <img src={menu} alt="" />
        </div>
        <div className="menu-item">
          <img src={creditCard} alt="" />
          <span>Payment</span>
        </div>
        <div className="menu-item">
          <img src={screwDriver} alt="" />
          <span>Setting</span>
        </div>
      </div>
    );
  }
}
