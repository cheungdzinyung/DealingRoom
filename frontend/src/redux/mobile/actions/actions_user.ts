import { Action, Dispatch } from "redux";
import axios from "axios";

import { API_SERVER } from "../../../redux/store";
import { ISignUpPackage, ILoginPackage } from "../../../modules";

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
export const LOCAL_SIGNUP_SUCCESS = "LOCAL_SIGNUP_SUCCESS";
export type LOCAL_SIGNUP_SUCCESS = typeof LOCAL_SIGNUP_SUCCESS;
export interface ILocalSignUpSuccessAction extends Action {
    type: LOCAL_SIGNUP_SUCCESS,
    userInfoPackage: any,
}

export const LOCAL_SIGNUP_FAIL = "LOCAL_SIGNUP_FAIL";
export type LOCAL_SIGNUP_FAIL = typeof LOCAL_SIGNUP_FAIL;
export interface ILocalSignUpFailAction extends Action {
    type: LOCAL_SIGNUP_FAIL,
    errMsg: any,
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
    ILocalSignUpSuccessAction |
    ILocalSignUpFailAction |
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
        const loginPackage: ILoginPackage = {
            username,
            password,
        };

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
export function localSignUpSuccess(userInfoPackage: any): ILocalSignUpSuccessAction {
    return {
        type: LOCAL_SIGNUP_SUCCESS,
        userInfoPackage,
    }
}

export function localSignUpFail(errMsg: any): ILocalSignUpFailAction {
    return {
        type: LOCAL_SIGNUP_FAIL,
        errMsg,
    }
}

// REAL
// export function localSignUp(username: string, password: string) {
//     return (dispatch: Dispatch<ILocalSignUpSuccessAction | ILocalSignUpFailAction>) => {
//         const signUpPackage: ISignUpPackage = {
//             username,
//             password,
//             role: "customer",
//             displayName: username,
//         };
        
//         axios.post(`${API_SERVER}/api/auth/signup`, signUpPackage)
//             .then((res: any) => {
//                 if (res.status === 201) {
//                     dispatch(localSignUpSuccess(res.data));
//                 } else {
//                     alert("status: " + res.status);
//                     dispatch(localSignUpFail(res.status));
//                 }
//             })
//             .catch((err: any) => {
//                 alert(err);
//                 dispatch(localSignUpFail(err));
//             });
//     }
// }

// WORK AROUND
export function localSignUp(username: string, password: string) {
    return (dispatch: Dispatch<ILocalSignUpSuccessAction | ILocalSignUpFailAction | ILocalLoginSuccessAction | ILocalLoginFailAction>) => {
        const signUpPackage: ISignUpPackage = {
            username,
            password,
            role: "customer",
            displayName: username,
        };

        const loginPackage = {
            username,
            password
        }
        
        axios.post(`${API_SERVER}/api/auth/signup`, signUpPackage)
            .then((res: any) => {
                if (res.status === 201) {
                    axios.post(`${API_SERVER}/api/auth/login`, loginPackage)
                        .then((resp: any) => {
                            if (resp.status === 200) {
                                dispatch(localLoginSuccess(resp.data));
                            } else {
                                alert("status: " + res.status);
                                dispatch(localLoginFail());
                            }
                        })
                        .catch((err: any) => {
                            alert(err);
                            dispatch(localLoginFail());
                        });
                    // dispatch(localSignUpSuccess(res.data));
                } else {
                    alert("status: " + res.status);
                    dispatch(localSignUpFail(res.status));
                }
            })
            .catch((err: any) => {
                alert(err);
                dispatch(localSignUpFail(err));
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
