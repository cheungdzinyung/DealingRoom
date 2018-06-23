// Importing modules
import * as React from "react";

// Importing Interfaces
import { IMenuItemWithoutFlux } from "src/modules";

// Importing utility function
import { firstLetterCaps } from "../../../util/utility";

// Importing static image assets
import FilledStar from "../../assets/icons/desktop/stocklist/starfilled.svg";
import UnfilledStar from "../../assets/icons/desktop/stocklist/starunfilled.svg";

// Importing temp fake images
import img from "../../assets/images/categories/squarebeer.jpg";

export default class StockItemLine extends React.Component<
  IMenuItemWithoutFlux,
  {}
> {
  constructor(props: IMenuItemWithoutFlux) {
    super(props);
  }
  public render() {
    return (
      <div
        className="stock-item-card rd-corner"
        data-productId={this.props.items_id}
      >
        <img src={img} alt="" className="stock-item-img rd-corner" />
        <div className="stock-item-info">
          <span className="stock-item-category">
            {firstLetterCaps(this.props.categoryName)}
          </span>
          <div className="stock-item-name-price">
            <span className="stock-item-name">{this.props.itemName}</span>
            <span className="stock-item-price">
              &#36;{this.props.currentPrice}
            </span>
          </div>
          <p className="stock-item-description">{this.props.itemDescription}</p>
          <div className="stock-item-price-floor">
            <span className="stock-item-price-floor-text">Price floor:</span>
            <span className="stock-item-price-floor-number">
              &#36;{this.props.minimumPrice}
            </span>
          </div>
        </div>
        <div className="stock-item-mod">
          <div className="spec-act">
            <div className="isSpecial">
              {this.props.isSpecial ? (
                <img src={FilledStar} alt="" className="star" />
              ) : (
                <img src={UnfilledStar} alt="" className="star" />
              )}
            </div>
            {this.props.isActive ? (
              <button className="active-button rd-corner isActive">
                <span className="isActive-button-text">Active</span>
              </button>
            ) : (
              <button className="active-button rd-corner isNotActive">
                <span className="isActive-button-text">Inactive</span>
              </button>
            )}
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
