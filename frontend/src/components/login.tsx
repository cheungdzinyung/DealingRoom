import * as React from "react";

export default class Login extends React.Component {
  public render() {
    return (
      <div className="login-grid">
        <input type="text" id="id"/>
        <input type="password" id="password"/>
        <button type="submit" id="submit">S</button>
        <button id="google">Google</button>
        <button id="facebook">Facebook</button>
      </div>
    );
  }
}
