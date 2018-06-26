import { combineReducers } from 'redux';
import { managerReducer, IManagerState } from "./reducers_manager";
import { bartenderReducer, IBartenderState } from "./reducers_bartender";
import { waiterReducer, IWaiterState } from "./reducers_waiter";
import { displayReducer, IDisplayState } from "./reducers_display";

export interface IStaffState {
    manager: IManagerState,
    bartender: IBartenderState,
    waiter: IWaiterState,
    display: IDisplayState,
}

export const staffReducer = combineReducers<IStaffState>({
    manager: managerReducer,
    bartender: bartenderReducer,
    waiter: waiterReducer,
    display: displayReducer,
});