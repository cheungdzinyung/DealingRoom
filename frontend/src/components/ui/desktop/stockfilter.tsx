import * as React from "react";


export default class StockFilter extends React.Component {
    constructor(props: {}) {
        super(props)
    }

    public render() {
        return (
            <div className="filter-container">
                <span className="filter-header">Filters</span>
                <div className="filter-line">
                    <span className="filter-subheader">Categories</span>
                    <div className="pt-select">
                        <select >
                            <option selected={true}>All</option>
                            <option value="beer">Beer</option>
                            <option value="cocktail">Cocktail</option>
                            <option value="redWine">Red Wine</option>
                            {/* <option value="whiteWine"></option>
                            <option value="champagne"></option>
                            <option value="vodka"></option>
                            <option value="tequila"></option>
                            <option value="whiskey"></option>
                            <option value="gin"></option>
                            <option value="rum"></option>
                            <option value="brandy"></option>
                            <option value="non-alcoholic"></option>
                            <option value="snack"></option> */}

                        </select>
                    </div>
                </div>
                <div className="filter-line">
                    <span className="filter-subheader">Activies</span>
                    <div className="pt-select">
                        <select >
                            <option selected={true}>Choose an item...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            <option value="4">Four</option>
                        </select>
                    </div>
                </div>
                <div className="filter-line">
                    <span className="filter-subheader">Specials</span>
                    <div className="pt-select">
                        <select >
                            <option selected={true}>Choose an item...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            <option value="4">Four</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}