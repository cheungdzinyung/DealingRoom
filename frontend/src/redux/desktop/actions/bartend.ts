// Importing modules
import { Action } from 'redux';

// Type creation
const COMPLETE_ORDER = "COMPLETE_ORDER";
type COMPLETE_ORDER = typeof COMPLETE_ORDER;

export interface ICompleteOrder extends Action {
    type: COMPLETE_ORDER
    orders_id: number
}
