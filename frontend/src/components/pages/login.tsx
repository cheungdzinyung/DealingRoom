// Importing modules from library
import * as History from "history";
import * as React from "react";

// Importing static assets
import facebook from "../icons/facebookSignup.svg";
import google from "../icons/googleSignup.svg";
import Key from "../icons/key.svg";

// redux
import { connect } from "react-redux";
import { IRootState } from "../reducers/index";
import { localLogin } from "../actions/actions_user";

interface ILoginState {
  username: string,
  password: string,
}

interface ILoginProps {
  history: History.History,
  isAuth: boolean,
  localLogin: (username: string, password: string) => void,
}

class PureLogin extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      username: "admin",
      password: "admin",
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
  
  public componentDidUpdate () {
    if(this.props.isAuth) {
      this.props.history.push("/initialize");
    }
  }

  public render() {
    return (
      <div className="login-container">
        <div className="login-grid">
          <input
            type="text"
            placeholder="Username"
            className="pt-large username"
            value={this.state.username}
            onChange={this.username}
          />

          <input
            type="password"
            placeholder="Password"
            className="pt-large password"
            value={this.state.password}
            onChange={this.password}
          />

          <button
            type="submit"
            className="login-button-hp"
            onClick={this.toLocalLogin}
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

const mapStateToProps = (state: IRootState) => {
  return {
    isAuth: state.user.isAuth,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    localLogin: (username: string, password: string) => {
      dispatch(localLogin(username, password));
    }
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(PureLogin);

export default Login