// Importing modules from library
import * as History from "history";
import * as React from "react";
import ReactFacebookLogin, {
  ReactFacebookLoginInfo
} from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { match } from "react-router-dom";

// Importing styling and static assets
import "./CustomerLogin.scss";
import facebook from "./img/facebook.svg";
import google from "./img/google.svg";
import logo from "./img/logo.svg";

// Importing presentation components
import { Card } from "@blueprintjs/core";
import SubmitButton from "../../Components/SubmitButton/SubmitButton";
import CustomerLoginForm from "./Form/CustomerLoginForm";
import CustomerLoginSelector from "./Selector/CustomerLoginSelector";

// Redux
import { connect } from "react-redux";
import { IRootState } from "src/redux/store";
import {
  localLogin,
  localSignUp,
  loginFacebook
} from "src/redux/mobile/actions/actions_user";

interface ILoginState {
  username: string;
  password: string;
  localLoginType: "login" | "signUp";
}

interface ILoginProps {
  history: History.History;
  match: match<{ url: string }>;
  isAuth: boolean;
  // user_id: number,
  localLogin: (username: string, password: string) => void;
  localSignUp: (username: string, password: string) => void;
  loginFacebook: (token: string) => void;
}

const mapStateToProps = (state: IRootState) => {
  return {
    isAuth: state.customer.user.isAuth
  };
};

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
  };
};

class PureLogin extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      username: "",
      password: "",
      localLoginType: "login"
    };
  }

  // Handling state change of the form
  public username = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.target.value });
  };

  public password = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };

  // Recall methods from props to signup or login
  public toLocalLogin = () => {
    this.props.localLogin(this.state.username, this.state.password);
  };

  public toLocalSignUp = () => {
    this.props.localSignUp(this.state.username, this.state.password);
  };

  // Handing the status of the form, whether it's signup or login
  public chooseLogin = () => {
    this.setState({
      localLoginType: "login"
    });
  };

  public chooseSignUp = () => {
    this.setState({
      localLoginType: "signUp"
    });
  };

  // Social login
  public FBLogin = () => {
    return null;
  };

  public responseFromFB = (
    userInfo: ReactFacebookLoginInfo & { accessToken: string }
  ) => {
    if (userInfo.accessToken) {
      alert(userInfo.accessToken);
      this.props.loginFacebook(userInfo.accessToken);
    }
    return null;
  };

  public responseGoogle = (response: any) => {
    // alert(response);
  };

  // To check which page should the application redirect the user to, base on token stored within the browser
  public redirectingPage = () => {
    if (localStorage.getItem("welcomeOnSignup") === "true") {
      this.props.history.push("/customer/welcome");
    } else {
      if (localStorage.getItem("dealingRoomToken")) {
        this.props.history.push(`/customer/initialize`);
      }
    }
  };

  // To redirect page whenever the component has updated/mounted
  public componentDidUpdate() {
    this.redirectingPage();
  }

  public componentDidMount() {
    this.redirectingPage();
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
                children={
                  <img className="banner-img-google" src={google} alt="" />
                }
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
            <CustomerLoginSelector
              localLoginType={this.state.localLoginType}
              chooseLogin={this.chooseLogin}
              chooseSignup={this.chooseSignUp}
            />
            <CustomerLoginForm
              username={this.state.username}
              password={this.state.password}
              usernameChange={this.username}
              passwordChange={this.password}
            />
            <SubmitButton
              onClick={
                this.state.localLoginType === "login"
                  ? this.toLocalLogin
                  : this.toLocalSignUp
              }
              displayText={
                this.state.localLoginType === "login" ? "LOGIN" : "SIGN UP"
              }
            />
          </Card>
        </div>
      </div>
    );
  }
}

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureLogin);

export default Login;
