// Importing modules
import * as React from "react";

// redux
import { connect } from "react-redux";
import { IRootState } from "src/redux/store";
import { getEntireMenu, toggleStockManageModal } from "src/redux/desktop/actions/actions_manager";

// for redir
import * as History from "history";
import { withRouter } from "react-router";

import { IUserProfile } from "src/modules";

// Importing UI components
import AdminSideMenu from "src/Components/AdminAccessMenu/AdminAccessMenu";
import StockFilter from "src/Components/AdminStockFilter/AdminStockFilter";
import PageHeader from "src/Components/AdminPageHeader/AdminPageHeader";
import StockItemLine from "./ItemLine/AdminStockItemLine";
import StockManageModal from "./NewItemCard/AdminStockNewItemCard";

// Importing interfaces
import {
  ActiveSpecialFilter,
  IMenuCategoryWithoutFlux,
  IStockManageModalState,
  IUpdateMenuItem
} from "src/modules";


interface IStockManagementProps {
  menuReady: boolean;
  entireMenu: IMenuCategoryWithoutFlux[];
  categories: string[];
  getEntireMenu: () => void;
  stockManageModalState: IStockManageModalState;

  targetItem: IUpdateMenuItem;
  toggleStockManageModal: (
    stockManageModalState: IStockManageModalState,
    targetItem?: IUpdateMenuItem
  ) => void;
  createItemSuccess: boolean;
  editItemSuccess: boolean;

  // handling redirect
  customerProfile: IUserProfile,
  history: History.History,
}

interface IStockManagementState {
  category: string;
  isActive: ActiveSpecialFilter;
  isSpecial: ActiveSpecialFilter;
  isModalOpen: boolean;
}

// Redux
const mapStateToProps = (state: IRootState) => {
  return {
    entireMenu: state.staff.manager.entireMenu,
    targetItem: state.staff.manager.targetItem,
    categories: state.staff.manager.categories,
    menuReady: state.staff.manager.menuReady,
    stockManageModalState: state.staff.manager.stockManageModalState,
    customerProfile: state.customer.user.userProfile,
    createItemSuccess: state.staff.manager.createItemSuccess,
    editItemSuccess: state.staff.manager.editItemSuccess,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getEntireMenu: () => {
      dispatch(getEntireMenu());
    },
    toggleStockManageModal: (
      stockManageModalState: IStockManageModalState,
      targetItem?: IUpdateMenuItem
    ) => {
      dispatch(toggleStockManageModal(stockManageModalState, targetItem));
    }
  };
};

export class PureAdminStock extends React.Component<
  IStockManagementProps,
  IStockManagementState
  > {
  constructor(props: IStockManagementProps) {
    super(props);

    this.state = {
      category: "all",
      isActive: "all",
      isSpecial: "all",
      isModalOpen: false
    };

    this.openEditModal.bind(this);
    this.closeEditModal.bind(this);
  }

  // Controlling the filer
  public filterChange = (filterChange: any) => {
    if (filterChange.filter === "category") {
      this.setState({ category: filterChange.choice });
    } else if (filterChange.filter === "isActive") {
      this.setState({ isActive: filterChange.choice });
    } else if (filterChange.filter === "isSpecial") {
      this.setState({ isSpecial: filterChange.choice });
    }
  };

  public openEditModal = () => {
    this.props.toggleStockManageModal("update", this.props.targetItem);
    this.setState({
      isModalOpen: true
    });
  };

  public closeEditModal = () => {
    this.setState({
      isModalOpen: false
    });
    this.props.toggleStockManageModal("discard");
  }

  public componentWillMount() {
    // const isStaff = (
    //   this.props.customerProfile.role === "manager" ||
    //   this.props.customerProfile.role === "bartender" ||
    //   this.props.customerProfile.role === "waiter"
    // );
    // allow access b4 staff login is ok
    // const isStaff = false;
    // if (!isStaff) {
    //   this.props.history.push("/menu");
    // }
  }

  public componentDidMount() {
    if (!this.props.menuReady) {
      this.props.getEntireMenu();
    }
  }

  public componentDidUpdate() {
    if (this.props.createItemSuccess || this.props.editItemSuccess) {
      this.props.getEntireMenu();
    }
  }

  public render() {
    return (
      <div className="desktop-page-container">
        <AdminSideMenu />
        <StockFilter filterChange={this.filterChange} openModal={this.openEditModal} />
        <div className="page-container-center">
          <div className="page-container-center-content-wrapper">
            <PageHeader header="Stock Management" />

            {/* per cat */

              this.props.entireMenu.map((eachCat, indexCat) =>
                /* per item */
                eachCat.items.map((eachItem, indexItem) => {
                  if (
                    (this.state.category === "all" ||
                      this.state.category === eachItem.categoryName) &&
                    (this.state.isActive === "all" ||
                      this.state.isActive === eachItem.isActive) &&
                    (this.state.isSpecial === "all" ||
                      this.state.isSpecial === eachItem.isSpecial)
                  ) {
                    return <StockItemLine openModal={this.openEditModal} singleItem={eachItem} />;
                  } else {
                    return <span />;
                  }
                })
              )}
          </div>
        </div>

        {this.props.stockManageModalState === "discard" ? (
          <div />
        ) : (
            <StockManageModal
              isModalOpen={this.state.isModalOpen}
              closeEditModal={this.closeEditModal}
            />
          )}
      </div>
    );
  }
}

const StockManagement = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureAdminStock);

export default withRouter(StockManagement as any);
