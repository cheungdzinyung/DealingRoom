import * as React from "react";

export default class StockFilter extends React.Component {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div className="filter-container">
        <div className="filter-content-wrapper">
          <span className="filter-header">Filters</span>
          <div className="filter-line">
            <span className="filter-subheader">Categories</span>
            <div className="filter-select-box">
              <select className="filter-select rd-corner">
                <option value="all" selected={true}>
                  All
                </option>
                <option value="beer">Beer</option>
                <option value="cocktail">Cocktail</option>
                <option value="redWine">Red Wine</option>
                <option value="whiteWine">White Wine</option>
                <option value="champagne">Champagne</option>
                <option value="vodka">Vodka</option>
                <option value="tequila">Tequila</option>
                <option value="whiskey">Whiskey</option>
                <option value="gin">Gin</option>
                <option value="rum">Rum</option>
                <option value="brandy">Brandy</option>
                <option value="non-alcoholic">Non-alcoholic</option>
                <option value="snack">Snack</option>
                <option value="main">Main</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>
          </div>
          <div className="filter-line">
            <span className="filter-subheader">Activies</span>
            <div className="filter-select-box">
              <select className="filter-select rd-corner">
                <option value="all" selected={true}>
                  All
                </option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>
          <div className="filter-line">
            <span className="filter-subheader">Specials</span>
            <div className="filter-select-box">
              <select className="filter-select rd-corner">
                <option value="all" selected={true}>
                  All
                </option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// public filterByCategory(e: React.MouseEvent<HTMLButtonElement>) {
//     this.setState({
//         category: e.currentTarget.value
//     });
// }

// public filterByActive(e: React.MouseEvent<HTMLButtonElement>) {
//     let choice: ActiveSpecialFilter;
//     if (e.currentTarget.value === "not active") {
//         choice = false
//     } else if (e.currentTarget.value === "active") {
//         choice = true;
//     } else {
//         choice = "all";
//     }
//     this.setState({
//         isActive: choice
//     });
// }

// public filterBySpecial(e: React.MouseEvent<HTMLButtonElement>) {
//     let choice: ActiveSpecialFilter;
//     if (e.currentTarget.value === "not active") {
//         choice = false
//     } else if (e.currentTarget.value === "active") {
//         choice = true;
//     } else {
//         choice = "all";
//     }
//     this.setState({
//         isSpecial: choice
//     });
// }
