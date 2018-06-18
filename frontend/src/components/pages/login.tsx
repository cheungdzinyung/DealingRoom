// Importing modules from library
import * as History from "history";
import * as React from "react";

// Importing UI elements
import { Card } from "@blueprintjs/core";

// Importing static assets
import facebook from "../icons/signup/facebook.svg";
import google from "../icons/signup/google.svg";
import logo from "../icons/all/logo.svg";

interface ILoginProps {
  history: History.History;
}

export default class Login extends React.Component<ILoginProps> {
  constructor(props: ILoginProps) {
    super(props);
  }

  public toProfile = () => {
    this.props.history.push("/menu");
  };

  public render() {
    return (
      <div className="login-container">
        <div className="login-top">
          <div className="logo-container">
            <img src={logo} alt="Dealing Room Logo" className="logo" />
            <span className="logo-name">Dealing Room</span>
          </div>
          <div className="social-login">
            <div className="banner rd-corner google">
              <img className="banner-img" src={google} alt="" />
            </div>
            <div className="banner rd-corner facebook ">
              <img className="banner-img" src={facebook} alt="" />
            </div>
          </div>
          <div className="divider">
            <hr className="divider-break" />
            <span className="divider-text">OR</span>
            <hr className="divider-break" />
          </div>
        </div>
        <div className="login-bottom">
          <Card className="login-card rd-corner">
            <div className="status-switch">
              <div className="status">
                <span className="status-text">LOGIN</span>
              </div>
              <div className="status">
                <span className="status-text">SIGNUP</span>
              </div>
            </div>
            <form className="form" action="">
              <input
                className="form-input rd-corner"
                name="username"
                type="text"
                placeholder="Username"
              />
              <input
                className="form-input rd-corner"
                placeholder="Passwords"
                name="username"
                type="password"
              />
            </form>

            <div className="login-button ">
              <button className="submit rd-corner">
                <span className="submit-text">LOGIN</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
