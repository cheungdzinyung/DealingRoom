// Importing modules
import { Action, Dispatch } from "redux";
import axios from "axios";

import { API_SERVER } from "../../store";

// Import UI elements
import { AppToaster } from "src/components/ui/mobile/toast";
import { Intent } from "@blueprintjs/core";

import {
    IMenuCategoryWithoutFlux,
    // IStockManageModalState,
    ILoginPackage,
    IOrderListStaff,
} from "../../../modules";

// Type creation
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const CHANGE_PAGE = "CHANGE_PAGE";
export type CHANGE_PAGE = typeof CHANGE_PAGE;
export interface IChangePageAction extends Action {
    type: CHANGE_PAGE;
    currentPage: string;
}

export const REDIRECT_PAGE = "REDIRECT_PAGE";
export type REDIRECT_PAGE = typeof REDIRECT_PAGE;
export interface IRedirectPageAction extends Action {
    type: REDIRECT_PAGE;
    redirectTarget: string;
    history: any;
}

export const RESET_TARGET_PAGE = "RESET_TARGET_PAGE";
export type RESET_TARGET_PAGE = typeof RESET_TARGET_PAGE;
export interface IRestTargetPageAction extends Action {
    type: RESET_TARGET_PAGE;
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const LOCAL_LOGIN_SUCCESS = "LOCAL_LOGIN_SUCCESS";
export type LOCAL_LOGIN_SUCCESS = typeof LOCAL_LOGIN_SUCCESS;
export interface ILocalLoginSuccessAction extends Action {
    type: LOCAL_LOGIN_SUCCESS;
    userInfoPackage: any;
}

export const LOCAL_LOGIN_FAIL = "LOCAL_LOGIN_FAIL";
export type LOCAL_LOGIN_FAIL = typeof LOCAL_LOGIN_FAIL;
export interface ILocalLoginFailAction extends Action {
    type: LOCAL_LOGIN_FAIL;
    errMsg: string;
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const GET_USER_PROFILE_BY_USER_TOKEN_SUCCESS =
    "GET_USER_PROFILE_BY_USER_TOKEN_SUCCESS";
export type GET_USER_PROFILE_BY_USER_TOKEN_SUCCESS = typeof GET_USER_PROFILE_BY_USER_TOKEN_SUCCESS;
export interface IGetUserProfileByUserTokenSuccessAction extends Action {
    type: GET_USER_PROFILE_BY_USER_TOKEN_SUCCESS;
    userProfile: any;
}

export const GET_USER_PROFILE_BY_USER_TOKEN_FAIL =
    "GET_USER_PROFILE_BY_USER_TOKEN_FAIL";
export type GET_USER_PROFILE_BY_USER_TOKEN_FAIL = typeof GET_USER_PROFILE_BY_USER_TOKEN_FAIL;
export interface IGetUserProfileByUserTokenFailAction extends Action {
    type: GET_USER_PROFILE_BY_USER_TOKEN_FAIL;
    errMsg: string;
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const GET_ENTIRE_MENU_SUCCESS = "GET_ENTIRE_MENU_SUCCESS";
export type GET_ENTIRE_MENU_SUCCESS = typeof GET_ENTIRE_MENU_SUCCESS;
export interface IGetEntireMenuSuccessAction extends Action {
    type: GET_ENTIRE_MENU_SUCCESS,
    entireMenu: IMenuCategoryWithoutFlux[],
}

export const GET_ENTIRE_MENU_FAIL = "GET_ENTIRE_MENU_FAIL";
export type GET_ENTIRE_MENU_FAIL = typeof GET_ENTIRE_MENU_FAIL;
export interface IGetEntireMenuFailAction extends Action {
    type: GET_ENTIRE_MENU_FAIL,
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const GET_ALL_ORDERS_SUCCESS = "GET_ALL_ORDERS_SUCCESS";
export type GET_ALL_ORDERS_SUCCESS = typeof GET_ALL_ORDERS_SUCCESS;
export interface IGetAllOrdersSuccessAction extends Action {
    type: GET_ALL_ORDERS_SUCCESS,
    allOrders: any,
}

export const GET_ALL_ORDERS_FAIL = "GET_ALL_ORDERS_FAIL";
export type GET_ALL_ORDERS_FAIL = typeof GET_ALL_ORDERS_FAIL;
export interface IGetAllOrdersFailAction extends Action {
    type: GET_ALL_ORDERS_FAIL,
    errMsg: any,
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const SOCKET_CONNECT_SUCCESS = "SOCKET_CONNECT_SUCCESS";
export type SOCKET_CONNECT_SUCCESS = typeof SOCKET_CONNECT_SUCCESS;
export interface ISocketConnectSuccess extends Action {
    type: SOCKET_CONNECT_SUCCESS,
    socketID: any,
}

export const SOCKET_UPDATE_ORDER_LIST = "SOCKET_UPDATE_ORDER_LIST";
export type SOCKET_UPDATE_ORDER_LIST = typeof SOCKET_UPDATE_ORDER_LIST;
export interface ISocketUpdateOrderList extends Action {
    type: SOCKET_UPDATE_ORDER_LIST,
    allOrders: any,
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
// Combined types
export type StaffInitActions =
    IChangePageAction |
    IRedirectPageAction |
    IRestTargetPageAction |
    ILocalLoginSuccessAction |
    ILocalLoginFailAction |
    IGetUserProfileByUserTokenSuccessAction |
    IGetUserProfileByUserTokenFailAction |
    IGetEntireMenuSuccessAction |
    IGetEntireMenuFailAction |
    IGetAllOrdersSuccessAction |
    IGetAllOrdersFailAction |
    ISocketConnectSuccess |
    ISocketUpdateOrderList;

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function changePage(currentPage: string): IChangePageAction {
    return {
        type: CHANGE_PAGE,
        currentPage
    };
}

export function redirectPage(
    redirectTarget: string,
    history: any
): IRedirectPageAction {
    return {
        type: REDIRECT_PAGE,
        redirectTarget,
        history
    };
}

export function resetTargetPage(): IRestTargetPageAction {
    return {
        type: RESET_TARGET_PAGE
    };
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function localLoginSuccess(
    userInfoPackage: any
): ILocalLoginSuccessAction {
    return {
        type: LOCAL_LOGIN_SUCCESS,
        userInfoPackage
    };
}

export function localLoginFail(errMsg: string): ILocalLoginFailAction {
    return {
        type: LOCAL_LOGIN_FAIL,
        errMsg
    };
}

export function localLogin(username: string, password: string) {
    return (
        dispatch: Dispatch<ILocalLoginSuccessAction | ILocalLoginFailAction>
    ) => {
        const loginPackage: ILoginPackage = {
            username,
            password
        };

        axios
            .post(`${API_SERVER}/api/auth/login`, loginPackage)
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(localLoginSuccess(res.data));
                } else {
                    dispatch(localLoginFail(res.status));
                    throw new Error("Login failed, please try again.");
                }
            })
            .catch((err: any) => {
                // alert(err.response.data || err);
                dispatch(localLoginFail(err.response.data || err));
                AppToaster.show({
                    message: "Error, try again\n" + err.response.data || err,
                    intent: Intent.WARNING,
                    icon: "cross",
                    timeout: 2000
                });
            });
    };
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function getUserProfileByUserTokenSuccess(
    userProfile: any
): IGetUserProfileByUserTokenSuccessAction {
    return {
        type: GET_USER_PROFILE_BY_USER_TOKEN_SUCCESS,
        userProfile
    };
}

export function getUserProfileByUserTokenFail(
    errMsg: string
): IGetUserProfileByUserTokenFailAction {
    return {
        type: GET_USER_PROFILE_BY_USER_TOKEN_FAIL,
        errMsg
    };
}

export function getUserProfileByUserToken() {
    const config = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("dealingRoomToken")
        }
    };
    return (
        dispatch: Dispatch<
            | IGetUserProfileByUserTokenSuccessAction
            | IGetUserProfileByUserTokenFailAction
            >
    ) => {
        axios
            .get(`${API_SERVER}/api/users`, config)
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(getUserProfileByUserTokenSuccess(res.data[0]));
                    // auto redir to order list page ===> moved to init page
                    // dispatch(changePage(OrderList));
                } else {
                    alert("status: " + res.status);
                    dispatch(getUserProfileByUserTokenFail(""));
                }
            })
            .catch((err: any) => {
                alert(err);
                dispatch(getUserProfileByUserTokenFail(""));
            });
    };
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function getEntireMenuSuccess(entireMenu: IMenuCategoryWithoutFlux[]): IGetEntireMenuSuccessAction {
    return {
        type: GET_ENTIRE_MENU_SUCCESS,
        entireMenu,
    }
}

export function getEntireMenuFail(): IGetEntireMenuFailAction {
    return {
        type: GET_ENTIRE_MENU_FAIL,
    }
}

export function getEntireMenu() {
    return (dispatch: Dispatch<IGetEntireMenuSuccessAction | IGetEntireMenuFailAction>) => {
        // axios.get("${process.env.REACT_APP_API_DEV}/api/items")
        axios.get(`${API_SERVER}/api/items`)
            .then((res: any) => {
                if (res.status === 200) {
                    // alert(Object.keys(res.data));
                    dispatch(getEntireMenuSuccess(res.data));
                } else {
                    alert("error not 200");
                    dispatch(getEntireMenuFail());
                }
            })
            .catch((err: any) => {
                alert(err);
                dispatch(getEntireMenuFail());
            });
    }
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */

export function getAllOrdersSuccess(allOrders: IOrderListStaff): IGetAllOrdersSuccessAction {
    return {
        type: GET_ALL_ORDERS_SUCCESS,
        allOrders,
    }
}

export function getAllOrdersFail(errMsg: any): IGetAllOrdersFailAction {
    return {
        type: GET_ALL_ORDERS_FAIL,
        errMsg,
    }
}

export function getAllOrders() {
    return (dispatch: Dispatch<IGetAllOrdersSuccessAction | IGetAllOrdersFailAction>) => {
        // axios.get("${process.env.REACT_APP_API_DEV}/api/items")
        const config = { headers: { Authorization: "Bearer " + localStorage.getItem("dealingRoomToken") } }
        axios.get(`${API_SERVER}/api/orders`, config)
            .then((res: any) => {
                if (res.status === 201) {
                    // alert(Object.keys(res.data));
                    dispatch(getAllOrdersSuccess(res.data));
                } else {
                    // alert("error, status code not match: " + res.status);
                    dispatch(getAllOrdersFail(res.status));
                    AppToaster.show({
                        message: "Error, try again\nstatu code does not match: " + res.status,
                        intent: Intent.WARNING,
                        icon: "cross",
                        timeout: 2000
                    });
                }
            })
            .catch((err: any) => {
                // alert(err);
                dispatch(getAllOrdersFail(err));
                AppToaster.show({
                    message: "Error, try again\n" + err,
                    intent: Intent.WARNING,
                    icon: "cross",
                    timeout: 2000
                });
            });
    }
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function socketConnect(socketID: any): ISocketConnectSuccess {
    return {
        type: SOCKET_CONNECT_SUCCESS,
        socketID,
    }
}

export function socketUpdateItemPrice(allOrders: IOrderListStaff): ISocketUpdateOrderList {
    return {
        type: SOCKET_UPDATE_ORDER_LIST,
        allOrders,
    }
}