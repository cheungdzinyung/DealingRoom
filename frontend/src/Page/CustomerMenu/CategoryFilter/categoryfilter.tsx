import * as React from "react";
// Importing styling and static assets
import "./CustomerMenuCategoryFilter.scss";

interface ICategoryFilterProps {
    categories: string[];
}

export default class CategoryFilter extends React.Component<ICategoryFilterProps>{
    constructor(props: ICategoryFilterProps) {
        super(props);
    }
    public render() {
        return (
            <div className="categories-filter">
                {this.props.categories.map((cat, index) => (
                    <div key={index} className="category">
                        <span className="category-text">{cat}
                        </span>
                    </div>
                ))
                }
            </div>
        );
    }
}
