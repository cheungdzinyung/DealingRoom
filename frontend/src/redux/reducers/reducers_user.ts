import {
    UserActions,
    CHANGE_PAGE,
    REDIRECT_PAGE,
    RESET_TARGET_PAGE,
    LOCAL_LOGIN_SUCCESS,
    LOCAL_LOGIN_FAIL,
    GET_USER_PROFILE_BY_USERID_SUCCESS,
    GET_USER_PROFILE_BY_USERID_FAIL,
} from "../actions/actions_user";

export interface IUserState {
    // role: string,
    // isAuth: boolean,
    currentPage: string,
    redirectTarget: string,
    // settings: string,
    user_id: number,
    userProfile: any,
    userProfileReady: boolean,
}

const initialState = {
    // role: "customer",
    // isAuth: false,
    currentPage: "profile",
    redirectTarget: "none",     // for redir
    // settings: "nth yet",
    user_id: 0,
    userProfile: {},
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
            return { ...state, currentPage: action.currentPage}
        }
        case REDIRECT_PAGE: {
            // action.history.push(action.redirectTarget);
            action.history.push("/order");
            return { ...state, redirectTarget: action.redirectTarget}
        }
        case RESET_TARGET_PAGE: {
            return { ...state, redirectTarget: "none"}
        }
        case LOCAL_LOGIN_SUCCESS: {
            localStorage.setItem("dealingRoomToken", action.userInfoPackage.token);
            return { ...state, user_id: action.userInfoPackage.user_id };
        }
        case LOCAL_LOGIN_FAIL: {
            return state;
        }
        case GET_USER_PROFILE_BY_USERID_SUCCESS: {
            return { ...state, userProfile: action.userProfile, userProfileReady: true };
        }
        case GET_USER_PROFILE_BY_USERID_FAIL: {
            return state;
        }
        default: {
            return state
        }
    }
}