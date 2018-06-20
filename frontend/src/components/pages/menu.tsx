// Importing modules from library
import * as React from "react";

// redux
import { connect } from "react-redux";
import { IRootState } from "../reducers/index";
import { addToCurrentOrder } from "../actions/actions_orders";

// Import UI elements
import { Card, Collapse, Elevation } from "@blueprintjs/core";
import { Line } from "react-chartjs-2";
import Usermenu from "../share/usermenu";
import MenuItem from "../ui/menuitem";

// Importing interfaces
// import { IPureCategoryWithItem } from "../../modules";

// Importing helper function
import { percentageChange } from "../../util/utility"

// Importing replacable fake data
import { chartOption } from "../../fakedata";

// Importing static assets
import down from "../icons/down.svg";
import up from "../icons/up.svg";
import beer from "../images/categories/beer.jpg";
import beer1 from "../images/categories/squarebeer.jpg";


import { IRequestItem } from "../../modules";

// socket
import { store } from "../../store";
import PageHeader from "../ui/pageheader";
import CategoryFilter from "../ui/categoryfilter";

interface IMenuProps {
  entireMenu: any,
  categories: any[],
  currentOrder: IRequestItem[],
  addToCurrentOrder: (itemid: number, itemName: string, currentPrice: number) => void,
}

interface IMenuState {
  searchBoxEntry: string,
  displayCategoryIndex: number,
  isItemDetailsOpen: { [key: string]: boolean },
  // chart data route?
  chartData: any;
}

class PureMenu extends React.Component<IMenuProps, IMenuState> {
  constructor(props: IMenuProps) {
    super(props);

    const tempisItemDetailsOpen = {};
    this.props.entireMenu.forEach((category: any, categoryIndex: any) => {
      category.items.forEach((item: any, itemIndex: any) => {
        const currentLoc = category.categoryName.toString().concat(itemIndex.toString());
        tempisItemDetailsOpen[`${currentLoc}`] = false;
      })
    });

    this.state = {
      searchBoxEntry: "",
      displayCategoryIndex: 0,
      isItemDetailsOpen: tempisItemDetailsOpen,

      chartData:
      {
        datasets: [
          {
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "rgba(235,87,87,1)",
            borderJoinStyle: "miter",
            data: [12, 13, 8, 16, 3, 46],
            fill: true,
            label: "hey",
            pointBackgroundColor: "rgba(111, 207, 151, 1)",
            pointBorderColor: "rgba(235, 87, 87, 1)",
            pointBorderWidth: 2,
            pointRadius: 3,
            strokeColor: "rgba(66, 66, 66, .4)"
          }
        ],
        labels: ["09:00", "", "", "", "", "Now"]
      }
    };
  }

  // price fluc. by socket.io, new price recieved in actions_orders
  // map state.entireMenu to props and comp will re-render when updated
  // F5 btn for testing
  public refreshPrice = () => {
    store.dispatch({ type: 'POST/buy', data: {} });
  }

  // switch category
  public previousCategory = () => {
    if (this.state.displayCategoryIndex - 1 < 0) {
      this.setState({ displayCategoryIndex: this.props.categories.length - 1 });
    } else {
      this.setState({ displayCategoryIndex: this.state.displayCategoryIndex - 1 });
    }
  }

  public nextCategory = () => {
    if (this.state.displayCategoryIndex + 1 >= this.props.categories.length) {
      this.setState({ displayCategoryIndex: 0 });
    } else {
      this.setState({ displayCategoryIndex: this.state.displayCategoryIndex + 1 });
    }
  }

  // toggle description box
  public isOpen = (locKey: string) => {
    const newMenuState = { ... this.state.isItemDetailsOpen };
    newMenuState[locKey] = !newMenuState[locKey];

    this.setState({
      isItemDetailsOpen: newMenuState,
    });
  };

  // search box
  public searching = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchBoxEntry: e.target.value.toLowerCase() });
  }

  // add to cart
  public addToCurrentOrder = (e: React.MouseEvent<HTMLDivElement>) => {
    const itemid = e.currentTarget.dataset.itemid;
    const itemName = e.currentTarget.dataset.itemname;    // dataset attr are all lowercase
    if (itemid !== undefined && itemName !== undefined) {
      const currentPrice = this.props.entireMenu[this.state.displayCategoryIndex].items.find((element: any) => (parseFloat(itemid) === element.items_id)).currentPrice;
      this.props.addToCurrentOrder(parseInt(itemid, 10), itemName, currentPrice);
    }
  }

  // TODO: to fix the next and Previous of the carousel
  public render() {
    // alert("render");
    return (
      <div className="page-content-container">
        <PageHeader header={"Menu"} subHeader={"Column A, or try column B"} />
        {/* Hard coding for now */}
        <CategoryFilter categories={["All", "Beer", "Cocktails", "Drinks"]} />

        {/* Category image */}
        <div className="rd-corner menu-display">
          <img src={beer} alt="" className="rd-corner display-img" />
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



        <MenuItem {...{
          key: this.props.entireMenu[0].items.find((e: any)=>(e.items_id===1)).items_id,
          itemName: this.props.entireMenu[0].items.find((e: any)=>(e.items_id===1)).itemName,
          price: this.props.entireMenu[0].items.find((e: any)=>(e.items_id===1)).currentPrice,
          priceDelta: 3.45,
          details: this.props.entireMenu[0].items.find((e: any)=>(e.items_id===1)).itemDescription,
          image: beer1,
          detailIsOpen: true,
          priceData: [
            {time: "9AM", purchasePrice: 23},
            {time: "", purchasePrice: 46},
            {time: "", purchasePrice: 75},
            {time: "", purchasePrice: 15},
            {time: "", purchasePrice: 75},
            {time: "", purchasePrice: 46},
            {time: "", purchasePrice: 83},
            {time: "", purchasePrice: 55},
            {time: "", purchasePrice: 41}
          ], 
          // openDetail: 
        }} />




        {/* render display from all > cat > search */}
        {this.props.entireMenu.map((category: any, categoryIndex: any) => (
          category.items.map((item: any, itemIndex: any) => (
            (
              /* v match searching */
              item.itemName.toLowerCase().search(this.state.searchBoxEntry) !== -1
              /* v match selected category */
              && category.categoryName === this.props.categories[this.state.displayCategoryIndex]
              /* v check stock > 0 */
              && item.itemStock > 0
            ) ?
              <div className="item-container">
                <Card
                  className={
                    !this.state.isItemDetailsOpen[category.categoryName.concat(itemIndex.toString())]
                      ? "item-cards"
                      : percentageChange(this.state.chartData.datasets[0].data[this.state.chartData.datasets[0].data.length - 1], this.state.chartData.datasets[0].data[0]) > 0

                        ? "item-cards item-price-up"
                        : "item-cards item-price-down"
                  }
                  interactive={true}
                  elevation={Elevation.FOUR}
                  onClick={this.isOpen.bind(this, category.categoryName.concat(itemIndex.toString()))}
                  key={`Card_${category.categoryName.concat(itemIndex.toString())}`}
                >
                  <div className="pricetag"
                    onClick={this.addToCurrentOrder}
                    data-itemid={item.items_id}
                    data-currentPrice={item.currentPrice}
                    data-itemname={item.itemName}>
                    <span>{item.itemName}</span>
                    {!this.state.isItemDetailsOpen[category.categoryName.concat(itemIndex.toString())] && <span>${item.currentPrice}</span>}
                  </div>

                  {!this.state.isItemDetailsOpen[category.categoryName.concat(itemIndex.toString())] ? <div className="arrow-container">
                    <img
                      className="arrow"
                      src={percentageChange(this.state.chartData.datasets[0].data[this.state.chartData.datasets[0].data.length - 1], this.state.chartData.datasets[0].data[0]) > 0 ? up : down}
                      alt=""
                    />
                  </div> : <span>${item.currentPrice}</span>}
                </Card>
                {/* ------------Seperate card and card details */}
                <Collapse
                  key={`Collapse_${category.categoryName.concat(itemIndex.toString())}`}
                  className={
                    "item-details" +
                    " " +
                    (this.state.isItemDetailsOpen[category.categoryName.concat(itemIndex.toString())] ? "item-detail-onflex" : "")
                  }
                  isOpen={this.state.isItemDetailsOpen[category.categoryName.concat(itemIndex.toString())]}
                >
                  <div className="description">
                    <p className="description-text">{item.itemDescription}</p>
                  </div>
                  <div className="chartVar">
                    <div className="variables">
                      <img
                        className="detail-arrow"
                        src={percentageChange(this.state.chartData.datasets[0].data[this.state.chartData.datasets[0].data.length - 1], this.state.chartData.datasets[0].data[0]) > 0 ? up : down}
                        alt=""
                      />
                      <span className="detail-percentage">{percentageChange(this.state.chartData.datasets[0].data[this.state.chartData.datasets[0].data.length - 1], this.state.chartData.datasets[0].data[0])}%</span>
                    </div>

                    <Line
                      width={80}
                      height={60}
                      data={item.chartData}
                      options={chartOption}
                    />
                  </div>
                </Collapse>
              </div> : <div />))
        ))}

        <Usermenu />
      </div>
    )
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    entireMenu: state.orders.entireMenu,
    categories: state.orders.categories,
    // priceMapping: state.orders.priceMapping,
    currentOrder: state.orders.currentOrder,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addToCurrentOrder: (itemid: number, name: string, currentPrice: number) => {
      dispatch(addToCurrentOrder(itemid, name, currentPrice));
    }
  }
}

const Menu = connect(mapStateToProps, mapDispatchToProps)(PureMenu);

export default Menu