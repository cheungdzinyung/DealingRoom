// Importing modules
import * as React from "react";

// Importing styling and static assets
import "./AdminStockNewItemCardImage.scss";

// import squareBeer from "src/Components/assets/images/categories/squarebeer.jpg";

interface ItemModalImageProps {
  imageSrc: string
}

export default class ItemModalImage extends React.Component<ItemModalImageProps> {
  constructor(props: ItemModalImageProps) {
    super(props)
  }

  public render() {
    return (
      <div className="edit-item-info">
        <img src={this.props.imageSrc} alt="" className="edit-item-info-img item-image-box" />
      </div>
    );
  }
}
