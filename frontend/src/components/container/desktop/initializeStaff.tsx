// Importing modules from library
import * as React from "react";

// redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
// import {
//     getEntireMenu,
//     getUserProfileByUserToken,
//     getAllOrders
// } from "../../../redux/desktop/actions/actions_staffInit";
import { getUserProfileByUserToken } from "../../../redux/mobile/actions/actions_user";
import { getAllOrders } from "../../../redux/desktop/actions/actions_bartender";
import { getEntireMenu } from "../../../redux/desktop/actions/actions_manager";

// for redir
import * as History from "history";

interface IInitializeProps {
    // handling redirect
    history: History.History,
    // init
    isAuth: boolean,

    getEntireMenu: () => void,
    menuReady: boolean,

    allOrders: any,
    allOrdersReady: boolean,
    getAllOrders: () => void,

    userProfile: any,
    getUserProfileByUserToken: () => void,
    userProfileReady: boolean,
    staffAPIErr: string,
}

class PureInitialize extends React.Component<IInitializeProps, {}> {
    constructor(props: IInitializeProps) {
        super(props)
    }

    public componentDidMount() {
        if (localStorage.getItem("dealingRoomToken")) {
            // fetch entireMenu , set categories[]
            this.props.getEntireMenu();
            // fetch ordersList
            this.props.getAllOrders();
            // fetch user data
            this.props.getUserProfileByUserToken();
        }
    }

    public componentDidUpdate() {
        if (this.props.staffAPIErr === "GET_ENTIRE_MENU_FAIL") {
            this.props.getEntireMenu();
        }
        if (this.props.staffAPIErr === "GET_ORDERS_BY_USER_TOKEN_FAIL") {
            this.props.getAllOrders();
        }
        if (this.props.staffAPIErr === "GET_USER_PROFILE_BY_USER_TOKEN_FAIL") {
            this.props.getUserProfileByUserToken();
        }
        if (this.props.menuReady && this.props.userProfileReady && this.props.allOrdersReady && this.props.userProfile.role !== "customer") {
            this.props.history.push("/admin/pendingorders");
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
        isAuth: state.staff.staffInit.isAuth,
        menuReady: state.staff.manager.menuReady,
        userProfileReady: state.customer.user.userProfileReady,
        userProfile: state.customer.user.userProfile,
        allOrders: state.staff.bartender.allOrders,
        allOrdersReady: state.staff.bartender.allOrdersReady,
        staffAPIErr: state.staff.staffInit.staffAPIErr,
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
        getAllOrders: () => {
            dispatch(getAllOrders());
        },
    }
}

const Initialize = connect(mapStateToProps, mapDispatchToProps)(PureInitialize);

export default Initialize;
