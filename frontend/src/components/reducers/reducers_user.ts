import {
    UserActions,
    CHANGE_PAGE,
    REDIRECT_PAGE,
    RESET_TARGET_PAGE,
    GET_USER_PROFILE_BY_USERID_SUCCESS,
    GET_USER_PROFILE_BY_USERID_FAIL,
} from "../actions/actions_user";

export interface IUserState {
    // role: string,
    // isAuth: boolean,
    currentPage: string,
    redirectTarget: string,
    // settings: string,
    userProfile: any,
    userProfileReady: boolean,
}

const initialState = {
    // role: "customer",
    // isAuth: false,
    currentPage: "profile",
    redirectTarget: "none",     // for redir
    // settings: "nth yet",
    userProfile: {},
    userProfileReady: false,
}

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