import { Action, Dispatch } from "redux";
import axios from "axios";

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const GET_ENTIRE_MENU_SUCCESS = "GET_ENTIRE_MENU_SUCCESS";
export type GET_ENTIRE_MENU_SUCCESS = typeof GET_ENTIRE_MENU_SUCCESS;
export interface IGetEntireMenuSuccessAction extends Action {
    type: GET_ENTIRE_MENU_SUCCESS,
    entireMenu: any,
}

export const GET_ENTIRE_MENU_FAIL = "GET_ENTIRE_MENU_FAIL";
export type GET_ENTIRE_MENU_FAIL = typeof GET_ENTIRE_MENU_FAIL;
export interface IGetEntireMenuFailAction extends Action {
    type: GET_ENTIRE_MENU_FAIL,
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const GET_USER_PROFILE_BY_USERID_SUCCESS = "GET_USER_PROFILE_BY_USERID_SUCCESS";
export type GET_USER_PROFILE_BY_USERID_SUCCESS = typeof GET_USER_PROFILE_BY_USERID_SUCCESS;
export interface IGetUserProfileByUseridSuccessAction extends Action {
    type: GET_USER_PROFILE_BY_USERID_SUCCESS,
    userProfile: any,
}

export const GET_USER_PROFILE_BY_USERID_FAIL = "GET_USER_PROFILE_BY_USERID_FAIL";
export type GET_USER_PROFILE_BY_USERID_FAIL = typeof GET_USER_PROFILE_BY_USERID_FAIL;
export interface IGetUserProfileByUseridFailAction extends Action {
    type: GET_USER_PROFILE_BY_USERID_FAIL,
    // result: any,
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const GET_ORDERS_BY_USERID_SUCCESS = "GET_ORDERS_BY_USERID_SUCCESS";
export type GET_ORDERS_BY_USERID_SUCCESS = typeof GET_ORDERS_BY_USERID_SUCCESS;
export interface IGetOrdersByUseridSuccessAction extends Action {
    type: GET_ORDERS_BY_USERID_SUCCESS,
    allOrdersByOneUser: any,
}

export const GET_ORDERS_BY_USERID_FAIL = "GET_ORDERS_BY_USERID_FAIL";
export type GET_ORDERS_BY_USERID_FAIL = typeof GET_ORDERS_BY_USERID_FAIL;
export interface IGetOrdersByUseridFailAction extends Action {
    type: GET_ORDERS_BY_USERID_FAIL,
    // result: any,
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */

export type InitializeActions =
    IGetEntireMenuSuccessAction |
    IGetEntireMenuFailAction |
    IGetUserProfileByUseridSuccessAction |
    IGetUserProfileByUseridFailAction |
    IGetOrdersByUseridSuccessAction |
    IGetOrdersByUseridFailAction;

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function getEntireMenuSuccess(entireMenu: any): IGetEntireMenuSuccessAction {
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
        axios.get("http://localhost:8080/api/items")
            .then((res: any) => {
                if (res.status === 200) {
                    // alert(Object.keys(res.data));
                    dispatch(getEntireMenuSuccess(res.data));
                } else {
                    alert("error not 200");
                    dispatch(getEntireMenuFail());
                }
            })
            .catch((err:any) => {
                alert(err);
                dispatch(getEntireMenuFail());
            });
    }
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function getUserProfileByUseridSuccess(userProfile: any): IGetUserProfileByUseridSuccessAction {
    return {
        type: GET_USER_PROFILE_BY_USERID_SUCCESS,
        userProfile,
    }
}

export function getUserProfileByUseridFail(): IGetUserProfileByUseridFailAction {
    return {
        type: GET_USER_PROFILE_BY_USERID_FAIL,
    }
}

export function getUserProfileByUserid(userID: number) {
    return (dispatch: Dispatch<IGetUserProfileByUseridSuccessAction | IGetUserProfileByUseridFailAction>) => {
        axios.get(`http://localhost:8080/api/users/${userID}`)
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(getUserProfileByUseridSuccess(res.data[0]));
                    // auto redir to order list page
                    // dispatch(changePage(OrderList));
                } else {
                    alert("status: " + res.status);
                    dispatch(getUserProfileByUseridFail());
                }
            })
            .catch((err: any) => {
                alert(err);
                dispatch(getUserProfileByUseridFail())
            });
    }
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function getOrdersByUseridSuccess(allOrdersByOneUser: any): IGetOrdersByUseridSuccessAction {
    return {
        type: GET_ORDERS_BY_USERID_SUCCESS,
        allOrdersByOneUser,
    }
}

export function getOrdersByUseridFail(): IGetOrdersByUseridFailAction {
    return {
        type: GET_ORDERS_BY_USERID_FAIL,
    }
}

export function getOrdersByUserid(userID: number) {
    return (dispatch: Dispatch<IGetOrdersByUseridSuccessAction | IGetOrdersByUseridFailAction>) => {
        axios.get(`http://localhost:8080/api/orders/user/${userID}`)
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(getOrdersByUseridSuccess(res.data[0]));
                    // auto redir to order list page
                    // dispatch(changePage(OrderList));
                } else {
                    alert("status: " + res.status);
                    dispatch(getOrdersByUseridFail());
                }
            })
            .catch((err: any) => {
                alert(err);
                dispatch(getOrdersByUseridFail())
            });
    }
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */