// Importing modules
import * as React from "react";

// Importing Interfaces
import { IMenuItemWithoutFlux } from "src/modules";

export default class StockItemLine extends React.Component<IMenuItemWithoutFlux, {}> {
  constructor(props: IMenuItemWithoutFlux) {
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


// public setCategory (e: React.MouseEvent<HTMLButtonElement>) {
    //     this.setState ({
    //         category: e.currentTarget.value
    //     });
    // }

    // public setItemName (e: React.ChangeEvent<HTMLInputElement>) {
    //     this.setState ({
    //         itemName: e.target.value
    //     });
    // }

    // public setItemDescription (e: React.ChangeEvent<HTMLInputElement>) {
    //     this.setState ({
    //         itemDescription: e.target.value
    //     });
    // }

    // // need to parseFloat() when send to BE
    // public setItemMinPrice (e: React.ChangeEvent<HTMLInputElement>) {
    //     this.setState ({
    //         itemDescription: e.target.value
    //     });
    // }

    // // need to parseFloat() when send to BE
    // public setItemStartPrice (e: React.ChangeEvent<HTMLInputElement>) {
    //     this.setState ({
    //         itemDescription: e.target.value
    //     });
    // }

    // // need to parseInt() when send to BE
    // public setItemQuantity (e: React.ChangeEvent<HTMLInputElement>) {
    //     this.setState ({
    //         itemDescription: e.target.value
    //     });
    // }

    // public toggleActive () {
    //     this.setState ({
    //         isActive: !this.state.isActive
    //     });
    // }

    // public toggleSpecial () {
    //     this.setState ({
    //         isSpecial: !this.state.isSpecial
    //     });
    // }