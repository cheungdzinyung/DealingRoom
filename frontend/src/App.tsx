import * as React from "react";
import "./scss/App.scss";

// Importing desktop containers
import MobileRoutes from "src/routes/mobile";
import DisplayRoutes from "src/routes/display";
import DesktopRoutes from "src/routes/desktop";
import LandingPageRoutes from "src/routes/landingPage"
export default class App extends React.Component {
  public render() {
    return (
      <div>
        <MobileRoutes />
        <DesktopRoutes />
        <DisplayRoutes />
        <LandingPageRoutes />
      </div>
    );
  }
}
