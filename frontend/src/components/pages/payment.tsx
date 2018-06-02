import * as React from "react";
import Banner from '../share/topbanner'
import Usermenu from "../share/usermenu";

export default class Profile extends React.Component<{ header: string }> {
    constructor(props: { header: string }) {
        super(props);
    }
    public render() {
        return (

            <div className="userInterface">
                <Banner header="Payment" />
                <div className="page-container">
                <img src="" alt="" className="payment"/>
                </div>
                <Usermenu />
            </div>
        );
    }
}
