import { Button, InputGroup } from "@blueprintjs/core";
import * as History from 'history';
import * as React from "react";

export default class Login extends React.Component<{history: History.History}> {
  public google = <span>Google</span>;
  public facebook = <span>Facebook</span>;
  public submit = <span>S</span>;

  public toProfile = () => {
    this.props.history.push('/profile');
  };

  public render() {
    return (
      <div className="login-container">
        <div className="login-grid">
          <InputGroup
            placeholder="Username"
            type="text"
            className="pt-large username"
          />
          <InputGroup
            placeholder="Password"
            type="password"
            className="pt-large password"
          />
          <Button
            fill={true}
            className="submit"
            type="submit"
            onClick={this.toProfile}
            text={this.submit}
          />
          <Button
            fill={true}
            className="google"
            type="button"
            text={this.google}
          />
          <Button
            fill={true}
            className="facebook"
            type="button"
            text={this.facebook}
          />
        </div>
      </div>
    );
  }
}
