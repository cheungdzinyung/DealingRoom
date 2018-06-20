import { Action, Dispatch } from "redux";
import axios from "axios";

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
export type UserActions =
    IChangePageAction |
    IRedirectPageAction |
    IRestTargetPageAction |
    ILocalLoginSuccessAction |
    ILocalLoginFailAction |
    IGetUserProfileByUseridSuccessAction |
    IGetUserProfileByUseridFailAction;

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
        axios.post(`http://localhost:8080/api/auth/login`, loginPackage)
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
    const config = { headers: {Authorization: "Bearer " + localStorage.getItem("dealingRoomToken")} }
    return (dispatch: Dispatch<IGetUserProfileByUseridSuccessAction | IGetUserProfileByUseridFailAction>) => {
        axios.get(`http://localhost:8080/api/users/${userID}`, config)
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(getUserProfileByUseridSuccess(res.data[0]));
                    // auto redir to order list page ===> moved to init page
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
