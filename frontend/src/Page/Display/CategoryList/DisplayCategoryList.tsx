// Importing modules from library
import * as React from "react";

// Importing styling and static assets
import "./DisplayCategoryList.scss";
// import QR from "./img/qrcode.jpg";

interface IDisplayCategoryList {
  category: string,
  max: string,
  min: string,
}

export class DisplayCategoryList extends React.Component<IDisplayCategoryList, {}> {
  constructor(props: IDisplayCategoryList) {
    super(props);
  }

  public render() {
    return (
      <div className="display-data-sub-container">
        {/* <img src={QR} className="display-data-sub-image" /> */}
        <div className={"display-data-high-low"}>
          <span className={"high-low"}>
            DAILY HIGH
          </span>
          <span className={"high"} >
            &#36;{this.props.max}
          </span>
        </div>
        <div className={"display-data-high-low"}>
          <span className={"high-low"}>
            DAILY LOW
          </span>
          <span className={"low"} >
            &#36;{this.props.min}
          </span>
        </div>
      </div>
    );
  }
}
