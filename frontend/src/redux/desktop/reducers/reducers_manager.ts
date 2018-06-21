import {
    ManagerActions,
    CREATE_ITEM_SUCCESS,
	CREATE_ITEM_FAIL,
	CHANGE_ITEM_STATUS_SUCCESS,
    CHANGE_ITEM_STATUS_FAIL, 
} from "../actions/actions_manager";

import { IPureMenuItem } from "../../../modules";

export interface IManagerState {
    newItemArray: IPureMenuItem[],
}

const initialState: IManagerState = {
    newItemArray: [],
}

export const managerReducer = (state: IManagerState = initialState, action: ManagerActions): IManagerState => {
    switch(action.type) {
        case CREATE_ITEM_SUCCESS: {
            return { ...state, newItemArray: action.newItemArray };
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