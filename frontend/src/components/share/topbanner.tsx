import * as React from "react";

interface IBannerProps{
    header: string;
    image: any;
}

export default class Banner extends React.Component<IBannerProps>{
    constructor(props: IBannerProps){
    super(props);
  }
    public render() {
        return (
            <div className="topbanner">
                <img src={this.props.image} alt="" />
                <h2>{this.props.header}</h2>
            </div>
        );
    }
}
