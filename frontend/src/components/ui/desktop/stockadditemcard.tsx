// Importing modules
import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

// Importing Interfaces
import {
    ICreateMenuItem,
    IUpdateMenuItem,
    IStockManageModalState,
} from "src/modules";

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
import {
    createItem,
    updateItem,
    toggleStockManageModal,
} from "../../../redux/desktop/actions/actions_manager";

interface IStockManageModalProps {
    stockManageModalState: IStockManageModalState,
    categories: string[],
    targetItem: IUpdateMenuItem,
    // this goes to create page's state for new item input
    createItem: (itemStatus: ICreateMenuItem) => void;
    // this goes to edit page's state for item changes
    updateItem: (itemStatus: IUpdateMenuItem) => void;
    // close modal
    toggleStockManageModal: (stockManageModalState: IStockManageModalState, targetItem?: IUpdateMenuItem) => void,
}

interface IStockManageModalStates {
    items_id: number;            // NO ENTRY !! gen by BE
    itemName: string;
    itemStock: number;
    categoryName: string;
    itemDescription: string;
    minimumPrice: number;
    currentPrice: number;        //  starting price | NO MOD FOR EDIT MODAL!!
    itemPhoto: any;
    isSpecial: boolean;
    isActive: boolean;
    modal: boolean;
}

class PureStockManageModal extends React.Component<IStockManageModalProps, IStockManageModalStates> {
    constructor(props: IStockManageModalProps) {
        super(props);

        this.state = {
            items_id: 0,
            itemName: "itemName",
            itemStock: 0,
            categoryName: "categoryName",
            itemDescription: "itemDescription",
            minimumPrice: 0,
            currentPrice: 0,        // starting price
            itemPhoto: "itemPhoto",
            isSpecial: false,
            isActive: true,
            modal: true,
        }
    }

    public componentDidMount() {
        if (this.props.stockManageModalState === "update") {
            this.setState({ ...this.state, ...this.props.targetItem })
        }
    }

    public discard = () => {
        // MODAL_ACTION_DISCARD
        this.props.toggleStockManageModal("discard");
        this.setState({ modal: !this.state.modal })
    }

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
            isActive: this.state.isActive,
        }
        this.props.createItem(newItemStatus);
    }

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
            isActive: this.state.isActive,
        }
        this.props.updateItem(updateItemStatus);
    }

    public setCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            categoryName: e.currentTarget.value
        });
    }

    public setItemName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            itemName: e.target.value
        });
    }

    public setItemDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            itemDescription: e.target.value
        });
    }

    // need to parseFloat() when send to BE
    public setItemMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            minimumPrice: parseFloat(e.target.value)
        });
    }

    // need to parseFloat() when send to BE
    public setItemStartPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            currentPrice: parseFloat(e.target.value)
        });
    }

    // need to parseInt() when send to BE
    public setItemQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        // if (e.target.value.search(/^[0-9]/g) !== -1) {
        this.setState({
            itemStock: parseInt(e.target.value, 10) || 0
        });
        // }
    }

    public toggleActive = () => {
        this.setState({
            isActive: !this.state.isActive
        });
    }

    public toggleSpecial = () => {
        this.setState({
            isSpecial: !this.state.isSpecial
        });
    }

    public render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.discard} size="lg">
                    <ModalHeader>New Item</ModalHeader>
                    <ModalBody>
                        <div
                            className="stock-item-card rd-corner"
                            data-productid={this.state.items_id}
                        >
                            <img src={img} alt="" className="stock-item-img rd-corner" />
                            <div className="stock-item-info">
                                <select
                                    className="filter-select rd-corner stock-item-category"
                                    defaultValue={(this.props.stockManageModalState === "create") ? "beer" : this.props.targetItem.categoryName}
                                    onChange={this.setCategory}>
                                    {
                                        this.props.categories.map((category: string) => (
                                            <option key={category} value={category}>
                                                {firstLetterCaps(category)}
                                            </option>
                                        ))
                                    }
                                </select>

                                <div className="stock-item-name-price">
                                    <input
                                        type="text"
                                        className="stock-item-name"
                                        value={this.state.itemName}
                                        placeholder="item name"
                                        onChange={this.setItemName} />

                                    <input
                                        type="number"
                                        disabled={(this.props.stockManageModalState === "create") ? false : true}
                                        className="stock-item-price"
                                        value={this.state.currentPrice}
                                        placeholder="item price"
                                        onChange={this.setItemStartPrice} />
                                </div>

                                <input
                                    type="text"
                                    className="stock-item-description"
                                    value={this.state.itemDescription}
                                    placeholder="item description"
                                    onChange={this.setItemDescription} />

                                <div className="stock-item-price-floor">
                                    <span className="stock-item-price-floor-text">Price floor:</span>
                                    <input
                                        type="number"
                                        className="stock-item-price-floor-number"
                                        value={this.state.minimumPrice}
                                        placeholder="item price"
                                        onChange={this.setItemMinPrice} />
                                </div>

                                <div className="stock-item-price-floor">
                                    <span className="stock-item-price-floor-text">Stock:</span>
                                    <input
                                        type="text"
                                        className="stock-item-price-floor-number"
                                        value={this.state.itemStock}
                                        placeholder="item stock"
                                        onChange={this.setItemQuantity} />
                                </div>
                            </div>

                            <div className="stock-item-mod">
                                <div className="spec-act">

                                    {this.state.isSpecial
                                        ? (<button className="isSpecial" onClick={this.toggleSpecial}>
                                            <img src={FilledStar} alt="" className="star" />
                                        </button>)
                                        : (<button className="isSpecial" onClick={this.toggleSpecial}>
                                            <img src={UnfilledStar} alt="" className="star" />
                                        </button>)
                                    }


                                    {this.state.isActive
                                        ? (<button className="active-button rd-corner isActive" onClick={this.toggleActive}>
                                            <span className="isActive-button-text">Active</span>
                                        </button>)
                                        : (<button className="active-button rd-corner isNotActive" onClick={this.toggleActive}>
                                            <span className="isActive-button-text">Inactive</span>
                                        </button>)
                                    }
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {(this.props.stockManageModalState === "create")
                            ? <Button color="primary" onClick={this.create}>Create</Button>
                            : <Button color="primary" onClick={this.update}>Update</Button>
                        }
                        <Button color="secondary" onClick={this.discard}>Discard</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

// Redux
const mapStateToProps = (state: IRootState) => {
    return {
        targetItem: state.staff.manager.targetItem,
        stockManageModalState: state.staff.manager.stockManageModalState,
        categories: state.staff.manager.categories,
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
        toggleStockManageModal: (stockManageModalState: IStockManageModalState, targetItem?: IUpdateMenuItem) => {
            dispatch(toggleStockManageModal(stockManageModalState, targetItem));
        }
    };
};

const StockManageModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureStockManageModal);

export default StockManageModal;
