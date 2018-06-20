// Importing modules from library
import * as React from "react";

// redux
import { connect } from "react-redux";
import { IRootState } from "../reducers/index";
// import { getEntireMenu } from "../actions/actions_orders";
import { getEntireMenu, getOrdersByUserid } from "../actions/actions_orders";
import { getUserProfileByUserid } from "../actions/actions_user";

// for redir
import * as History from "history";

interface IInitializeProps {
    // handling redirect
    history: History.History,
    // init
    user_id: number,

    getEntireMenu: () => void,
    menuReady: boolean,

    userProfile: any,
    getUserProfileByUserid: (userID: number) => void,
    userProfileReady: boolean,
    
    getOrdersByUserid: (userID: number) => void,
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
        this.props.getUserProfileByUserid(this.props.user_id);
        // fetch ordersList (or not?)
        this.props.getOrdersByUserid(this.props.user_id);
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
        user_id: state.user.user_id,
        menuReady: state.orders.menuReady,
        userProfileReady: state.user.userProfileReady,
        orderListReady: state.orders.orderListReady,
        userProfile: state.user.userProfile,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getEntireMenu: () => {
            dispatch(getEntireMenu());
        },
        getUserProfileByUserid: (userID: number) => {
            dispatch(getUserProfileByUserid(userID));
        },
        getOrdersByUserid: (userID: number) => {
            dispatch(getOrdersByUserid(userID));
        },
    }
}

const Initialize = connect(mapStateToProps, mapDispatchToProps)(PureInitialize);

export default Initialize;
