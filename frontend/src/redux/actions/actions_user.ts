import { Action, Dispatch } from "redux";
import axios from "axios";

import { API_SERVER } from "../../redux/store";

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const CHANGE_PAGE = "CHANGE_PAGE";
export type CHANGE_PAGE = typeof CHANGE_PAGE;
export interface IChangePageAction extends Action {
    type: CHANGE_PAGE,
    currentPage: string,
}

export const REDIRECT_PAGE = "REDIRECT_PAGE";
export type REDIRECT_PAGE = typeof REDIRECT_PAGE;
export interface IRedirectPageAction extends Action {
    type: REDIRECT_PAGE,
    redirectTarget: string,
    history: any,
}

export const RESET_TARGET_PAGE = "RESET_TARGET_PAGE";
export type RESET_TARGET_PAGE = typeof RESET_TARGET_PAGE;
export interface IRestTargetPageAction extends Action {
    type: RESET_TARGET_PAGE,
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const LOCAL_LOGIN_SUCCESS = "LOCAL_LOGIN_SUCCESS";
export type LOCAL_LOGIN_SUCCESS = typeof LOCAL_LOGIN_SUCCESS;
export interface ILocalLoginSuccessAction extends Action {
    type: LOCAL_LOGIN_SUCCESS,
    userInfoPackage: any,
}

export const LOCAL_LOGIN_FAIL = "LOCAL_LOGIN_FAIL";
export type LOCAL_LOGIN_FAIL = typeof LOCAL_LOGIN_FAIL;
export interface ILocalLoginFailAction extends Action {
    type: LOCAL_LOGIN_FAIL,
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const GET_USER_PROFILE_BY_USER_TOKEN_SUCCESS = "GET_USER_PROFILE_BY_USER_TOKEN_SUCCESS";
export type GET_USER_PROFILE_BY_USER_TOKEN_SUCCESS = typeof GET_USER_PROFILE_BY_USER_TOKEN_SUCCESS;
export interface IGetUserProfileByUserTokenSuccessAction extends Action {
    type: GET_USER_PROFILE_BY_USER_TOKEN_SUCCESS,
    userProfile: any,
}

export const GET_USER_PROFILE_BY_USER_TOKEN_FAIL = "GET_USER_PROFILE_BY_USER_TOKEN_FAIL";
export type GET_USER_PROFILE_BY_USER_TOKEN_FAIL = typeof GET_USER_PROFILE_BY_USER_TOKEN_FAIL;
export interface IGetUserProfileByUserTokenFailAction extends Action {
    type: GET_USER_PROFILE_BY_USER_TOKEN_FAIL,
    // result: any,
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export type UserActions =
    IChangePageAction |
    IRedirectPageAction |
    IRestTargetPageAction |
    ILocalLoginSuccessAction |
    ILocalLoginFailAction |
    IGetUserProfileByUserTokenSuccessAction |
    IGetUserProfileByUserTokenFailAction;

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function changePage(currentPage: string): IChangePageAction {
    return {
        type: CHANGE_PAGE,
        currentPage,
    }
}

export function redirectPage(redirectTarget: string, history: any): IRedirectPageAction {
    return {
        type: REDIRECT_PAGE,
        redirectTarget,
        history,
    }
}

export function resetTargetPage(): IRestTargetPageAction {
    return {
        type: RESET_TARGET_PAGE,
    }
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function localLoginSuccess(userInfoPackage: any): ILocalLoginSuccessAction {
    return {
        type: LOCAL_LOGIN_SUCCESS,
        userInfoPackage,
    }
}

export function localLoginFail(): ILocalLoginFailAction {
    return {
        type: LOCAL_LOGIN_FAIL,
    }
}

export function localLogin(username: string, password: string) {
    return (dispatch: Dispatch<ILocalLoginSuccessAction | ILocalLoginFailAction>) => {
        const loginPackage = {
            username,
            password,
            role: "customer",
            displayName: "admin"
        };
        //    vvv right now using sign up since login route is not ready
        // axios.post(`${process.env.REACT_APP_API_DEV}/api/auth/login`, loginPackage)
        axios.post(`${API_SERVER}/api/auth/login`, loginPackage)
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(localLoginSuccess(res.data));
                } else {
                    alert("status: " + res.status);
                    dispatch(localLoginFail());
                }
            })
            .catch((err: any) => {
                alert(err);
                dispatch(localLoginFail());
            });
    }
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function getUserProfileByUserTokenSuccess(userProfile: any): IGetUserProfileByUserTokenSuccessAction {
    return {
        type: GET_USER_PROFILE_BY_USER_TOKEN_SUCCESS,
        userProfile,
    }
}

export function getUserProfileByUserTokenFail(): IGetUserProfileByUserTokenFailAction {
    return {
        type: GET_USER_PROFILE_BY_USER_TOKEN_FAIL,
    }
}

export function getUserProfileByUserToken() {
    const config = { headers: { Authorization: "Bearer " + localStorage.getItem("dealingRoomToken") } }
    return (dispatch: Dispatch<IGetUserProfileByUserTokenSuccessAction | IGetUserProfileByUserTokenFailAction>) => {
        // axios.get(`${process.env.REACT_APP_API_DEV}/api/users/${userID}`, config)
        axios.get(`${API_SERVER}/api/users`, config)
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(getUserProfileByUserTokenSuccess(res.data[0]));
                    // auto redir to order list page ===> moved to init page
                    // dispatch(changePage(OrderList));
                } else {
                    alert("status: " + res.status);
                    dispatch(getUserProfileByUserTokenFail());
                }
            })
            .catch((err: any) => {
                alert(err);
                dispatch(getUserProfileByUserTokenFail())
            });
    }
}
