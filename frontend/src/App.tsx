import * as React from "react";
import "./scss/App.scss";

// Importing desktop containers
import MobileRoutes from "src/components/routes/mobile";
import DisplayRoutes from "src/components/routes/display";
import DesktopRoutes from "src/components/routes/desktop";
import HomepageRoutes from "src/components/routes/homepage";

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
