// Importing modules from library
import * as React from "react";

// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { getEntireMenu, getOrdersByUserToken } from "../../../redux/mobile/actions/actions_orders";
import { getUserProfileByUserToken } from "../../../redux/mobile/actions/actions_user";

// for redir
import * as History from "history";

interface IInitializeProps {
    // handling redirect
    history: History.History,
    // init
    isAuth: boolean,

    getEntireMenu: () => void,
    menuReady: boolean,
    getOrdersByUserToken: () => void,
    orderListReady: boolean,
    orderAPIErr: string,

    userProfile: any,
    getUserProfileByUserToken: () => void,
    userProfileReady: boolean,
    userAPIErr: string,
}

class PureInitialize extends React.Component<IInitializeProps, {}> {
    constructor(props: IInitializeProps) {
        super(props)
    }

    public componentDidMount() {
        // fetch entireMenu , set categories[]
        this.props.getEntireMenu();
        // fetch ordersList
        this.props.getOrdersByUserToken();
        // fetch user data
        this.props.getUserProfileByUserToken();
    }

    public componentDidUpdate() {
        if (this.props.orderAPIErr === "GET_ENTIRE_MENU_FAIL") {
            this.props.getEntireMenu();
        }
        if (this.props.orderAPIErr === "GET_ORDERS_BY_USER_TOKEN_FAIL") {
            this.props.getOrdersByUserToken();
        }
        if (this.props.userAPIErr === "GET_USER_PROFILE_BY_USER_TOKEN_FAIL") {
            this.props.getUserProfileByUserToken();
        }
        if (this.props.menuReady && this.props.userProfileReady && this.props.orderListReady) {
            this.props.history.push("/menu");
        }
    }

    public render() {
        return (
            <div className="order-header-container">
                <h3 className="order-header">Loading ...</h3>
                <h3 className="order-header">Please Wait ...</h3>
            </div>
        )
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        isAuth: state.customer.user.isAuth,
        menuReady: state.customer.orders.menuReady,
        userProfileReady: state.customer.user.userProfileReady,
        orderListReady: state.customer.orders.orderListReady,
        userProfile: state.customer.user.userProfile,
        userAPIErr: state.customer.user.userAPIErr,
        orderAPIErr: state.customer.orders.orderAPIErr,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getEntireMenu: () => {
            dispatch(getEntireMenu());
        },
        getUserProfileByUserToken: () => {
            dispatch(getUserProfileByUserToken());
        },
        getOrdersByUserToken: () => {
            dispatch(getOrdersByUserToken());
        },
    }
}

const Initialize = connect(mapStateToProps, mapDispatchToProps)(PureInitialize);

export default Initialize;
