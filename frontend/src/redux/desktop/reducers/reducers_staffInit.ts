import {
    StaffInitActions,
    CHANGE_PAGE,
    REDIRECT_PAGE,
    RESET_TARGET_PAGE,
    LOCAL_LOGIN_SUCCESS,
    LOCAL_LOGIN_FAIL,
    // GET_USER_PROFILE_BY_USER_TOKEN_SUCCESS,
    // GET_USER_PROFILE_BY_USER_TOKEN_FAIL,
    // GET_ENTIRE_MENU_SUCCESS,
    // GET_ENTIRE_MENU_FAIL,
    // GET_ALL_ORDERS_SUCCESS,
    // GET_ALL_ORDERS_FAIL,
    // SOCKET_CONNECT_SUCCESS,
    // SOCKET_UPDATE_ORDER_LIST,
} from "../actions/actions_staffInit";

// import {
//     IOrderListStaff,
//     IUserProfile,
//     IMenuCategoryWithoutFlux
// } from "src/modules";

export interface IStaffInitState {
    // socket.io on load? isAuth?
    socketID: string,
    socketData: any,
    // init
    // redir
    isAuth: boolean,
    currentPage: string,
    redirectTarget: string,
    // // user profile
    // userProfile: IUserProfile,
    // userProfileReady: boolean,
    // // menu
    // entireMenu: IMenuCategoryWithoutFlux[],
    // categories: string[],
    // menuReady: boolean,
    // // all orders
    // allOrdersReady: boolean,
    // allOrders: IOrderListStaff[],
    // err msg
    staffAPIErr: string,
}

const initialState: IStaffInitState = {
    socketID: "",
    socketData: {},
    // role: "staff",
    isAuth: false,              // wrong after F5
    currentPage: "profile",
    redirectTarget: "none",     // for redir
    // // user profile
    // userProfile: {
    //     users_id: 0,
    //     username: "string",
    //     password: "string",
    //     displayName: "string",
    //     userPhoto: "string",
    //     role: "string",
    // },
    // userProfileReady: false,
    // // menu
    // entireMenu: [],
    // categories: [],
    // menuReady: false,
    // // all orders
    // allOrdersReady: false,
    // allOrders: [{
    //     "orders_id": 0,
    //     "users_id": 0,
    //     "displayName": "nobody",
    //     "table": 0,
    //     "status": "confirmed",
    //     "isPaid": false,
    //     "order": [{
    //         "itemName": "Corona",
    //         "ice": "normal",
    //         "sweetness": "normal",
    //         "garnish": "normal",
    //         "purchasePrice": "60.00"
    //     }, {
    //         "itemName": "Asahi",
    //         "ice": "normal",
    //         "sweetness": "normal",
    //         "garnish": "normal",
    //         "purchasePrice": "60.00"
    //     }]
    // }],
    staffAPIErr: "none",
}

export const staffInitReducer = (state: IStaffInitState = initialState, action: StaffInitActions): IStaffInitState => {
    switch (action.type) {
        case CHANGE_PAGE: {
            return { ...state, currentPage: action.currentPage };
        }
        case REDIRECT_PAGE: {
            action.history.push(`${action.redirectTarget}`);
            return { ...state, redirectTarget: action.redirectTarget };
        }
        case RESET_TARGET_PAGE: {
            return { ...state, redirectTarget: "none" };
        }
        case LOCAL_LOGIN_SUCCESS: {
            localStorage.setItem("dealingRoomToken", action.userInfoPackage.token);
            return { ...state, isAuth: true, staffAPIErr: "none" };
        }
        case LOCAL_LOGIN_FAIL: {
            return { ...state, staffAPIErr: action.errMsg };
        }
        // case GET_USER_PROFILE_BY_USER_TOKEN_SUCCESS: {
        //     return { ...state, userProfile: action.userProfile, userProfileReady: true, staffAPIErr: "none" };
        // }
        // case GET_USER_PROFILE_BY_USER_TOKEN_FAIL: {
        //     return { ...state, staffAPIErr: "GET_USER_PROFILE_BY_USER_TOKEN_FAIL" };
        // }
        // case GET_ALL_ORDERS_SUCCESS: {
        //     return { ...state, allOrdersReady: true, allOrders: action.allOrders };
        // }
        // case GET_ENTIRE_MENU_SUCCESS: {
        //     const categories = action.entireMenu.map((category: any) => (category.categoryName));
        //     return { ...state, entireMenu: action.entireMenu, categories, menuReady: true };
        // }
        // case GET_ENTIRE_MENU_FAIL: {
        //     return state;
        // }
        // case GET_ALL_ORDERS_FAIL: {
        //     return { ...state, staffAPIErr: "GET_ALL_ORDERS_FAIL" };
        // }
        // case SOCKET_CONNECT_SUCCESS: {
        //     return { ...state, socketID: action.socketID };
        // }
        // case SOCKET_UPDATE_ORDER_LIST: {
        //     // alert(JSON.stringify(action.allOrders))
        //     return { ...state, allOrders: action.allOrders };
        // }
        default: {
            return state;
        }
    }
}