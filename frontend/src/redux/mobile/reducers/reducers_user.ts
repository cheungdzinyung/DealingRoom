import {
  UserActions,
  CHANGE_PAGE,
  REDIRECT_PAGE,
  RESET_TARGET_PAGE,
  LOCAL_LOGIN_SUCCESS,
  LOCAL_LOGIN_FAIL,
  LOCAL_SIGNUP_SUCCESS,
  LOCAL_SIGNUP_FAIL,
  FB_LOGIN_SUCCESS,
  FB_LOGIN_FAIL,
  GET_USER_PROFILE_BY_USER_TOKEN_SUCCESS,
  GET_USER_PROFILE_BY_USER_TOKEN_FAIL,
  GET_USER_CONSUMPTIONS_BY_USER_TOKEN_SUCCESS,
  GET_USER_CONSUMPTIONS_BY_USER_TOKEN_FAIL
} from "../actions/actions_user";

import { IUserProfile, IConsumpGraphDataDeceiveAll } from "src/modules";

export interface IUserState {
  // role: string,
  isAuth: boolean;
  currentPage: string;
  redirectTarget: string;
  // settings: string,
  userProfile: IUserProfile;
  userProfileReady: boolean;
  userAPIErr: string;
  userConsumptionComparison: IConsumpGraphDataDeceiveAll;
}

const initialState = {
  // role: "customer",
  isAuth: false, // wrong after F5
  currentPage: "profile",
  redirectTarget: "none", // for redir
  // settings: "nth yet",
  userProfile: {
    users_id: 0,
    username: "string",
    password: "string",
    displayName: "string",
    userPhoto: "string",
    role: "string"
  },
  userProfileReady: false,
  userAPIErr: "none",
  userConsumptionComparison: {
    user: [
      { category: "a", price: "10", max: "15" },
      { category: "b", price: "15", max: "15" },
      { category: "c", price: "12", max: "15" },
      { category: "d", price: "8", max: "15" },
      { category: "e", price: "5", max: "15" },
      { category: "f", price: "14", max: "15" }
    ],
    all: [
      { category: "a", price: "14", max: "15" },
      { category: "b", price: "11", max: "15" },
      { category: "c", price: "6", max: "15" },
      { category: "d", price: "8", max: "15" },
      { category: "e", price: "4", max: "15" },
      { category: "f", price: "12", max: "15" }
    ]
  }
};

export const userReducer = (
  state: IUserState = initialState,
  action: UserActions
): IUserState => {
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
      return { ...state, isAuth: true, userAPIErr: "none" };
    }
    case LOCAL_LOGIN_FAIL: {
      return { ...state, userAPIErr: action.errMsg };
    }
    case LOCAL_SIGNUP_SUCCESS: {
      localStorage.setItem("welcomeOnSignup", "true");
      localStorage.setItem("dealingRoomToken", action.userInfoPackage.password);
      return { ...state, userAPIErr: "none" };
    }
    case LOCAL_SIGNUP_FAIL: {
      return { ...state, userAPIErr: action.errMsg };
    }
    case FB_LOGIN_SUCCESS: {
      localStorage.setItem("dealingRoomToken", action.FBtoken);
      return { ...state, isAuth: true, userAPIErr: "none" };
      // alert(`FB login ok ;) ${action.FBtoken}`)
      // return state;
    }
    case FB_LOGIN_FAIL: {
      return { ...state, userAPIErr: action.errMsg || "FB_LOGIN_FAIL" };
    }
    case GET_USER_PROFILE_BY_USER_TOKEN_SUCCESS: {
      return {
        ...state,
        userProfile: action.userProfile,
        userProfileReady: true,
        userAPIErr: "none"
      };
    }
    case GET_USER_PROFILE_BY_USER_TOKEN_FAIL: {
      return { ...state, userAPIErr: "GET_USER_PROFILE_BY_USER_TOKEN_FAIL" };
    }
    case GET_USER_CONSUMPTIONS_BY_USER_TOKEN_SUCCESS: {
      return {
        ...state,
        userConsumptionComparison: action.userConsumptionComparison
      };
    }

    case GET_USER_CONSUMPTIONS_BY_USER_TOKEN_FAIL: {
      return { ...state, userAPIErr: "GET_USER_PROFILE_BY_USER_TOKEN_FAIL" };
    }

    default: {
      return state;
    }
  }
};
