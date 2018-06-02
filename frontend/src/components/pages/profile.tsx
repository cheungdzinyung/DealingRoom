import * as React from "react";
import Banner from '../share/topbanner'
import Usermenu from "../share/usermenu";

import tempImg from '../../images/circle-head.png';

export default class Profile extends React.Component<{ header: string }> {
  constructor(props:{header: string}){
    super(props);
  }
  public render() {
    return (

      <div className="userInterface">
        <Banner header="Profile" image={tempImg}/>
        <Usermenu />
      </div>
    );
  }
}
