// Importing modules from library
import * as History from "history";
import * as React from "react";

// Importing UI elements
import { Card } from "@blueprintjs/core";

// Importing static assets
import facebook from "../../assets/icons/signup/facebook.svg";
import google from "../../assets/icons/signup/google.svg";
import logo from "../../assets/icons/all/logo.svg";

// redux
// import { connect } from "react-redux";

import ReactFacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { localLogin } from "../../../redux/mobile/actions/actions_user";

interface ILoginState {
  username: string,
  password: string,
  localLoginType: "login" | "signUp",
}

interface ILoginProps {
  history: History.History,
  // isAuth: boolean,
  user_id: number,
  localLogin: (username: string, password: string) => void,
  localSignUp: (username: string, password: string) => void,

  loginFacebook: (token: string) => void,
}

class PureAdminLogin extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      username: "Andrew",
      password: "123456",
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
  };

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
    // actually should check if token is valid
    if (localStorage.getItem("dealingRoomToken")) {
      this.props.history.push("/admin/initializeStaff");
    }
  }

  public componentDidMount() {
    // actually should check if token is valid
    if (localStorage.getItem("dealingRoomToken")) {
      this.props.history.push("/admin/initializeStaff");
    }
  }

  public render() {
    return (
      <div className="desktop-container-wrapper">
        <div className="desktop-login-container">
          <div className="desktop-login-top">
            <div className="desktop-logo-container">
              <img src={logo} alt="Dealing Room Logo" className="logo" />
              <span className="logo-name">Dealing Room</span>
            </div>
            <div className="desktop-social-login">

              <ReactFacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
                autoLoad={false}
                fields="name,email,picture"
                onClick={this.FBLogin}
                callback={this.responseFromFB}
                textButton=""
                icon={<img className="banner-img-fb" src={facebook} alt="" />}
              />

              <span className="desktop-banner rd-corner">
                <GoogleLogin
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                  buttonText=""
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  className="kep-login-facebook metro google-white"
                  children={<img className="banner-img-google" src={google} alt="" />}
                />

                {/* <img className="banner-img" src={google} alt="" /> */}
              </span>
              {/* <div className="banner rd-corner facebook ">
              <img className="banner-img" src={facebook} alt="" />
            </div> */}
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
  }
}


const AdminLogin = connect(mapStateToProps, mapDispatchToProps)(PureAdminLogin);

export default AdminLogin;
