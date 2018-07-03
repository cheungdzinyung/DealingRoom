import * as React from "react";
import "./scss/App.scss";

// Importing desktop containers
import MobileRoutes from "src/routes/mobile";
import DisplayRoutes from "src/routes/display";
import DesktopRoutes from "src/routes/desktop";
import HomepageRoutes from "src/routes/homepage";

export default class App extends React.Component {
  public render() {
    return (
      <div className="full-page">
        <HomepageRoutes />
        <MobileRoutes />
        <DesktopRoutes />
        <DisplayRoutes />
      </div>
    );
  }
}
