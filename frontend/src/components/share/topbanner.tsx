import * as React from "react";

interface IBannerProps{
    header: string;
    image: any;
}

export default class TopBanner extends React.Component<IBannerProps>{
    constructor(props: IBannerProps){
    super(props);
  }
    public render() {
        return (
            <div className="topbanner">
                <img className="banner-icon" src={this.props.image} alt="" />
                <h2 className="banner-header">{this.props.header}</h2>
            </div>
        );
    }
}
