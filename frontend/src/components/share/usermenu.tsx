// Importing modules from library
import * as History from "history";
import * as React from "react";
import { withRouter } from "react-router";

// Importing static assets
import creditCard from "../../icons/credit-card-bare.svg";
import menu from "../../icons/menu-bare.svg";
import receipt from "../../icons/orders-bare.svg";
import wrench from "../../icons/setting-bare.svg";
import icon from "../../images/profiles/judith-test.png";

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
  public toRequest = () => {
    this.props.history.push(`/request`);
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
          {/* <small className="menu-name">Profile</small> */}
        </div>
        <div className="menu-item" onClick={this.toOrder}>
          <div className="count">
            <span className="count-digit">{this.state.unpaidOrders}</span>
          </div>
          <img className="user-menu-icon" src={receipt} alt="receipt icon" />
          {/* <small className="menu-name">Orders</small> */}
        </div>
        <div className="menu-item">
          <img className="user-menu-icon" src={menu} alt="menu icon" onClick={this.toMenu} />
          {/* <small className="menu-name">Menu</small> */}
        </div>
        <div className="menu-item" onClick={this.toRequest}>
          <img className="user-menu-icon" src={creditCard} alt="credit card icon" />
          {/* <small className="menu-name">Request</small> */}
        </div>
        <div className="menu-item" onClick={this.toSetting}>
          <img className="user-menu-icon" src={wrench} alt="wrench icon" />
          {/* <small className="menu-name">Setting</small> */}
        </div>
      </div>
    );
  }
}

export default withRouter(PureUsermenu as any);
