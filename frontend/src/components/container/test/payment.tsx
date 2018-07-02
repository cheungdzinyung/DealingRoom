// // import { FormGroup } from "@blueprintjs/core";
// import * as React from "react";
// // import ReactScriptLoaderMixin from 'react-script-loader';

// // Component import
// import Usermenu from "../../ui/mobile/usermenu";
// import PageHeader from "src/components/ui/mobile/pageheader";
// import MySrtipeComponent from "./myStripeComponent";

// // import redux and friends
// import { connect } from "react-redux";
// import { IRootState } from "../../../redux/store";
// // import { removeFromCurrentOrder, confirmOrder } from "../../../redux/mobile/actions/actions_orders";

// // Importing interfaces
// // import { ICustomerOrderList } from "../../../modules";

// import * as History from "history";
// import { withRouter } from "react-router";


// interface IPurePaymentProps {
//     paymentTargetId: number,
//     totalAmount: number,
//     userName: string,

//     history: History.History,
// }

// interface IPurePaymentState {
//     // userName is specified by stripe, using display name here
//     userName: string,
//     orderId: number,
//     amount: number,
// }

// class PurePayment extends React.Component<IPurePaymentProps, IPurePaymentState> {
//     constructor(props: IPurePaymentProps) {
//         super(props);

//         this.state = {
//             userName: "",
//             orderId: 0,
//             amount: 0,
//         }
//     }

//     public componentDidMount() {
//         this.setState({
//             userName: this.props.userName,
//             orderId: this.props.paymentTargetId,
//             amount: this.props.totalAmount,
//         });
//     }
    
//     public render() {
//         return (
//             <div className="page-content-container">
//                 <PageHeader header={`Order # ${this.props.paymentTargetId}`} subHeader={`Order Total $${this.props.totalAmount} `} />
//                     <br />
//                     <MySrtipeComponent paymentInfo={this.state} history={this.props.history}/>
//                 <Usermenu />
//             </div>
//         );
//     }
// }

// const mapStateToProps = (state: IRootState) => {
//     return {
//         paymentTargetId: state.customer.payment.paymentTargetId,
//         totalAmount: state.customer.payment.totalAmount,
//         userName: state.customer.user.userProfile.displayName,
//     }
// }

// const mapDispatchToProps = (dispatch: any) => {
//     return {}
// }


// const Payment = connect(mapStateToProps, mapDispatchToProps)(PurePayment);

// export default withRouter(Payment as any);