// Importing modules from library
import * as React from "react";

// Importing components
// import Banner from "../share/topbanner";
import Usermenu from "../share/usermenu";

// Importing static assets
// import headerImg from "../../icons/credit.svg";

interface IProfileProps {
  paymentMethods: string[];
}

export default class Profile extends React.Component<IProfileProps> {
  constructor(props: IProfileProps) {
    super(props);

    this.state = {};
  }
  public render() {
    return (
      <div className="page-content-container">

        <Usermenu />
      </div>
    );
  }
}
