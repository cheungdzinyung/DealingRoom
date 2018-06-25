import { Action } from "redux";
// import { Action, Dispatch } from "redux";
// import axios from "axios";

// import { API_SERVER } from "../../../redux/store";
// import { ISignUpPackage, ILoginPackage } from "../../../modules";

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const SET_PAYMENT_TARGET_ID = "SET_PAYMENT_TARGET_ID";
export type SET_PAYMENT_TARGET_ID = typeof SET_PAYMENT_TARGET_ID;
export interface ISetPaymentTargetIdAction extends Action {
    type: SET_PAYMENT_TARGET_ID,
    paymentTargetId: number,
    totalAmount: number,
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export type PaymentActions =
    ISetPaymentTargetIdAction;



/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function setPaymentTargetId(paymentTargetId: number, totalAmount: number): ISetPaymentTargetIdAction {
    return {
        type: SET_PAYMENT_TARGET_ID,
        paymentTargetId,
        totalAmount,
    }
}