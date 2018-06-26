import * as React from "react";

// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { toggleStockManageModal } from "../../../redux/desktop/actions/actions_manager";

// Importing interfaces
import { ActiveSpecialFilter, IStockManageModalState } from "src/modules";

import { firstLetterCaps } from "src/util/utility";

interface IStockFilterProps {
  categories: string[];
  filterChange: (filterChange: any) => void;
  toggleStockManageModal: (
    stockManageModalState: IStockManageModalState
  ) => void;
  openModal: () => void,
}

interface IStockFilterState {
  category: string;
  isActive: ActiveSpecialFilter;
  isSpecial: ActiveSpecialFilter;
}

export class PureStockFilter extends React.Component<
  IStockFilterProps,
  IStockFilterState
> {
  constructor(props: IStockFilterProps) {
    super(props);

    this.state = {
      category: "all",
      isActive: "all",
      isSpecial: "all"
    };
  }

  //   Filter switching methods
  public filterByCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      category: e.currentTarget.value
    });
    this.props.filterChange({
      filter: "category",
      choice: e.currentTarget.value
    });
  };

  public filterByActive = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let choice: ActiveSpecialFilter;
    switch (e.currentTarget.value) {
      case "true":
        choice = true;
        break;
      case "false":
        choice = false;
        break;
      default:
        choice = "all";
        break;
    }
    this.setState({
      isActive: choice
    });
    this.props.filterChange({ filter: "isActive", choice });
  };

  public filterBySpecial = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let choice: ActiveSpecialFilter;
    switch (e.currentTarget.value) {
      case "true":
        choice = true;
        break;
      case "false":
        choice = false;
        break;
      default:
        choice = "all";
        break;
    }
    this.setState({
      isSpecial: choice
    });
    this.props.filterChange({ filter: "isSpecial", choice });
  };

  public createItem = () => {
    this.props.toggleStockManageModal("create");
    this.props.openModal();
  };

  public render() {
    return (
      <div className="filter-container">
        <div className="filter-content-wrapper">
          {/* category filter */}
          <span className="filter-header">Filters</span>
          <div className="filter-line">
            <span className="filter-subheader">Categories</span>
            <div className="filter-select-box">
              <select
                className="filter-select rd-corner"
                defaultValue="all"
                onChange={this.filterByCategory}
              >
                <option value="all">All</option>
                {this.props.categories.map((category: string) => (
                  <option key={category} value={category}>
                    {firstLetterCaps(category)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* isActive filter */}
          <div className="filter-line">
            <span className="filter-subheader">Active</span>
            <div className="filter-select-box">
              <select
                className="filter-select rd-corner"
                data-filter="isActive"
                defaultValue="all"
                onChange={this.filterByActive}
              >
                <option value="all">All</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>

          {/* isSpecial filter */}
          <div className="filter-line">
            <span className="filter-subheader">Specials</span>
            <div className="filter-select-box">
              <select
                defaultValue="all"
                className="filter-select rd-corner"
                onChange={this.filterBySpecial}
              >
                <option value="all">All</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>

          {/* Temp button for adding items */}
          <div className="filter-line">
            <span className="filter-subheader" />
            <div className="filter-select-box">
              <input
                type="button"
                className="filter-select rd-corner"
                value="Create New Item"
                onClick={this.createItem}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Redux
const mapStateToProps = (state: IRootState) => {
  return {
    categories: state.staff.manager.categories
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleStockManageModal: (stockManageModalState: IStockManageModalState) => {
      dispatch(toggleStockManageModal(stockManageModalState));
    }
  };
};

const StockFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureStockFilter);

export default StockFilter;
