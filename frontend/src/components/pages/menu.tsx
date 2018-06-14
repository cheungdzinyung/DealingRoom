// Importing modules from library
import * as React from "react";

// Import UI elements
import { Card, Collapse, Elevation } from "@blueprintjs/core";
import Carousel from 'nuka-carousel';
import { Line } from "react-chartjs-2";
import Usermenu from "../share/usermenu";

// Importing interfaces
import { IPureCategoryWithItem } from "../../modules";

// Importing helper function
import { percentageChange } from "../../util/utility"

// Importing replacable fake data
import { chartOption, menuItems } from "../../fakedata";

// Importing static assets
import down from "../../icons/down.svg";
import up from "../../icons/up.svg";
import beer from "../../images/categories/beer.jpg";
import cocktail from "../../images/categories/cocktails.jpg";
import whiskie from "../../images/categories/whiskie.jpg";

interface IPureMenuState {
  // displayCategory: string
  // displayMenu: IPureCategoryWithItem[]
  entireMenu: IPureCategoryWithItem[];
  isItemDetailsOpen: { [key: string]: boolean };
}

export default class PureMenu extends React.Component<{}, IPureMenuState> {
  constructor(props: {}) {
    super(props);

    const tempisItemDetailsOpen = {};
    menuItems.map((category, categoryIndex) => {
      category.items.map((item, itemIndex) => {
        const currentLoc = category.categoryName.toString().concat(itemIndex.toString());
        tempisItemDetailsOpen[`${currentLoc}`] = false;
      })
    })

    this.state = {
      // displayCategory: "beer",
      // displayMenu: menuItems.filter((category, index) => category.categoryName === this.state.displayCategory),
      entireMenu: menuItems,
      isItemDetailsOpen: tempisItemDetailsOpen
      
    };
  }
  // public switchCategory = () ={

  // }

  public isOpen = (locKey: string) => {
    const newMenuState = { ... this.state.isItemDetailsOpen };
    newMenuState[locKey] = !newMenuState[locKey];

    this.setState({
      isItemDetailsOpen: newMenuState
    });
  };

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
        />

        {this.state.entireMenu.map((category, categoryIndex) => (
          category.items.map((item, itemIndex) => (
            <div className="item-container">
              <Card
                className={
                  !this.state.isItemDetailsOpen[category.categoryName.concat(itemIndex.toString())]
                    ? "item-cards"
                    : percentageChange(item.chartData.datasets[0].data[item.chartData.datasets[0].data.length - 1], item.chartData.datasets[0].data[0]) > 0

                      ? "item-cards item-price-up"
                      : "item-cards item-price-down"
                }
                interactive={true}
                elevation={Elevation.FOUR}
                onClick={this.isOpen.bind(this, category.categoryName.concat(itemIndex.toString()))}
                key={category.categoryName.concat(itemIndex.toString())}
              >
                <div className="pricetag">
                  <span>{item.itemName}</span>
                  {!this.state.isItemDetailsOpen[category.categoryName.concat(itemIndex.toString())] && <span>${item.currentPrice}</span>}
                </div>

                {!this.state.isItemDetailsOpen[category.categoryName.concat(itemIndex.toString())] ? <div className="arrow-container">
                  <img
                    className="arrow"
                    src={percentageChange(item.chartData.datasets[0].data[item.chartData.datasets[0].data.length - 1], item.chartData.datasets[0].data[0]) > 0 ? up : down}
                    alt=""
                  />
                </div> : <span>${item.currentPrice}</span>}
              </Card>
              {/* ------------Seperate card and card details */}
              <Collapse
                key={category.categoryName.concat(itemIndex.toString())}
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
                      src={percentageChange(item.chartData.datasets[0].data[item.chartData.datasets[0].data.length - 1], item.chartData.datasets[0].data[0]) > 0 ? up : down}
                      alt=""
                    />
                    <span className="detail-percentage">{percentageChange(item.chartData.datasets[0].data[item.chartData.datasets[0].data.length - 1], item.chartData.datasets[0].data[0])}%</span>
                  </div>

                  <Line
                    width={80}
                    height={60}
                    data={item.chartData}
                    options={chartOption}
                  />
                </div>
              </Collapse>
            </div>))
        ))}

        <Usermenu />
      </div>
    );
  }
}
