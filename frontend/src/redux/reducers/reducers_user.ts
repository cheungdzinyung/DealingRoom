import {
    UserActions,
    CHANGE_PAGE,
    REDIRECT_PAGE,
    RESET_TARGET_PAGE,
    LOCAL_LOGIN_SUCCESS,
    LOCAL_LOGIN_FAIL,
    GET_USER_PROFILE_BY_USER_TOKEN_SUCCESS,
    GET_USER_PROFILE_BY_USER_TOKEN_FAIL,
} from "../actions/actions_user";

import { IUserProfile } from "../../modules";

export interface IUserState {
    // role: string,
    isAuth: boolean,
    currentPage: string,
    redirectTarget: string,
    // settings: string,
    userProfile: IUserProfile,
    userProfileReady: boolean,
}

const initialState = {
    // role: "customer",
    isAuth: false,
    currentPage: "profile",
    redirectTarget: "none",     // for redir
    // settings: "nth yet",
    userProfile: {
        users_id: 0,
        username: "string",
        password: "string",
        displayName: "string",
        userPhoto: "string",
        role: "string",
    },
    userProfileReady: false,
}

// declare global {
//     // for FB login?
//     interface Window {
//         FB: {
//             logout: (callback: () => void) => void;
//         };
//     }
// }

export const userReducer = (state: IUserState = initialState, action: UserActions): IUserState => {
    switch (action.type) {
        case CHANGE_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case REDIRECT_PAGE: {
            // action.history.push(action.redirectTarget);
            action.history.push(`${action.redirectTarget}`);
            return { ...state, redirectTarget: action.redirectTarget }
        }
        case RESET_TARGET_PAGE: {
            return { ...state, redirectTarget: "none" }
        }
        case LOCAL_LOGIN_SUCCESS: {
            localStorage.setItem("dealingRoomToken", action.userInfoPackage.token);
            return { ...state, isAuth: true };
        }
        case LOCAL_LOGIN_FAIL: {
            return state;
        }
        case GET_USER_PROFILE_BY_USER_TOKEN_SUCCESS: {
            return { ...state, userProfile: action.userProfile, userProfileReady: true };
        }
        case GET_USER_PROFILE_BY_USER_TOKEN_FAIL: {
            return state;
        }
        default: {
            return state
        }
    }
}