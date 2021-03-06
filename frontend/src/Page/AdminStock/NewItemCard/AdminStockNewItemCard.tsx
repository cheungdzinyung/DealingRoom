// Importing modules
import * as React from "react";

// Importing styling and static assets
import "./AdminStockNewItemCard.scss";

// Importing UI elements
import { Dialog } from "@blueprintjs/core";
import ItemModalDescription from "./Description/AdminStockNewItemCardDescription";
import ItemModalInfo from "./Info/AdminStockNewItemCardInfo";
import ItemModalStatus from "./Status/AdminStockNewItemCardStatus";
import ItemModalImage from "./Image/AdminStockNewItemCardImage";
import PlusButton from "./img/plus.svg";

// Importing Interfaces
import {
  ICreateMenuItem,
  IUpdateMenuItem,
  IStockManageModalState
} from "src/modules";

// redux
import { connect } from "react-redux";
import { IRootState } from "src/redux/store";
import {
  createItem,
  updateItem,
  toggleStockManageModal,
  resetSuccessState
} from "src/redux/desktop/actions/actions_manager";

// Props and States
interface IStockManageModalProps {
  stockManageModalState: IStockManageModalState;
  categories: string[];
  targetItem: IUpdateMenuItem;
  // this goes to create page's state for new item input
  createItem: (itemStatus: ICreateMenuItem) => void;
  // this goes to edit page's state for item changes
  updateItem: (itemStatus: IUpdateMenuItem) => void;
  // Control opening of modal
  toggleStockManageModal: (
    stockManageModalState: IStockManageModalState,
    targetItem?: IUpdateMenuItem
  ) => void;

  isModalOpen: boolean;
  closeEditModal: () => void;
  createItemSuccess: boolean;
  editItemSuccess: boolean;
  resetSuccessState: () => void,
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
}

// Redux
const mapStateToProps = (state: IRootState) => {
  return {
    targetItem: state.staff.manager.targetItem,
    stockManageModalState: state.staff.manager.stockManageModalState,
    categories: state.staff.manager.categories,
    createItemSuccess: state.staff.manager.createItemSuccess,
    editItemSuccess: state.staff.manager.editItemSuccess,
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
    },
    resetSuccessState: () => {
      dispatch(resetSuccessState());
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
      isActive: true
    };
  }

  public componentDidMount() {
    if (this.props.stockManageModalState === "update") {
      this.setState({ ...this.state, ...this.props.targetItem });
    }
  }

  public componentDidUpdate() {
    if (this.props.createItemSuccess || this.props.editItemSuccess) {
      this.props.toggleStockManageModal("discard");
      this.props.resetSuccessState();
    }
  }

  public discard = () => {
    // MODAL_ACTION_DISCARD
    this.props.toggleStockManageModal("discard");
    // this.setState({ modal: !this.state.modal });
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
      itemPhoto: this.state.itemPhoto,
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
      itemPhoto: this.state.itemPhoto,
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

  public setItemDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <Dialog
        isOpen={this.props.isModalOpen}
        className="edit-item-container"
        canEscapeKeyClose={true}
        canOutsideClickClose={true}
        onClose={this.props.closeEditModal}
      >
        <div className="edit-item-grid">
          <ItemModalImage imageSrc={this.state.itemPhoto} />
          <ItemModalInfo
            itemName={this.state.itemName}
            itemStock={this.state.itemStock}
            minimumPrice={this.state.minimumPrice}
            currentPrice={this.state.currentPrice}
            setName={this.setItemName}
            setStock={this.setItemQuantity}
            setMinimunPrice={this.setItemMinPrice}
            setCurrentPrice={this.setItemStartPrice}
          />
          <ItemModalStatus
            categories={this.props.categories}
            isActive={this.state.isActive}
            isSpecial={this.state.isSpecial}
            setCategories={this.setCategory}
            toggleActive={this.toggleActive}
            toggleSpecial={this.toggleSpecial}
          />
          <ItemModalDescription
            descriptionText={this.state.itemDescription}
            onChange={this.setItemDescription}
          />
          {/* Little Adding button for confirmation */}
          <img src={PlusButton} alt="Plus button" className="stockadd-button" onClick={this.update} />
          {/* <div className="pt-dialog-footer">
            <div className="pt-dialog-footer-actions">
              <Button text="Secondary" />
              <Button
                intent={Intent.PRIMARY}
                onClick={this.update}
                text="Primary"
              />
            </div>
          </div> */}
        </div>
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
