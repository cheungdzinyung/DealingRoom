// Importing modules
import * as React from "react";

// Importing UI elements
import { Dialog, Button, Intent } from "@blueprintjs/core";

// Importing Interfaces
import { IMenuItemWithoutFlux } from "src/modules";

// Importing utility function
import { firstLetterCaps } from "../../../util/utility";

// Importing static image assets
import FilledStar from "../../assets/icons/desktop/stocklist/starfilled.svg";
import UnfilledStar from "../../assets/icons/desktop/stocklist/starunfilled.svg";
import Menu from "../../assets/icons/desktop/stocklist/menu.svg";

// Importing temp fake images
import img from "../../assets/images/categories/squarebeer.jpg";

interface IStockItemLineState {
  isEditMenuOpen: boolean;
}

export default class StockItemLine extends React.Component<
  IMenuItemWithoutFlux,
  IStockItemLineState
> {
  constructor(props: IMenuItemWithoutFlux) {
    super(props);

    this.state = {
      isEditMenuOpen: false
    }
  }

  public openEditMenu = () => {
    this.setState({
      isEditMenuOpen: true
    });
  };

  public toggleDialog = () => {
    this.setState({ isEditMenuOpen: !this.state.isEditMenuOpen });
  };

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
          <div className="item-edit-menu">
            <img
              src={Menu}
              alt=""
              className="edit-item-icon"
              onClick={this.openEditMenu}
            />
          </div>
        </div>
        <Dialog
          icon="inbox"
          isOpen={this.state.isEditMenuOpen}
          onClose={this.toggleDialog}
          title="Dialog header"
        >
          <div className="pt-dialog-body">Some content</div>
          <div className="pt-dialog-footer">
            <div className="pt-dialog-footer-actions">
              <Button text="Secondary" />
              <Button
                intent={Intent.PRIMARY}
                onClick={this.toggleDialog}
                text="Primary"
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

// 24, June: Harrison, the comment functions are now in stockadditemcoard.tsx
