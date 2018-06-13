// Importing modules from library
import * as React from "react";

// Import UI elements
// import { Card, Collapse, Elevation } from "@blueprintjs/core";
import Carousel from 'nuka-carousel';
// import { Line } from "react-chartjs-2";
import Usermenu from "../share/usermenu";

// Importing interfaces
import { IPureCategoryWithItem } from "../../modules";

// Importing helper function
// import { percentageChange } from "../../util/utility"

// Importing replacable fake data
import {  menuItems } from "../../fakedata";

// Importing static assets
// import down from "../../icons/down.svg";
// import up from "../../icons/up.svg";
import beer from "../../images/categories/beer.jpg";
import cocktail from "../../images/categories/cocktails.jpg";
import whiskie from "../../images/categories/whiskie.jpg";


interface IPureMenuState {
  items: IPureCategoryWithItem[];
  isItemDetailsOpen: boolean[];
}

export default class PureMenu extends React.Component<{}, IPureMenuState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isItemDetailsOpen: menuItems.map(data => false),
      items: menuItems
    };
  }

  public isOpen = (i: number) => {
    this.setState({
      isItemDetailsOpen: menuItems.map(
        (data, index) =>
          i === index
            ? !this.state.isItemDetailsOpen[index]
            : this.state.isItemDetailsOpen[index]
      )
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
       
        <Usermenu />
      </div>
    );
  }
}
