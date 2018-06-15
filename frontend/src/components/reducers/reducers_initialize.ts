import {
    InitializeActions,
    GET_ENTIRE_MENU_SUCCESS,
    GET_ENTIRE_MENU_FAIL,
    GET_USER_PROFILE_BY_USERID_SUCCESS,
    GET_USER_PROFILE_BY_USERID_FAIL,
    GET_ORDERS_BY_USERID_SUCCESS,
    GET_ORDERS_BY_USERID_FAIL,
} from "../actions/actions_initialize";

export interface IInitializeState {
    entireMenu: string[],
    categories: string[],
    readyMenu: boolean,
    ordersList: any,
    readyOrderList: boolean,
    userProfile: any,
    readyUserProfile: boolean,
}

const initialState: IInitializeState = {
    entireMenu: [],
    categories: [],
    readyMenu: false,
    ordersList: [],
    readyOrderList: false,
    userProfile: [],
    readyUserProfile: false,
}

export const initializeReducer = (state: IInitializeState = initialState, action: InitializeActions) => {
    switch (action.type) {
        case GET_ENTIRE_MENU_SUCCESS: {
            const categories = action.entireMenu.map((category: any) => (category.categoryName));
            return { ...state, entireMenu: action.entireMenu, categories, readyMenu: true };
        }
        case GET_ENTIRE_MENU_FAIL: {
            return state;
        }
        case GET_USER_PROFILE_BY_USERID_SUCCESS: {
            return { ...state, userProfile: action.userProfile, readyUserProfile: true };
        }
        case GET_USER_PROFILE_BY_USERID_FAIL: {
            return state;
        }
        case GET_ORDERS_BY_USERID_SUCCESS: {
            const unpaidOrders = action.allOrdersByOneUser.orders.filter((e: any) => (e.isPaid === false)).length;
            return { ...state, ordersList: action.allOrdersByOneUser, unpaidOrders, readyOrderList: true };
        }
        case GET_ORDERS_BY_USERID_FAIL: {
            return state;
        }
        default: {
            return state;
        }
    }
}