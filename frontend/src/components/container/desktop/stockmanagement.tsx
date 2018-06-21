// Importing modules
import * as React from "react";

// Importing UI components
import AdminSideMenu from "../../ui/desktop/sidemenu";

// Importing interfaces
import { ActiveSpecialFilter, IMenuCategoryWithoutFlux, ICreateMenuItem, IEditMenuItem } from "src/modules";

// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { getEntireMenu, createItem, changeItemStatus } from "../../../redux/desktop/actions/actions_manager";

interface IStockManagementProps {
    menuReady: boolean,
    entireMenu: IMenuCategoryWithoutFlux[],
    categories: string[],
    getEntireMenu: () => void,


    // this goes to create page's state for new item input
    createItem: (itemStatus: ICreateMenuItem) => void,

    // this goes to edit page's state for item changes
    changeItemStatus: (itemStatus: IEditMenuItem) => void,


}

interface IStockManagementState {
    category: string
    isActive: ActiveSpecialFilter
    isSpecial: ActiveSpecialFilter

    // this goes to create page's state for new item input
    // items_id: number;            // NO ENTRY !! gen by BE
    // itemName: string;
    // itemStock: number;
    // categoryName: string;
    // itemDescription: string;
    // minimumPrice: number;
    // currentPrice: number;        // starting price
    // itemPhoto: any;
    // isSpecial: boolean;
    // isActive: boolean;

    // this goes to edit page's state for item changes
    // items_id: number;            // NO MOD !!
    // itemName: string;
    // itemStock: number;
    // categoryName: string;
    // itemDescription: string;
    // minimumPrice: number;
    // currentPrice: number;        // NO MOD !!
    // itemPhoto: any;
    // isSpecial: boolean;
    // isActive: boolean;
}

export class PureStockManagement extends React.Component<IStockManagementProps, IStockManagementState> {
    constructor(props: IStockManagementProps) {
        super(props)

        this.state = {
            category: "all",
            isActive: "all",
            isSpecial: "all"
        }
    }

    public filterByCategory(e: React.MouseEvent<HTMLButtonElement>) {
        this.setState({
            category: e.currentTarget.value
        });
    }

    public filterByActive(e: React.MouseEvent<HTMLButtonElement>) {
        let choice: ActiveSpecialFilter;
        if (e.currentTarget.value === "not active") {
            choice = false
        } else if (e.currentTarget.value === "active") {
            choice = true;
        } else {
            choice = "all";
        }
        this.setState({
            isActive: choice
        });
    }

    public filterBySpecial(e: React.MouseEvent<HTMLButtonElement>) {
        let choice: ActiveSpecialFilter;
        if (e.currentTarget.value === "not active") {
            choice = false
        } else if (e.currentTarget.value === "active") {
            choice = true;
        } else {
            choice = "all";
        }
        this.setState({
            isSpecial: choice
        });
    }


    public goToAdd(e: React.MouseEvent<HTMLDivElement>) {
        // trigger to open moddle or wtever page
        // this.props.clickToAdd();
    }

    public goToEdit(e: React.MouseEvent<HTMLDivElement>) {
        // trigger to open moddle or wtever page
        // this.props.clickToEdit(this.props.item_id);
    }

    public componentDidMount() {
        if (!this.props.menuReady) {
            this.props.getEntireMenu();
        }
    }

    public render() {
        return (
            <div className="desktop-page-container">
                <AdminSideMenu />
            </div>
        )
    }


    // // in add / edit page
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

    // public confirmAdd() {
    //     const newItem = {
    //         // items_id: number;            // NO ENTRY !! gen by BE
    //         itemName: this.state.itemName,
    //         itemStock: this.state.itemStock,
    //         categoryName: this.state.categoryName,
    //         itemDescription: this.state.itemDescription,
    //         minimumPrice: this.state.minimumPrice,
    //         currentPrice: this.state.currentPrice,        // starting price
    //         itemPhoto: this.state.itemPhoto,
    //         isSpecial: this.state.isSpecial,
    //         isActive: this.state.isActive,
    //     };
    //     this.props.createItem(newItem);
    // }



}

// Redux
const mapStateToProps = (state: IRootState) => {
    return {
        entireMenu: state.staff.manager.entireMenu,
        categories: state.staff.manager.categories,
        menuReady: state.staff.manager.menuReady,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getEntireMenu: () => {
            dispatch(getEntireMenu());
        },
        createItem: (itemStatus: ICreateMenuItem) => {
            dispatch(createItem(itemStatus));
        },
        changeItemStatus: (itemStatus: IEditMenuItem) => {
            dispatch(changeItemStatus(itemStatus));
        },

    }
}

const StockManagement = connect(mapStateToProps, mapDispatchToProps)(PureStockManagement);

export default StockManagement