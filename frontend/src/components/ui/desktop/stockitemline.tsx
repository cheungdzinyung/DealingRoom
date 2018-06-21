// Importing modules
import * as React from "react";

// Importing Interfaces
import { IPureMenuItem } from "src/modules";

export default class StockItemLine extends React.Component<IPureMenuItem, {}> {
  constructor(props: IPureMenuItem) {
    super(props);
  }
  public render() {
    return (
      <div className="stock-item-card" data-productId={this.props.items_id}>
        <img src="" alt="" className="stock-item-img" />
        <div className="stock-item-info">
          <span className="stock-item-category">{this.props.categoryName}</span>
          <div>
            <span>{this.props.itemName}</span>
            <span>{this.props.currentPrice}</span>
          </div>
          <p>{this.props.itemDescription}</p>
          <div className="stock-item-price-floor">
            <span>Price floor:</span>
            <span>{this.props.minimumPrice}</span>
          </div>
        </div>
        <div className="stock-item-mod">
          <div className="spec-act">
            <div className="isSpecial">
              <img src="" alt="" className="star" />
            </div>
            <div className="isActive">
              <span>Active</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
