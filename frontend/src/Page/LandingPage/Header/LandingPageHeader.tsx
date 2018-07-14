// Importing modules from library
import * as React from "react";
// Importing styling and static assets
// Importing presentation components
// Importing assisting utility functions
// Importing interfaces from module

// States and Props
interface ILandingPageHeaderProps {
    backgroundImage: "*.png";
}

// Component
export default class LandingPageHeader extends React.Component<ILandingPageHeaderProps> {
    constructor(props: ILandingPageHeaderProps) {
        super(props);
    }

    public render() {
        return (
            <header className="" id="home">
                <div className="container mt-5">
                    <h1>Dealing Room</h1>
                    <p className="tagline">
                        The only scalable web-based POS to your bar/restaurant for your slow moving
                        stock and lack of upsale opportunities problem.
          </p>
                </div>
                <div className="img-holder mt-3">
                    <img src={this.props.backgroundImage} alt="phone" className="img-fluid" />
                </div>
            </header>
        );
    }
}

