// Importing modules
import * as React from "react";

// Importing Interfaces
import { IMenuItemWithoutFlux, IStockManageModalState, IUpdateMenuItem } from "src/modules";

// Importing utility function
import { firstLetterCaps } from "../../../util/utility";

// Importing static image assets
import FilledStar from "../../assets/icons/desktop/stocklist/starfilled.svg";
import UnfilledStar from "../../assets/icons/desktop/stocklist/starunfilled.svg";

// Importing temp fake images
import img from "../../assets/images/categories/squarebeer.jpg";

// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { toggleStockManageModal } from "../../../redux/desktop/actions/actions_manager";

interface IPureStockItemLineProps {
  singleItem: IMenuItemWithoutFlux,
  toggleStockManageModal: (stockManageModalState: IStockManageModalState, targetItem?: IUpdateMenuItem) => void,

}

class PureStockItemLine extends React.Component<IPureStockItemLineProps,{}> {
  constructor(props: IPureStockItemLineProps) {
    super(props);
  }

  public edit = (e: React.MouseEvent<HTMLDivElement>) => {
    this.props.toggleStockManageModal("update", this.props.singleItem);
  }

  public render() {
    return (
      <div
        className="stock-item-card rd-corner"
        data-productid={this.props.singleItem.items_id}
        onClick={this.edit}
      >
        <img src={img} alt="" className="stock-item-img rd-corner" />
        <div className="stock-item-info">
          <span className="stock-item-category">
            {firstLetterCaps(this.props.singleItem.categoryName)}
          </span>
          <div className="stock-item-name-price">
            <span className="stock-item-name">{this.props.singleItem.itemName}</span>
            <span className="stock-item-price">
              &#36;{this.props.singleItem.currentPrice}
            </span>
          </div>
          <p className="stock-item-description">{this.props.singleItem.itemDescription}</p>
          <div className="stock-item-price-floor">
            <span className="stock-item-price-floor-text">Price floor:</span>
            <span className="stock-item-price-floor-number">
              &#36;{this.props.singleItem.minimumPrice}
            </span>
          </div>
        </div>
        <div className="stock-item-mod">
          <div className="spec-act">
            <div className="isSpecial">
              {this.props.singleItem.isSpecial ? (
                <img src={FilledStar} alt="" className="star" />
              ) : (
                <img src={UnfilledStar} alt="" className="star" />
              )}
            </div>
            {this.props.singleItem.isActive ? (
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

// Redux
const mapStateToProps = (state: IRootState) => {
  return {
      stockManageModalState: state.staff.manager.stockManageModalState,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
      toggleStockManageModal: (stockManageModalState: IStockManageModalState, targetItem?: IUpdateMenuItem) => {
          dispatch(toggleStockManageModal(stockManageModalState, targetItem));
      }
  };
};

const StockItemLine = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureStockItemLine);

export default StockItemLine;