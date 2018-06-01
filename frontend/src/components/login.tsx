import { Button, InputGroup } from "@blueprintjs/core";
import * as React from "react";

export default class Login extends React.Component {
  public google = <span>Google</span>;
  public facebook = <span>Facebook</span>;
  public submit = <span>Sb</span>;

  public toProfile = () => {
    return <div>Hi</div>;
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
