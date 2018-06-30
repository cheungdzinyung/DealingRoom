import { combineReducers } from 'redux';
import { staffInitReducer, IStaffInitState } from "./reducers_staffInit";
import { managerReducer, IManagerState } from "./reducers_manager";
import { bartenderReducer, IBartenderState } from "./reducers_bartender";
import { waiterReducer, IWaiterState } from "./reducers_waiter";
import { displayReducer, IDisplayState } from "./reducers_display";

export interface IStaffState {
    staffInit: IStaffInitState,
    manager: IManagerState,
    bartender: IBartenderState,
    waiter: IWaiterState,
    display: IDisplayState,
}

export const staffReducer = combineReducers<IStaffState>({
    staffInit: staffInitReducer,
    manager: managerReducer,
    bartender: bartenderReducer,
    waiter: waiterReducer,
    display: displayReducer,
});