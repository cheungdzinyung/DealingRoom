import * as React from "react";
import Usermenu from "../components/usermenu";

export default class Profile extends React.Component {
  public render() {
    return (
      <div className="userInterface">
        <div className="top-content">
          <h1>Hi</h1>
        </div>
        <Usermenu />
      </div>
    );
  }
}
