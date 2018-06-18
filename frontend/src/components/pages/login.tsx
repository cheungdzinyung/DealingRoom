// Importing modules from library
import * as History from "history";
import * as React from "react";

// Importing UI elements
import { Card } from '@blueprintjs/core'

// Importing static assets
import facebook from "../icons/facebookSignup.svg";
import google from "../icons/googleSignup.svg";


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
          <div className="social-login">
            <div className="google">
              <img src={google} alt="" />
            </div>
            <div className="facebook">
              <img src={facebook} alt="" />
            </div>
          </div>
        </div>
        <div className="login-bottom">
          <Card className="login-card rd-corner">
            <div className="status-switch">
              <div className="status">
                <span className="status-text">
                  LOGIN</span>
              </div>
              <div className="status">
                <span className="status-text">SIGNUP</span>
              </div>
            </div>
            <form className="form" action="">
              <input className='form-input rd-corner' name="username" type="text" placeholder="Username" />
              <input className='form-input rd-corner' placeholder="Passwords" name="username" type="text" />
            </form>

            <div className="login-button "><button className="submit rd-corner">
              <span className="submit-text">LOGIN</span>
            </button>
            </div>

          </Card>
        </div>
      </div>
    );
  }
}
