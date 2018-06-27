// Importing modules
import * as React from "react";

import squareBeer from "src/components/assets/images/categories/squarebeer.jpg";
export default class ItemModalImage extends React.Component {
  public render() {
    return (
      <div className="edit-item-info">
        <img src={squareBeer} alt="" className="edit-item-info-img" />
      </div>
    );
  }
}
