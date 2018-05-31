import {Button, InputGroup} from '@blueprintjs/core'
import * as React from "react";

export default class Login extends React.Component {
  public google = (<span>Google</span>);


  public render() {
    return (
      <div className="login-grid">
        <InputGroup placeholder="Username" type="text" className="pt-large username"/>
        <InputGroup placeholder="Password" type="password" className="pt-large password"/>
        <div id="submit">
          <h1>HI</h1>
        </div>
        <Button className="google" text={this.google}/>
        <div id="facebook">Facebook</div>
      </div>
    );
  }
}
