// Importing modules
import { Action, Dispatch } from "redux";
import axios from "axios";

import { API_SERVER } from "../../store";

import { IMenuCategoryWithoutFlux, ICreateMenuItem, IEditMenuItem } from "../../../modules";

// Type creation
export const CREATE_ITEM_SUCCESS = "CREATE_ITEM_SUCCESS";
export type CREATE_ITEM_SUCCESS = typeof CREATE_ITEM_SUCCESS;
export interface ICreateItemSuccessAction extends Action {
	type: CREATE_ITEM_SUCCESS,
	itemStatus: ICreateMenuItem,
	entireMenu: IMenuCategoryWithoutFlux[],
}

export const CREATE_ITEM_FAIL = "CREATE_ITEM_FAIL";
export type CREATE_ITEM_FAIL = typeof CREATE_ITEM_FAIL;
export interface ICreateItemFailAction extends Action {
	type: CREATE_ITEM_FAIL,
	// result: any,
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
// Change item status
export const CHANGE_ITEM_STATUS_SUCCESS = "CHANGE_ITEM_STATUS_SUCCESS";
export type CHANGE_ITEM_STATUS_SUCCESS = typeof CHANGE_ITEM_STATUS_SUCCESS;
export interface IChangeItemStatusSuccessAction extends Action {
	type: CHANGE_ITEM_STATUS_SUCCESS,
	itemStatus: IEditMenuItem,
	entireMenu: IMenuCategoryWithoutFlux[],
}

export const CHANGE_ITEM_STATUS_FAIL = "CHANGE_ITEM_STATUS_FAIL";
export type CHANGE_ITEM_STATUS_FAIL = typeof CHANGE_ITEM_STATUS_FAIL;
export interface IChangeItemStatusFailAction extends Action {
	type: CHANGE_ITEM_STATUS_FAIL,
	// result: any,
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const GET_ENTIRE_MENU_SUCCESS = "GET_ENTIRE_MENU_SUCCESS";
export type GET_ENTIRE_MENU_SUCCESS = typeof GET_ENTIRE_MENU_SUCCESS;
export interface IGetEntireMenuSuccessAction extends Action {
	type: GET_ENTIRE_MENU_SUCCESS,
	entireMenu: IMenuCategoryWithoutFlux[],
}

export const GET_ENTIRE_MENU_FAIL = "GET_ENTIRE_MENU_FAIL";
export type GET_ENTIRE_MENU_FAIL = typeof GET_ENTIRE_MENU_FAIL;
export interface IGetEntireMenuFailAction extends Action {
	type: GET_ENTIRE_MENU_FAIL,
}


/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
// Combined types
export type ManagerActions =
	IGetEntireMenuSuccessAction |
	IGetEntireMenuFailAction |
	ICreateItemSuccessAction |
	ICreateItemFailAction |
	IChangeItemStatusSuccessAction |
	IChangeItemStatusFailAction;

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function getEntireMenuSuccess(entireMenu: IMenuCategoryWithoutFlux[]): IGetEntireMenuSuccessAction {
    return {
        type: GET_ENTIRE_MENU_SUCCESS,
        entireMenu,
    }
}

export function getEntireMenuFail(): IGetEntireMenuFailAction {
    return {
        type: GET_ENTIRE_MENU_FAIL,
    }
}

export function getEntireMenu() {
    return (dispatch: Dispatch<IGetEntireMenuSuccessAction | IGetEntireMenuFailAction>) => {
        // axios.get("${process.env.REACT_APP_API_DEV}/api/items")
        axios.get(`${API_SERVER}/api/items`)
            .then((res: any) => {
                if (res.status === 200) {
                    // alert(Object.keys(res.data));
                    dispatch(getEntireMenuSuccess(res.data));
                } else {
                    alert("error not 200");
                    dispatch(getEntireMenuFail());
                }
            })
            .catch((err: any) => {
                alert(err);
                dispatch(getEntireMenuFail());
            });
    }
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function createItemSuccess(itemStatus: ICreateMenuItem, entireMenu: IMenuCategoryWithoutFlux[]): ICreateItemSuccessAction {
	return {
		type: CREATE_ITEM_SUCCESS,
		itemStatus,
		entireMenu,
	}
}

export function createItemFail(): ICreateItemFailAction {
	return {
		type: CREATE_ITEM_FAIL,
		// result,
	}
}

export function createItem(itemStatus: ICreateMenuItem) {
	const config = { headers: { Authorization: "Bearer " + localStorage.getItem("dealingRoomToken") } }
	return (dispatch: Dispatch<ICreateItemSuccessAction | ICreateItemFailAction>) => {
		axios.post(`${API_SERVER}/api/items/`, itemStatus, config)
			.then((res: any) => {
				if (res.status === 200) {
					dispatch(createItemSuccess(itemStatus, res.data));
				} else {
					alert("create item error, try again");
					dispatch(createItemFail());
				}
			})
			.catch((err: any) => {
				alert(err);
				dispatch(createItemFail());
			})
	}
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function changeItemStatusSuccess(itemStatus: IEditMenuItem, entireMenu: IMenuCategoryWithoutFlux[]): IChangeItemStatusSuccessAction {
	return {
		type: CHANGE_ITEM_STATUS_SUCCESS,
		itemStatus,
		entireMenu,
	}
}

export function changeItemStatusFail(): IChangeItemStatusFailAction {
	return {
		type: CHANGE_ITEM_STATUS_FAIL,
		// result,
	}
}

export function changeItemStatus(itemStatus: IEditMenuItem) {
	const config = { headers: { Authorization: "Bearer " + localStorage.getItem("dealingRoomToken") } }
	return (dispatch: Dispatch<IChangeItemStatusSuccessAction | IChangeItemStatusFailAction>) => {
		axios.put(`${API_SERVER}/api/items/${itemStatus.items_id}`, itemStatus, config)
			.then((res: any) => {
				if (res.status === 200) {
					dispatch(changeItemStatusSuccess(itemStatus, res.data));
				} else {
					alert("update error, try again");
					dispatch(changeItemStatusFail());
				}
			})
			.catch((err: any) => {
				alert(err);
				dispatch(changeItemStatusFail());
			})
	}
}