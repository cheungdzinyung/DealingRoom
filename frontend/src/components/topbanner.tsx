import * as React from "react";
import tempImg from '../images/circle-head.png';

interface IBannerProps{
    header: string;
}

export default class Banner extends React.Component<IBannerProps>{
    constructor(props: IBannerProps){
    super(props);
  }
    public render() {
        return (
            <div className="topbanner">
                <img src={tempImg} alt="" />
                <h2>{this.props.header}</h2>
            </div>
        );
    }
}
