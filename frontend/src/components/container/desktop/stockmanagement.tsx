// Importing modules
import * as React from "react";

// Importing UI components
import AdminSideMenu from "../../ui/desktop/sidemenu";
import StockFilter from "../../ui/desktop/stockfilter";
import PageHeader from "../../ui/desktop/pageheader";

// Importing interfaces
import {
  ActiveSpecialFilter,
  IMenuCategoryWithoutFlux,
  IStockManageModalState,
} from "src/modules";

// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { getEntireMenu } from "../../../redux/desktop/actions/actions_manager";

import StockItemLine from "../../ui/desktop/stockitemline";
import StockManageModal from "../../ui/desktop/stockadditemcard";

interface IStockManagementProps {
  menuReady: boolean;
  entireMenu: IMenuCategoryWithoutFlux[];
  categories: string[];
  getEntireMenu: () => void;
  stockManageModalState: IStockManageModalState,
}

interface IStockManagementState {
  category: string;
  isActive: ActiveSpecialFilter;
  isSpecial: ActiveSpecialFilter;
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
    };
  }

  public goToAdd = (e: React.MouseEvent<HTMLDivElement>) => {
    // trigger to open moddle or wtever page
    // this.props.clickToAdd();
  }

  public goToEdit = (e: React.MouseEvent<HTMLDivElement>) => {
    // trigger to open moddle or wtever page
    // this.props.clickToEdit(this.props.item_id);
  }

  public filterChange = (filterChange: any) => {
    if (filterChange.filter === "category") {
      this.setState ({ category: filterChange.choice })
    } else if (filterChange.filter === "isActive") {
      this.setState ({ isActive: filterChange.choice })
    } else if (filterChange.filter === "isSpecial") {
      this.setState ({ isSpecial: filterChange.choice })
    }
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
        <div className="page-container-center">
          <PageHeader header="Stock Management" />

          { /* per cat */ 
            this.props.entireMenu.map((eachCat, index) => (
              /* per item */
              eachCat.items.map((eachItem, i) => {
                if (  (this.state.category === "all" || this.state.category === eachItem.categoryName)
                  &&  (this.state.isActive === "all" || this.state.isActive === eachItem.isActive) 
                  &&  (this.state.isSpecial === "all" || this.state.isSpecial === eachItem.isSpecial)) {
                  return <StockItemLine key={eachItem.itemName} singleItem={eachItem} />
                }
                else {
                  return <span/>
                }
              })
            )
          )
        }
        </div>
        <StockFilter filterChange={this.filterChange}/>

        {
          (this.props.stockManageModalState === "discard")
          // (false)
          ? <div/>
          : <StockManageModal/>
        }


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
    stockManageModalState: state.staff.manager.stockManageModalState,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getEntireMenu: () => {
      dispatch(getEntireMenu());
    },
  };
};

const StockManagement = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureStockManagement);

export default StockManagement;
