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

// import redux and friends
import { connect } from "react-redux";
import { IRootState } from "../reducers/index";
import { changePage } from "../actions/actions_user";

interface IUserMenuProps {
  history: History.History,
  unpaidOrders: number,
  changePage: (targetPage: string) => void,
}

class PureUsermenu extends React.Component<IUserMenuProps, {}> {
  constructor(props: IUserMenuProps) {
    super(props);
  }

  public toProfile = () => {
    this.props.changePage(`/profile`);
    this.props.history.push(`/profile`);
  };
  public toOrder = () => {
    this.props.changePage(`/order`);
    this.props.history.push(`/order`);
  };
  public toPayment = () => {
    this.props.changePage(`/payment`);
    this.props.history.push(`/payment`);
  };
  public toSetting = () => {
    this.props.changePage(`/setting`);
    this.props.history.push(`/setting`);
  };
  public toMenu = () => {
    this.props.changePage(`/menu`);
    this.props.history.push(`/menu`);
  };
  public toRequest = () => {
    this.props.changePage(`/request`);
    this.props.history.push(`/request`);
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
            <span className="count-digit">{this.props.unpaidOrders}</span>
          </div>
          <img className="user-menu-icon" src={receipt} alt="receipt icon" />
          <small className="menu-name">Orders</small>
        </div>
        <div className="menu-item">
          <img className="user-menu-icon" src={menu} alt="menu icon" onClick={this.toMenu} />
          <small className="menu-name">Menu</small>
        </div>
        <div className="menu-item">
          <img className="user-menu-icon" src={menu} alt="menu icon" onClick={this.toRequest} />
          <small className="menu-name">Request</small>
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

const mapStateToProps = (state: IRootState) => {
  return {
    unpaidOrders: state.orders.unpaidOrders,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changePage: (targetPage: string) => {
      dispatch(changePage(targetPage));
    },
  }
}

const Usermenu = connect(mapStateToProps, mapDispatchToProps)(PureUsermenu);

export default withRouter(Usermenu as any);
