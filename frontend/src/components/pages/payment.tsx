import * as React from "react";
import Banner from '../share/topbanner'
import Usermenu from "../share/usermenu";

import Paypal from '../images/payment/stripe.png'

interface IProfileProps {
    paymentMethods: string[];
}

export default class Profile extends React.Component<IProfileProps> {
    constructor(props: IProfileProps) {
        super(props);

        this.state = {  }
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
