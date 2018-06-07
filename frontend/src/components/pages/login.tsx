import * as History from "history";
import * as React from "react";

import facebook from "../../icons/facebookSignup.svg";
import google from "../../icons/googleSignup.svg";
import Key from "../../icons/key.svg";

export default class Login extends React.Component<{
  history: History.History;
}> {
  public google = <span>Google</span>;
  public facebook = <span>Facebook</span>;
  public submit = <span>S</span>;

  public toProfile = () => {
    this.props.history.push("/profile");
  };

  public render() {
    return (
      <div className="login-container">
        <div className="login-grid">

          <input type="text" placeholder="Username" className="pt-large username" />

          <input type="password" placeholder="Password" className="pt-large password" />

          <button type="submit" className="login-button-hp" onClick={this.toProfile}>
            <img src={Key} alt="" />
          </button>
          <div className="social-login">
            <button className="social-button google">
              <img src={google} alt="" />
            </button>
            <button className="social-button facebook">
              <img src={facebook} alt="" />
            </button>

          </div>
        </div>
      </div>
    );
  }
}
