// Importing modules from library
import { Card, Collapse, Elevation } from "@blueprintjs/core";
import * as React from "react";
import { Line } from "react-chartjs-2";

// redux
import { connect } from "react-redux";
import { IRootState } from "../reducers/index";
import { addToCurrentOrder } from "../actions/actions_orders";

import Carousel from 'nuka-carousel';

// Importing components from src
import Usermenu from "../share/usermenu";

// Importing replacable fake data
import { chartData, chartOption, items } from "../../fakedata";

// Importing static assets
import down from "../../icons/down.svg";
import up from "../../icons/up.svg";
import beer from "../../images/categories/beer.jpg";
import cocktail from "../../images/categories/cocktails.jpg";
import whiskie from "../../images/categories/whiskie.jpg";

interface IItem {
  thisItemID: string,
  uniqueID: string,
  itemName: string,
  ice: string,
  sweetness: string,
  garnish: string,
  purchasePrice: number,
}

// interface IOrder {
//   userID: string,
//   table: string,
//   status: string,
//   item: IItem[],
// }

interface IPureMenuItem {
  uniqueID: string;
  name: string;
  currentPrice: number;
  percentage: number;
  description: string;
}

interface IMenuState {
  items: IPureMenuItem[];
  isItemDetailsOpen: boolean[];
  searchBoxEntry: string;
}

interface IMenuProps {
  currentOrder: IItem[];
  addToCurrentOrder: (uniqueID: string, itemName: string) => void;
}

class PureMenu extends React.Component<IMenuProps, IMenuState> {
  constructor(props: IMenuProps) {
    super(props);

    this.state = {
      items,
      isItemDetailsOpen: items.map(data => false),
      searchBoxEntry: "",
    };
  }

  public isOpen = (i: number) => {
    this.setState({
      isItemDetailsOpen: items.map(
        (data, index) =>
          i === index
            ? !this.state.isItemDetailsOpen[index]
            : this.state.isItemDetailsOpen[index]
      )
    });
  };

  public searching = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchBoxEntry: e.target.value.toLowerCase() });
  }

  public addToCurrentOrder = (e: React.MouseEvent<HTMLDivElement>) => {
    const uniqueID = e.currentTarget.dataset.uniqueid;
    const name = e.currentTarget.dataset.name;
    if (uniqueID !== undefined && name !== undefined) {
      this.props.addToCurrentOrder(uniqueID, name);
    }
  }

  // TODO: to fix the next and Previous of the carousel

  public render() {
    return (
      <div className="page-content-container">
        {/* FIXME: the carousel won't load image when rendering other element first and coming back with it */}

        <Carousel initialSlideHeight={166} slideIndex={0} className="image-roll" wrapAround={true}>
          <img src={beer} alt="" />
          <img src={whiskie} alt="" />
          <img src={cocktail} alt="" />
          <img src={beer} alt="" />
          <img src={whiskie} alt="" />
          <img src={cocktail} alt="" />
        </ Carousel>


        <input
          className="pt-input searchbar"
          type="text"
          placeholder="Search input"
          dir="auto"
          value={this.state.searchBoxEntry}
          onChange={this.searching}
        />

        {/* v cat filter for later use */}
        {/* {this.state.items.filter(item => item.category === this.state.category).map((item, i) => ( */}
        {this.state.items.map((item, i) => (
          (item.name.toLowerCase().search(this.state.searchBoxEntry) !== -1) ?
            <div className="item-container">
              <Card
                className={
                  !this.state.isItemDetailsOpen[i]
                    ? "item-cards"
                    : item.percentage > 0
                      ? "item-cards item-price-up"
                      : "item-cards item-price-down"
                }
                interactive={true}
                elevation={Elevation.FOUR}
                onClick={this.isOpen.bind(this, i)}
                key={`Card_${i}`}
              >
                <div className="pricetag"
                  onClick={this.addToCurrentOrder}
                  data-uniqueid={item.uniqueID}
                  data-name={item.name}>
                  <span>{item.name}</span>
                  {!this.state.isItemDetailsOpen[i] && <span>${item.currentPrice}</span>}
                </div>

                {!this.state.isItemDetailsOpen[i] ? <div className="arrow-container">
                  <img
                    className="arrow"
                    src={item.percentage > 0 ? up : down}
                    alt=""
                  />
                </div> : <span>${item.currentPrice}</span>}
              </Card>
              {/* ------------Seperate card and card details */}
              <Collapse
                key={`Collapse_${i}`}
                className={
                  "item-details" +
                  " " +
                  (this.state.isItemDetailsOpen[i] ? "item-detail-onflex" : "")
                }
                isOpen={this.state.isItemDetailsOpen[i]}
              >
                <div className="description">
                  <p className="description-text">{item.description}</p>
                </div>
                <div className="chartVar">
                  <div className="variables">
                    <img
                      className="detail-arrow"
                      src={item.percentage > 0 ? up : down}
                      alt=""
                    />
                    <span className="detail-percentage">{item.percentage}%</span>
                  </div>

                  <Line
                    width={80}
                    height={60}
                    data={chartData}
                    options={chartOption}
                  />
                </div>
              </Collapse>
            </div> :
            <div />
        ))}
        <Usermenu />
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    currentOrder: state.orders.currentOrder,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addToCurrentOrder: (uniqueID: string, name: string) => {
      dispatch(addToCurrentOrder(uniqueID, name));
    }
  }
}

const Menu = connect(mapStateToProps, mapDispatchToProps)(PureMenu);

export default Menu