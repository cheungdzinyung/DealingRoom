import * as React from "react";
import Usermenu from "../share/usermenu";

export default class Profile extends React.Component {
  constructor(props: {}) {
    super(props);
  }
  public render() {
    return (
      <div className="page-content-container">
        <h1>Hi</h1>
        <Usermenu />
      </div>
    );
  }
}
