// Importing modules from library
import * as React from "react";

// redux
import { connect } from "react-redux";
import { IRootState } from "../reducers/index";
import { getEntireMenu } from "../actions/actions_orders";
// import { getEntireMenu, getOrdersByUserid } from "../actions/actions_orders";
// import { getUserProfileByUserid } from "../actions/actions_user";

// for redir
import * as History from "history";

interface IInitializeProps {
    // handling redirect
    history: History.History,
    // init
    getEntireMenu: () => void,
    menuReady: boolean,
    // getUserProfileByUserid: (userID: number) => void,
    userProfileReady: boolean,
    // getOrdersByUserid: (userID: number) => void,
    orderListReady: boolean,
}

// interface IInitializeState {

// }

class PureInitialize extends React.Component<IInitializeProps, {}> {
    constructor(props: IInitializeProps) {
        super(props)
    }

    public componentDidMount() {
        // fetch entireMenu , set categories[]
        this.props.getEntireMenu();
        // fetch user data
        // this.props.getUserProfileByUserid(1);
        // fetch ordersList (or not?)
        // this.props.getOrdersByUserid(1);
    }

    public componentDidUpdate() {
        if (this.props.menuReady) {
            this.props.history.push("/menu");
        }
    }

    public render() {
        return (
            <div />
        )
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        menuReady: state.orders.menuReady,
        userProfileReady: state.user.userProfileReady,
        orderListReady: state.orders.orderListReady,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getEntireMenu: () => {
            dispatch(getEntireMenu());
        },
        // getUserProfileByUserid: (userID: number) => {
        //     dispatch(getUserProfileByUserid(userID));
        // },
        // getOrdersByUserid: (userID: number) => {
        //     dispatch(getOrdersByUserid(userID));
        // },
    }
}

const Initialize = connect(mapStateToProps, mapDispatchToProps)(PureInitialize);

export default Initialize;
