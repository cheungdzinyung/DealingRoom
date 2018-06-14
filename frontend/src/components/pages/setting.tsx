import { FormGroup } from "@blueprintjs/core";
import * as React from "react";

// Component import
import Banner from "../share/topbanner";
import Usermenu from "../share/usermenu";

// Media asset import
import headerImg from "../../icons/setting.svg";

import profilePic from "../../images/profiles/circle-head.png";

export default class Setting extends React.Component {
  constructor(props: {}) {
    super(props);
  }
  public render() {
    return (
      <div className="page-content-container">
        <Banner header="Setting" image={headerImg} />
        <img className="setting-img" src={profilePic} alt="" />
        <FormGroup
          className="user-info-form"
          // helperText="User login information"
          // label="Your login information"
          labelFor="login"
          // requiredLabel={true}
        >
          <input
            placeholder="Display Name"
            type="text"
            className="pt-large input-field"
            dir="auto"
          />
          <input
            placeholder="Email"
            type="text"
            className="pt-large input-field"
          />
          <input
            placeholder="Password"
            type="password"
            className="pt-large input-field"
          />
          <input
            placeholder="Confirm Password"
            type="password"
            className="pt-large input-field"
          />
        </FormGroup>
        <button className="conf-button" type="submit">
          <span>Confirm</span>
        </button>
        <Usermenu />
      </div>
    );
  }
}
