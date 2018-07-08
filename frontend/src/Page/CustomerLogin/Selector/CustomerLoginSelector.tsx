// Importing modules from library
import * as React from "react";
// Importing styling and static assets
import "./CustomerLoginSelector.scss";

// States and Props
interface ICustomerLoginSelectorProps {
  localLoginType: string;
  chooseLogin: () => void;
  chooseSignup: () => void;
}

// Component
export default class CustomerLoginSelector extends React.Component<
  ICustomerLoginSelectorProps
> {
  constructor(props: ICustomerLoginSelectorProps) {
    super(props);
  }

  public render() {
    return (
      <div className="status-switch">
        <div
          className={
            this.props.localLoginType === "login" ? "status-chosen" : "status"
          }
          onClick={this.props.chooseLogin}
        >
          <span className="status-text">LOGIN</span>
        </div>
        <div
          className={
            this.props.localLoginType === "login" ? "status" : "status-chosen"
          }
          onClick={this.props.chooseSignup}
        >
          <span className="status-text">SIGNUP</span>
        </div>
      </div>
    );
  }
}
