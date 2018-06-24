// Importing modules
import * as React from "react";

// Importing UI elements
import { Dialog } from "@blueprintjs/core";

// Importing Interfaces
import {
  ICreateMenuItem,
  IUpdateMenuItem,
  IStockManageModalState
} from "../../../modules";

// Importing utility function
// import { firstLetterCaps } from "../../../util/utility";

// Importing static image assets
// import FilledStar from "../../assets/icons/desktop/stocklist/starfilled.svg";
// import UnfilledStar from "../../assets/icons/desktop/stocklist/starunfilled.svg";



// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import {
  createItem,
  updateItem,
  toggleStockManageModal
} from "../../../redux/desktop/actions/actions_manager";

// Props and States
interface IStockManageModalProps {
  stockManageModalState: IStockManageModalState;
  categories: string[];
  targetItem: IUpdateMenuItem;
  // this goes to create page's state for new item input
  createItem: (itemStatus: ICreateMenuItem) => void;
  // this goes to edit page's state for item changes
  updateItem: (itemStatus: IUpdateMenuItem) => void;
  // close modal
  toggleStockManageModal: (
    stockManageModalState: IStockManageModalState,
    targetItem?: IUpdateMenuItem
  ) => void;
}

interface IStockManageModalStates {
  items_id: number; // NO ENTRY !! gen by BE
  itemName: string;
  itemStock: number;
  categoryName: string;
  itemDescription: string;
  minimumPrice: number;
  currentPrice: number; //  starting price | NO MOD FOR EDIT MODAL!!
  itemPhoto: any;
  isSpecial: boolean;
  isActive: boolean;
  modal: boolean;
}

// Redux
const mapStateToProps = (state: IRootState) => {
  return {
    targetItem: state.staff.manager.targetItem,
    stockManageModalState: state.staff.manager.stockManageModalState,
    categories: state.staff.manager.categories
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createItem: (itemStatus: ICreateMenuItem) => {
      dispatch(createItem(itemStatus));
    },
    updateItem: (itemStatus: IUpdateMenuItem) => {
      dispatch(updateItem(itemStatus));
    },
    toggleStockManageModal: (
      stockManageModalState: IStockManageModalState,
      targetItem?: IUpdateMenuItem
    ) => {
      dispatch(toggleStockManageModal(stockManageModalState, targetItem));
    }
  };
};


class RealStockManageModal extends React.Component<
  IStockManageModalProps,
  IStockManageModalStates
> {
  constructor(props: IStockManageModalProps) {
    super(props);

    this.state = {
      items_id: 0,
      itemName: "itemName",
      itemStock: 0,
      categoryName: "categoryName",
      itemDescription: "itemDescription",
      minimumPrice: 0,
      currentPrice: 0, // starting price
      itemPhoto: "itemPhoto",
      isSpecial: false,
      isActive: true,
      modal: true
    };
  }

  public componentDidMount() {
    if (this.props.stockManageModalState === "update") {
      this.setState({ ...this.state, ...this.props.targetItem });
    }
  }

  public discard = () => {
    // MODAL_ACTION_DISCARD
    this.props.toggleStockManageModal("discard");
    this.setState({ modal: !this.state.modal });
  };

  public create = () => {
    // MODAL_ACTION_CONFIRM
    // const minimumPrice = (typeof(this.state.minimumPrice) === "string") ? parseFloat(this.state.minimumPrice) : this.state.minimumPrice;
    // const currentPrice = (typeof(this.state.currentPrice) === "string") ? parseFloat(this.state.currentPrice) : this.state.currentPrice;
    const newItemStatus = {
      itemName: this.state.itemName,
      itemStock: this.state.itemStock,
      categoryName: this.state.categoryName,
      itemDescription: this.state.itemDescription,
      minimumPrice: this.state.minimumPrice,
      currentPrice: this.state.currentPrice,
      itemPhoto: "",
      isSpecial: this.state.isSpecial,
      isActive: this.state.isActive
    };
    this.props.createItem(newItemStatus);
  };

  public update = () => {
    // MODAL_ACTION_UPDATE
    // const minimumPrice = (typeof(this.state.minimumPrice) === "string") ? parseFloat(this.state.minimumPrice) : this.state.minimumPrice;
    const updateItemStatus = {
      items_id: this.state.items_id,
      itemName: this.state.itemName,
      itemStock: this.state.itemStock,
      categoryName: this.state.categoryName,
      itemDescription: this.state.itemDescription,
      minimumPrice: this.state.minimumPrice,
      itemPhoto: "",
      isSpecial: this.state.isSpecial,
      isActive: this.state.isActive
    };
    this.props.updateItem(updateItemStatus);
  };

  public setCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      categoryName: e.currentTarget.value
    });
  };

  public setItemName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      itemName: e.target.value
    });
  };

  public setItemDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      itemDescription: e.target.value
    });
  };

  // need to parseFloat() when send to BE
  public setItemMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      minimumPrice: parseFloat(e.target.value)
    });
  };

  // need to parseFloat() when send to BE
  public setItemStartPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      currentPrice: parseFloat(e.target.value)
    });
  };

  // need to parseInt() when send to BE
  public setItemQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (e.target.value.search(/^[0-9]/g) !== -1) {
    this.setState({
      itemStock: parseInt(e.target.value, 10) || 0
    });
    // }
  };

  public toggleActive = () => {
    this.setState({
      isActive: !this.state.isActive
    });
  };

  public toggleSpecial = () => {
    this.setState({
      isSpecial: !this.state.isSpecial
    });
  };

  public render() {
    return (
      <Dialog isOpen={this.state.modal}>
        <h1>New Item</h1>
        {/* <select
          className="filter-select rd-corner stock-item-category"
          defaultValue={
            this.props.stockManageModalState === "create"
              ? "beer"
              : this.props.targetItem.categoryName
          }
          onChange={this.setCategory}
        >
          {this.props.categories.map((category: string) => (
            <option key={category} value={category}>
              {firstLetterCaps(category)}
            </option>
          ))}
        </select> */}

        <div className="stock-item-name-price">
          <input
            type="text"
            className="stock-item-name"
            value={this.state.itemName}
            placeholder="item name"
            onChange={this.setItemName}
          />

          <input
            type="number"
            disabled={
              this.props.stockManageModalState === "create" ? false : true
            }
            className="stock-item-price"
            value={this.state.currentPrice}
            placeholder="item price"
            onChange={this.setItemStartPrice}
          />
        </div>

        <input
          type="text"
          className="stock-item-description"
          value={this.state.itemDescription}
          placeholder="item description"
          onChange={this.setItemDescription}
        />

        {this.props.stockManageModalState === "create" ? (
          <button color="primary" onClick={this.create}>
            Create
          </button>
        ) : (
          <button color="primary" onClick={this.update}>
            Update
          </button>
        )}
        <button color="secondary" onClick={this.discard}>
          Discard
        </button>
      </Dialog>
    );
  }
}


// Redux connect and export
const StockManageModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(RealStockManageModal);

export default StockManageModal;