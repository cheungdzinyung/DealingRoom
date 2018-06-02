import { Button, InputGroup } from "@blueprintjs/core";
import * as React from "react";

// Component import
import Banner from "../share/topbanner";
import Usermenu from "../share/usermenu";

// Media asset import
import headerImg from "../../icons/setting.svg";

export default class Setting extends React.Component {
  constructor(props: {}) {
    super(props);
  }
  public render() {
    return (
      <div className="userInterface">
        <Banner header="Setting" image={headerImg} />
        <div className="page-container">
          <div className="setting-container">
            <InputGroup
              placeholder="Display Name"
              type="text"
              className="pt-large setting-input"
            />
            <InputGroup
              placeholder="Email"
              type="text"
              className="pt-large setting-input"
            />
            <InputGroup
              placeholder="Password"
              type="text"
              className="pt-large setting-input"
            />
            <InputGroup
              placeholder="Confirm Password"
              type="text"
              className="pt-large setting-input"
            />
            <Button fill={true} className="" type="button" text="Confirm" />
          </div>
        </div>
        <Usermenu />
      </div>
    );
  }
}
