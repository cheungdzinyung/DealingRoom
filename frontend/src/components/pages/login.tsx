// Importing modules from library
import * as History from "history";
import * as React from "react";

// Importing static assets
import facebook from "../icons/facebookSignup.svg";
import google from "../icons/googleSignup.svg";
import Key from "../icons/key.svg";

interface ILoginProps {
  history: History.History;
}

export default class Login extends React.Component<ILoginProps> {
  constructor(props: ILoginProps) {
    super(props);
  }

  public toProfile = () => {
    this.props.history.push("/initialize");
  };

  public render() {
    return (
      <div className="login-container">
        <div className="login-grid">
          <input
            type="text"
            placeholder="Username"
            className="pt-large username"
          />

          <input
            type="password"
            placeholder="Password"
            className="pt-large password"
          />

          <button
            type="submit"
            className="login-button-hp"
            onClick={this.toProfile}
          >
            <img src={Key} alt="" />
          </button>
          <div className="social-login">
            <button className="social-button google">
              <img className="social-img" src={google} alt="" />
            </button>
            <button className="social-button facebook">
              <img className="social-img" src={facebook} alt="" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
