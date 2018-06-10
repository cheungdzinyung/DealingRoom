// Importing modules from library
import * as History from "history";
import * as React from "react";
import { withRouter } from "react-router";

// Importing static assets
import creditCard from "../../icons/credit.svg";
import menu from "../../icons/menu.svg";
import receipt from "../../icons/orders.svg";
import wrench from "../../icons/setting.svg";
import icon from "../../images/profiles/circle-head.png";

interface IPureUserMenuProps {
  history: History.History;
}

interface IPureUserMenuState {
  unpaidOrders: number;
}

class PureUsermenu extends React.Component<
  IPureUserMenuProps,
  IPureUserMenuState
> {
  constructor(props: IPureUserMenuProps) {
    super(props);

    this.state = {
      unpaidOrders: 2
    };
  }

  public toProfile = () => {
    this.props.history.push(`/profile`);
  };
  public toOrder = () => {
    this.props.history.push(`/order`);
  };
  public toPayment = () => {
    this.props.history.push(`/payment`);
  };
  public toSetting = () => {
    this.props.history.push(`/setting`);
  };
  public toMenu = () => {
    this.props.history.push(`/menu`);
  };

  public render() {
    return (
      <div className="user-menu">
        <div className="menu-item" onClick={this.toProfile}>
          <img className="user-icon" src={icon} alt="" />
          <small className="menu-name">Profile</small>
        </div>
        <div className="menu-item" onClick={this.toOrder}>
          <div className="count">
            <span className="count-digit">{this.state.unpaidOrders}</span>
          </div>
          <img className="user-menu-icon" src={receipt} alt="receipt icon" />
          <small className="menu-name">Orders</small>
        </div>
        <div className="menu-item">
          <img className="user-menu-icon" src={menu} alt="menu icon" onClick={this.toMenu} />
          <small className="menu-name">Menu</small>
        </div>
        <div className="menu-item" onClick={this.toPayment}>
          <img className="user-menu-icon" src={creditCard} alt="credit card icon" />
          <small className="menu-name">Payment</small>
        </div>
        <div className="menu-item" onClick={this.toSetting}>
          <img className="user-menu-icon" src={wrench} alt="wrench icon" />
          <small className="menu-name">Setting</small>
        </div>
      </div>
    );
  }
}

export default withRouter(PureUsermenu as any);
