import * as React from "react";
import creditCard from "../icons/credit-card.svg";

export default class Profile extends React.Component {
  public render() {
    return (
      <div className="userInterface">
        <div className="top-content">
          <h1>Hi</h1>
        </div>
        <div className="bot-menu">
          <div className="menu-item">
            <img src={creditCard} alt="" />
            <p>Profile</p>
          </div>
          <div className="menu-item">
            <img src={creditCard} alt="" />
            <p>Orders</p>
          </div>
          <div className="menu-item">
            <img src={creditCard} alt="" />
          </div>
          <div className="menu-item">
            <img src={creditCard} alt="" />
            <p>Payment</p>
          </div>
          <div className="menu-item">
            <img src={creditCard} alt="" />
            <p>Setting</p>
          </div>
        </div>
      </div>
    );
  }
}
