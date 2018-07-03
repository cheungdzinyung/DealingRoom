// Importing modules
import * as React from "react";

// Importing styling and static assets
import "./AdminStockNewItemCardDescription.scss";

interface IItemModalDescriptionProps {
  descriptionText?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default class ItemModalDescription extends React.Component<IItemModalDescriptionProps, {}> {
  constructor(props: IItemModalDescriptionProps) {
    super(props);
  }

  public render() {
    return (
      <div className="edit-item-description">
        <textarea value={this.props.descriptionText} onChange={this.props.onChange} />
      </div>
    );
  }
}     
