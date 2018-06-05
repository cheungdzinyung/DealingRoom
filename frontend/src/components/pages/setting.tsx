import { Button, InputGroup } from "@blueprintjs/core";
import * as React from "react";

// Component import
import Banner from "../share/topbanner";
import Usermenu from "../share/usermenu";

// Media asset import
import headerImg from "../../icons/setting.svg";

import profilePic from "../../images/circle-head.png"

export default class Setting extends React.Component {
  constructor(props: {}) {
    super(props);
  }
  public render() {
    return (
      <div className="page-content-container">
        <Banner header="Setting" image={headerImg} />
        <img className="setting-img" src={profilePic} alt=""/>
        <InputGroup
          leftIcon="person"
          placeholder="Display Name"
          type="text"
          className="pt-large input-field"
        />
        <InputGroup
          placeholder="Email"
          type="text"
          className="pt-large input-field"
        />
        <InputGroup
          placeholder="Password"
          type="text"
          className="pt-large input-field"
        />
        <InputGroup
          placeholder="Confirm Password"
          type="text"
          className="pt-large input-field"
        />
        <Button fill={true} large={true} className="confirm" type="button" text="Confirm" />
        <Usermenu />
      </div>
    );
  }
}
