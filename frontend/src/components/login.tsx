import * as React from "react";

export default class Login extends React.Component {
  public render() {
    return (
      <div className="login-grid">
        <input type="text" id="id" />
        <input type="password" id="password" />
        <div id="submit">
          S
        </div>
        <div id="google">Google</div>
        <div id="facebook">Facebook</div>
      </div>
    );
  }
}
