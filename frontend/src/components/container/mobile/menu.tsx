// Importing modules from library
import * as React from "react";

// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import {
  addToCurrentOrder,
  getEntireMenu
} from "../../../redux/mobile/actions/actions_orders";

// Import UI elements
import { AppToaster } from "src/components/ui/mobile/toast";
import { Intent } from "@blueprintjs/core";
import UserMenu from "../../ui/mobile/usermenu";
import MenuItem from "../../ui/mobile/menuitem";
import tempImg from "src/components/assets/images/categories/squarebeer.jpg";
import tempImgLong from "src/components/assets/images/categories/beer.jpg";

// Importing interfaces
import {
  IRequestItem,
  IMenuCategoryWithFlux,
  IMenuItemWithFlux
} from "src/modules";

// socket
import { store } from "../../../redux/store";
import PageHeader from "../../ui/mobile/pageheader";
import CategoryFilter from "../../ui/mobile/categoryfilter";



// Props and States
interface IMenuProps {
  // From redux
  categories: string[];
  currentOrder: IRequestItem[];
  entireMenu: IMenuCategoryWithFlux[];
  getEntireMenu: () => void;
  addToCurrentOrder: (
    itemID: number,
    itemName: string,
    currentPrice: number
  ) => void;
  // From Parent
  menuReady: boolean;
}

interface IMenuState {
  searchBoxEntry: string;
  displayCategoryIndex: number;
  isItemDetailsOpen: { [key: string]: boolean };
}

// Redux
const mapStateToProps = (state: IRootState) => {
  return {
    // priceMapping: state.orders.priceMapping,
    entireMenu: state.customer.orders.entireMenu,
    categories: state.customer.orders.categories,
    currentOrder: state.customer.orders.currentOrder
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getEntireMenu: () => {
      dispatch(getEntireMenu());
    },
    addToCurrentOrder: (itemid: number, name: string, currentPrice: number) => {
      dispatch(addToCurrentOrder(itemid, name, currentPrice));
      AppToaster.show({
        message: "Item added to order!",
        intent: Intent.SUCCESS,
        icon: "tick",
        timeout: 500
      });
    }
  };
};

// Component class
export class PureMenu extends React.Component<IMenuProps, IMenuState> {
  constructor(props: IMenuProps) {
    super(props);

    const tempisItemDetailsOpen = {};
    this.props.entireMenu.forEach((category: any, categoryIndex: any) => {
      category.items.forEach((item: any, itemIndex: any) => {
        const currentLoc = category.categoryName
          .toString()
          .concat(itemIndex.toString());
        tempisItemDetailsOpen[`${currentLoc}`] = false;
      });
    });

    this.state = {
      searchBoxEntry: "",
      displayCategoryIndex: 0,
      isItemDetailsOpen: tempisItemDetailsOpen
    };
  }

  // price fluc. by socket.io, new price recieved in actions_orders
  // map state.entireMenu to props and comp will re-render when updated
  // F5 btn for testing
  public refreshPrice = () => {
    store.dispatch({ type: "POST/buy", data: {} });
  };

  // switch category
  public previousCategory = () => {
    if (this.state.displayCategoryIndex - 1 < 0) {
      this.setState({ displayCategoryIndex: this.props.categories.length - 1 });
    } else {
      this.setState({
        displayCategoryIndex: this.state.displayCategoryIndex - 1
      });
    }
  };

  public nextCategory = () => {
    if (this.state.displayCategoryIndex + 1 >= this.props.categories.length) {
      this.setState({ displayCategoryIndex: 0 });
    } else {
      this.setState({
        displayCategoryIndex: this.state.displayCategoryIndex + 1
      });
    }
  };

  // toggle description box
  public isOpen = (locKey: string) => {
    const newMenuState = { ...this.state.isItemDetailsOpen };
    newMenuState[locKey] = !newMenuState[locKey];

    this.setState({
      isItemDetailsOpen: newMenuState
    });
  };

  // search box
  public searching = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchBoxEntry: e.target.value.toLowerCase() });
  };

  public componentWillMount() {
    if (!this.props.menuReady) {
      this.props.getEntireMenu();
    }
  }

  // TODO: to fix the next and Previous of the carousel
  public render() {
    return (
      <div className="page-content-container">
        <PageHeader header={"Menu"} subHeader={"Column A, or try column B"} />
        {/* Hard coding for now */}
        <CategoryFilter categories={["All", "Beer", "Cocktails", "Drinks"]} />

        {/* Category image */}
        <div className="rd-corner menu-display">
          {/* {alert(JSON.stringify(this.props.entireMenu[0]))} */}
          <img src={tempImgLong} alt="" className="rd-corner display-img" />
        </div>
        {/* Search item bar */}
        <input
          className="searchbar rd-corner"
          type="text"
          placeholder="Search input"
          dir="auto"
          value={this.state.searchBoxEntry}
          onChange={this.searching}
        />

        {/* render display from all > cat > search */}
        {this.props.entireMenu.map(
          (category: IMenuCategoryWithFlux, categoryIndex: number) =>
            category.items.map(
              (item: IMenuItemWithFlux, itemIndex: number) =>
                /* v match searching, check for invalid char */
                item.itemName
                  .toLowerCase()
                  .search(
                    this.state.searchBoxEntry.replace(
                      /([.?*+^$[\]\\(){}|-])/g,
                      "\\$1"
                    )
                  ) !== -1 &&
                /* v match selected category */
                category.categoryName ===
                this.props.categories[this.state.displayCategoryIndex] &&
                /* v check stock > 0 */
                item.itemStock > 0 && (
                  <MenuItem
                    item_id={item.items_id}
                    categoryName={category.categoryName}
                    itemName={item.itemName}
                    currentPrice={item.currentPrice}
                    priceDelta={3}
                    itemDescription={item.itemDescription}
                    itemPhoto={tempImg}
                    detailIsOpen={true}
                    chartData={item.chartData}
                    addToCurrentOrder={this.props.addToCurrentOrder}
                  />
                )
            )
        )}
        <UserMenu />
      </div>
    );
  }
}

const Menu = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureMenu);

export default Menu;
