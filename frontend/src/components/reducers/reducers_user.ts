import {
    UserActions,
    CHANGE_PAGE,
    REDIRECT_PAGE,
    RESET_TARGET_PAGE,
} from "../actions/actions_user";

// interface IUser {
//     thisItemID: string,
//     uniqueID: string,
//     itemName: string,
//     ice: string,
//     sweetness: string,
//     garnish: string,
//     purchasePrice: number,
// }

export interface IUserState {
    role: string,
    isAuth: boolean,
    currentPage: string,
    redirectTarget: string,
    settings: string,
}

const initialState = {
    role: "customer",
    isAuth: true,
    currentPage: "profile",
    redirectTarget: "none",     // for redir
    settings: "nth yet",
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
        default: {
            return state
        }
    }
}