import {
    ManagerActions,
    GET_ENTIRE_MENU_SUCCESS,
    GET_ENTIRE_MENU_FAIL,
    CREATE_ITEM_SUCCESS,
	CREATE_ITEM_FAIL,
	UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAIL,
    TOGGLE_STOCK_MANAGE_MODAL,
    RESET_SUCCESS_STATUS,
} from "../actions/actions_manager";

import { IMenuCategoryWithoutFlux, IStockManageModalState, IUpdateMenuItem } from "../../../modules";

export interface IManagerState {
    entireMenu: IMenuCategoryWithoutFlux[],
    categories: string[],
    menuReady: boolean,
    stockManageModalState: IStockManageModalState,
    targetItem?: IUpdateMenuItem,
    createItemSuccess: boolean,
    editItemSuccess: boolean,
}

const initialState: IManagerState = {
    entireMenu: [],
    categories: [],
    menuReady: false,
    stockManageModalState: "discard",
    targetItem: {
        items_id: 0,
        itemName: "itemName",
        itemStock: 0,
        categoryName: "categoryName",
        itemDescription: "itemDescription",
        minimumPrice: 0,
        itemPhoto: "any",
        isSpecial: false,
        isActive: true,
    },
    createItemSuccess: false,
    editItemSuccess: false,
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
            return { ...state, entireMenu: action.entireMenu, categories, createItemSuccess: true };
        }
        case CREATE_ITEM_FAIL: {
            return { ...state, createItemSuccess: false};
        }
        case UPDATE_ITEM_SUCCESS: {
            return { ...state, editItemSuccess: true};
        }
        case UPDATE_ITEM_FAIL: {
            return { ...state, editItemSuccess: false};
        }
        case TOGGLE_STOCK_MANAGE_MODAL: {
            return { ...state, stockManageModalState: action.stockManageModalState, targetItem: action.targetItem };
        }
        case RESET_SUCCESS_STATUS: {
            return { ...state, createItemSuccess: false, editItemSuccess: false };
        }
        default: {
            return state;
        }
    }
}