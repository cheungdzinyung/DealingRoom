import { FormGroup } from "@blueprintjs/core";
import * as React from "react";

// Importing styling and static assets
import "./CustomerSetting.scss";

// Component import
// import Usermenu from "src/Components/CustomerAccessMenu/usermenu";

// Media asset import
import PageHeader from "src/Components/CustomerPageHeader/pageheader";

export default class Setting extends React.Component {
  constructor(props: {}) {
    super(props);
  }
  public render() {
    return (
      <div className="page-content-container">
        <PageHeader header="Setting" subHeader="Column A, or try column B" />
        <FormGroup
          className="user-info-form"
          labelFor="login"
        >
          <input
            placeholder="Display Name"
            type="text"
            className="pt-large input-field"
            dir="auto"
          />
          <input
            placeholder="Username"
            type="text"
            className="pt-large input-field"
          />
          <input
            placeholder="Password"
            type="password"
            className="pt-large input-field"
          />
        </FormGroup>
        <button className="conf-button" type="submit">
          <span>Confirm</span>
        </button>
        {/* <Usermenu /> */}
      </div>
    );
  }
}
