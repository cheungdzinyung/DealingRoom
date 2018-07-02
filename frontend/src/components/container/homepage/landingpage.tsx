import * as React from "react";

// import "font-awesome/css/font-awesome.css";

import { FooterComponent } from "src/components/container/homepage/FooterComponent/FooterComponent";
import { SocialComponent } from "src/components/container/homepage/SocialComponent/SocialComponent";
import { HowItWorksComponent } from "src/components/container/homepage/HowItWorksComponent/HowItWorksComponent";
import { FeaturesComponent } from "src/components/container/homepage/FeaturesComponent/FeaturesComponent";
import { DiscoverComponent } from "src/components/container/homepage/DiscoverComponent/DiscoverComponent";
import { HeroComponent } from "src/components/container/homepage/HeroComponent/HeroComponent";
// import NavBarComponent from "src/components/container/homepage/NavBarComponent/NavBarComponent";

export class LandingPage extends React.Component<{}, { navBarShrink: string }> {
  constructor(props: { navBarShrink: string }) {
    super(props);
    this.state = { navBarShrink: "" };
    this.handleScroll = this.handleScroll.bind(this);
  }

  public componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll(this);
  }

  public componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  public handleScroll(e: any) {
    const nbs = window.pageYOffset > 100 ? "navbar-shrink" : "";
    this.setState({ navBarShrink: nbs });
  }

  public render() {
    // const nbs = this.state ? this.state.navBarShrink : "";
    return (
      <div>
        {/* <NavBarComponent navBarShrink={nbs} /> */}
        <HeroComponent />
        <HowItWorksComponent />
        <FeaturesComponent />
        <DiscoverComponent />
        <SocialComponent />
        <FooterComponent />
      </div>
    );
  }
}
