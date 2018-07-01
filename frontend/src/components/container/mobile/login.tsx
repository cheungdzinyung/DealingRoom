// Importing modules from library
import * as History from "history";
import * as React from "react";

// Importing UI elements
import { Card } from "@blueprintjs/core";

// Importing static assets
import facebook from "src/components/assets/icons/signup/facebook.svg";
import google from "src/components//assets/icons/signup/google.svg";
import logo from "src/components/assets/icons/all/logo.svg";



// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { localLogin, localSignUp, loginFacebook } from "../../../redux/mobile/actions/actions_user";

import ReactFacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { match } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom";

interface ILoginState {
  username: string,
  password: string,
  localLoginType: "login" | "signUp",
}

interface ILoginProps {
  history: History.History,
  match: match<{url: string}>;
  isAuth: boolean,
  // user_id: number,
  localLogin: (username: string, password: string) => void,
  localSignUp: (username: string, password: string) => void,

  loginFacebook: (token: string) => void,
}

class PureLogin extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      username: "",
      password: "",
      localLoginType: "login",
    }
  }

  public username = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.target.value });
  }

  public password = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  }

  public toLocalLogin = () => {
    this.props.localLogin(this.state.username, this.state.password);
  };

  public toLocalSignUp = () => {
    this.props.localSignUp(this.state.username, this.state.password);
  }

  public chooseLogin = () => {
    this.setState({
      localLoginType: "login"
    })
  }

  public chooseSignUp = () => {
    this.setState({
      localLoginType: "signUp"
    })
  }

  public FBLogin = () => {
    return null;
  }

  public responseFromFB = (userInfo: ReactFacebookLoginInfo & { accessToken: string }) => {
    if (userInfo.accessToken) {
      alert(userInfo.accessToken)
      this.props.loginFacebook(userInfo.accessToken);
    }
    return null;
  }

  public responseGoogle = (response: any) => {
    // alert(response);
  }

  public componentDidUpdate() {
    // actually shld check if token is valid
    if (localStorage.getItem("dealingRoomToken")) {
      this.props.history.push(`${this.props.match.url}initialize`);
    }
  }

  public componentDidMount() {
    // actually shld check if token is valid
    if (localStorage.getItem("dealingRoomToken")) {
      this.props.history.push(`${this.props.match.url}initialize`);
    }
  }

  public render() {
    return (
      <div className="login-container">
        <div className="login-top">
          <div className="logo-container">
            <img src={logo} alt="Dealing Room Logo" className="logo" />
            <span className="logo-name">Dealing Room</span>
          </div>
          <div className="social-login">

              <ReactFacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
                autoLoad={false}
                fields="name,email,picture"
                onClick={this.FBLogin}
                callback={this.responseFromFB}
                textButton=""
                icon={<img className="banner-img-fb" src={facebook} alt="" />}
              />

              <span className="banner rd-corner">
                <GoogleLogin
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                  buttonText=""
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  className="kep-login-facebook metro google-white"
                  children={<img className="banner-img-google" src={google} alt="" />}
                />
              </span>


          </div>
          <div className="divider">
            <hr className="divider-break" />
            <span className="divider-text">OR</span>
            <hr className="divider-break" />
          </div>
        </div>
        <div className="login-bottom">
          <Card className="login-card rd-corner">

            {/* <div className="status-switch"> */}
            {
              (this.state.localLoginType === "login") ?
                <div className="status-switch">
                  <div className="status-chosen" onClick={this.chooseLogin}>
                    <span className="status-text">LOGIN</span>
                  </div>
                  <div className="status" onClick={this.chooseSignUp}>
                    <span className="status-text">SIGNUP</span>
                  </div>
                </div> :
                <div className="status-switch">
                  <div className="status" onClick={this.chooseLogin}>
                    <span className="status-text">LOGIN</span>
                  </div>
                  <div className="status-chosen" onClick={this.chooseSignUp}>
                    <span className="status-text">SIGNUP</span>
                  </div>
                </div>
            }
            {/* </div> */}

            <form className="form" action="">
              <input
                className="form-input rd-corner"
                name="username"
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={this.username}
              />
              <input
                className="form-input rd-corner"
                placeholder="Passwords"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.password}
              />
            </form>

            {
              (this.state.localLoginType === "login") ?
                <div className="login-button ">
                  <button className="submit rd-corner" onClick={this.toLocalLogin}>
                    <span className="submit-text">LOGIN</span>
                  </button>
                </div>
                :
                <div className="login-button ">
                  <button className="submit rd-corner" onClick={this.toLocalSignUp}>
                    <span className="submit-text">SIGN UP</span>
                  </button>
                </div>
            }

          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    isAuth: state.customer.user.isAuth,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    localLogin: (username: string, password: string) => {
      dispatch(localLogin(username, password));
    },
    localSignUp: (username: string, password: string) => {
      dispatch(localSignUp(username, password));
    },
    loginFacebook: (token: string) => {
      dispatch(loginFacebook(token));
    }
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(PureLogin);

export default Login