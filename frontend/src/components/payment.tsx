import * as React from "react";
import Usermenu from "../components/usermenu";
import Banner from './topbanner'

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
                <img src={Paypal} alt=""/>
                <Usermenu />
            </div>
        );
    }
}
