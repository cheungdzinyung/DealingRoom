// Importing modules
import * as React from "react";

// Importing UI elements
import UserMenu from "../../ui/mobile/usermenu";

export default class PureProfile extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);

    this.state = {

    }
  }

  public render() {
    return (
      <div className="page-content-container">
        <UserMenu />
      </div>
    );
  }
}
