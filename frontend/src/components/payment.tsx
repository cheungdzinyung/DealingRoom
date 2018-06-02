import * as React from "react";
import Usermenu from "../components/usermenu";
import Banner from './topbanner'

export default class Profile extends React.Component<{ header: string }> {
    constructor(props: { header: string }) {
        super(props);
    }
    public render() {
        return (

            <div className="userInterface">
                <Banner header="Payment" />
                <Usermenu />
            </div>
        );
    }
}
