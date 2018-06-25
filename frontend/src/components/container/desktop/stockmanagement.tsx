// Importing modules
import * as React from "react";

// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { getEntireMenu } from "../../../redux/desktop/actions/actions_manager";

// Importing UI components
import AdminSideMenu from "../../ui/desktop/sidemenu";
import StockFilter from "../../ui/desktop/stockfilter";
import PageHeader from "../../ui/desktop/pageheader";
import StockItemLine from "../../ui/desktop/stockitem/stockitemline";
import StockManageModal from "../../ui/desktop/stockitem/stockadditemcard";

// Importing interfaces
import {
  ActiveSpecialFilter,
  IMenuCategoryWithoutFlux,
  IStockManageModalState
} from "src/modules";

interface IStockManagementProps {
  menuReady: boolean;
  entireMenu: IMenuCategoryWithoutFlux[];
  categories: string[];
  getEntireMenu: () => void;
  stockManageModalState: IStockManageModalState;
}

interface IStockManagementState {
  category: string;
  isActive: ActiveSpecialFilter;
  isSpecial: ActiveSpecialFilter;
  isModalOpen: boolean;
}

export class PureStockManagement extends React.Component<
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

    this.switchEditModal.bind(this);
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

  public switchEditModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  public componentDidMount() {
    if (!this.props.menuReady) {
      this.props.getEntireMenu();
    }
  }

  public render() {
    return (
      <div className="desktop-page-container">
        <AdminSideMenu />
        <StockFilter filterChange={this.filterChange} />
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
                    return <StockItemLine openModal={this.switchEditModal} singleItem={eachItem} />;
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
              switchModal={this.switchEditModal}
            />
          )}
      </div>
    );
  }
}

// Redux
const mapStateToProps = (state: IRootState) => {
  return {
    entireMenu: state.staff.manager.entireMenu,
    categories: state.staff.manager.categories,
    menuReady: state.staff.manager.menuReady,
    stockManageModalState: state.staff.manager.stockManageModalState
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getEntireMenu: () => {
      dispatch(getEntireMenu());
    }
  };
};

const StockManagement = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureStockManagement);

export default StockManagement;

// public goToAdd = (e: React.MouseEvent<HTMLDivElement>) => {
//   trigger to open moddle or wtever page
//   this.props.clickToAdd();
// };

// public goToEdit = (e: React.MouseEvent<HTMLDivElement>) => {
//   trigger to open moddle or wtever page
//   this.props.clickToEdit(this.props.item_id);
// };
