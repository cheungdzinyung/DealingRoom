// Importing modules
import * as React from "react";

// Importing UI elements
import { Dialog, Button } from "@blueprintjs/core";

// Importing Interfaces
// import { IMenuItemWithoutFlux } from "src/modules";

// Importing utility function

// import { firstLetterCaps } from "../../../util/utility";

// Importing static image assets

// Importing temp fake images

interface IStockItemDialogProps {
  isEditMenuOpen: boolean;
}

export default class StockItemDialog extends React.Component<
  IStockItemDialogProps,
  {}
> {
  constructor(props: IStockItemDialogProps) {
    super(props);
  }




  public render() {
    return (
      <Dialog
        icon="inbox"
        isOpen={this.props.isEditMenuOpen}
        
        title="Dialog header"
      >
        <div className="pt-dialog-body">Some content</div>
        <div className="pt-dialog-footer">
          <div className="pt-dialog-footer-actions">
            <Button text="Secondary" />
          </div>
        </div>
      </Dialog>
    );
  }
}

// 24, June: Harrison, the comment functions are now in stockadditemcoard.tsx

// I am just a pretty little filler

// public setCategory (e: React.MouseEvent<HTMLButtonElement>) {
//     this.setState ({
//         category: e.currentTarget.value
//     });
// }

// public setItemName (e: React.ChangeEvent<HTMLInputElement>) {
//     this.setState ({
//         itemName: e.target.value
//     });
// }

// public setItemDescription (e: React.ChangeEvent<HTMLInputElement>) {
//     this.setState ({
//         itemDescription: e.target.value
//     });
// }

// // need to parseFloat() when send to BE
// public setItemMinPrice (e: React.ChangeEvent<HTMLInputElement>) {
//     this.setState ({
//         itemDescription: e.target.value
//     });
// }

// // need to parseFloat() when send to BE
// public setItemStartPrice (e: React.ChangeEvent<HTMLInputElement>) {
//     this.setState ({
//         itemDescription: e.target.value
//     });
// }

// // need to parseInt() when send to BE
// public setItemQuantity (e: React.ChangeEvent<HTMLInputElement>) {
//     this.setState ({
//         itemDescription: e.target.value
//     });
// }

// public toggleActive () {
//     this.setState ({
//         isActive: !this.state.isActive
//     });
// }

// public toggleSpecial () {
//     this.setState ({
//         isSpecial: !this.state.isSpecial
//     });
// }
