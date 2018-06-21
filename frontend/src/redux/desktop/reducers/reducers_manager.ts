import {
    ManagerActions,
    GET_ENTIRE_MENU_SUCCESS,
    GET_ENTIRE_MENU_FAIL,
    CREATE_ITEM_SUCCESS,
	CREATE_ITEM_FAIL,
	CHANGE_ITEM_STATUS_SUCCESS,
    CHANGE_ITEM_STATUS_FAIL, 
} from "../actions/actions_manager";

import { IMenuCategoryWithoutFlux } from "../../../modules";

export interface IManagerState {
    entireMenu: IMenuCategoryWithoutFlux[],
    categories: string[],
    menuReady: boolean,
}

const initialState: IManagerState = {
    entireMenu: [],
    categories: [],
    menuReady: false,
}

export const managerReducer = (state: IManagerState = initialState, action: ManagerActions): IManagerState => {
    switch(action.type) {
        case GET_ENTIRE_MENU_SUCCESS: {
            const categories = action.entireMenu.map((category: any) => (category.categoryName));
            return { ...state, entireMenu: action.entireMenu, categories, menuReady: true };
        }
        case GET_ENTIRE_MENU_FAIL: {
            return state;
        }
        case CREATE_ITEM_SUCCESS: {
            const categories = action.entireMenu.map((category: any) => (category.categoryName));
            return { ...state, entireMenu: action.entireMenu, categories };
        }
        case CREATE_ITEM_FAIL: {
            return state;
        }
        case CHANGE_ITEM_STATUS_SUCCESS: {
            return state;
        }
        case CHANGE_ITEM_STATUS_FAIL: {
            return state;
        }
        default: {
            return state;
        }
    }
}