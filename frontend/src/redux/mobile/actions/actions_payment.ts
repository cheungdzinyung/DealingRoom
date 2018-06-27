import { Action, Dispatch } from "redux";
import axios from "axios";

import { API_SERVER } from "../../../redux/store";
// import { ISignUpPackage, ILoginPackage } from "../../../modules";\

// Import UI elements
import { AppToaster } from "src/components/ui/mobile/toast";
import { Intent } from "@blueprintjs/core";

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const SET_PAYMENT_TARGET_ID = "SET_PAYMENT_TARGET_ID";
export type SET_PAYMENT_TARGET_ID = typeof SET_PAYMENT_TARGET_ID;
export interface ISetPaymentTargetIdAction extends Action {
    type: SET_PAYMENT_TARGET_ID,
    paymentTargetId: number,
    totalAmount: number,
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const PAY_WITH_STRIPE_SUCCESS = "PAY_WITH_STRIPE_SUCCESS";
export type PAY_WITH_STRIPE_SUCCESS = typeof PAY_WITH_STRIPE_SUCCESS;
export interface IPayWithStripeSuccessAction extends Action {
    type: PAY_WITH_STRIPE_SUCCESS,
    paymentResult: any,
}

export const PAY_WITH_STRIPE_FAIL = "PAY_WITH_STRIPE_FAIL";
export type PAY_WITH_STRIPE_FAIL = typeof PAY_WITH_STRIPE_FAIL;
export interface IPayWithStripeFailAction extends Action {
    type: PAY_WITH_STRIPE_FAIL,
    paymentResult: any,
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const RESET_PAYMENT_RESULT = "RESET_PAYMENT_RESULT";
export type RESET_PAYMENT_RESULT = typeof RESET_PAYMENT_RESULT;
export interface IResetPaymentResultAction extends Action {
    type: RESET_PAYMENT_RESULT,
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export type PaymentActions =
    ISetPaymentTargetIdAction |
    IPayWithStripeSuccessAction |
    IPayWithStripeFailAction |
    IResetPaymentResultAction;


/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function setPaymentTargetId(paymentTargetId: number, totalAmount: number): ISetPaymentTargetIdAction {
    return {
        type: SET_PAYMENT_TARGET_ID,
        paymentTargetId,
        totalAmount,
    }
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function payWithStripeSccess(paymentResult: any): IPayWithStripeSuccessAction {
    return {
        type: PAY_WITH_STRIPE_SUCCESS,
        paymentResult,
    }
}

export function payWithStripeFail(paymentResult: any): IPayWithStripeFailAction {
    return {
        type: PAY_WITH_STRIPE_FAIL,
        paymentResult,
    }
}

export function payWithStripe(orderId: number, stripeToken: string) {
    return (dispatch: Dispatch<IPayWithStripeSuccessAction | IPayWithStripeFailAction>) => {
        const infoPackage = {orderId, stripeToken}
        axios.post(`${API_SERVER}/api/payment/stripe`, infoPackage)
            .then((res: any) => {
                if (res.status === 201) {
                    dispatch(payWithStripeSccess(res.data));
                    AppToaster.show({
                        message: "Payment Successful, Thank You!",
                        intent: Intent.SUCCESS,
                        icon: "tick",
                        timeout: 2000
                    });
                } else {
                    // alert("err, status: " + res.status);
                    dispatch(payWithStripeFail("not 201"));
                    AppToaster.show({
                        message: "Error, try again",
                        intent: Intent.WARNING,
                        icon: "cross",
                        timeout: 2000
                    });
                }
            })
            .catch((err: any) => {
                // alert(err)
                dispatch(payWithStripeFail(err));
                AppToaster.show({
                    message: "Error, try again\n" + err,
                    intent: Intent.WARNING,
                    icon: "cross",
                    timeout: 2000
                });
            });
    }
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function resetPaymentResult(): IResetPaymentResultAction {
    return {
        type: RESET_PAYMENT_RESULT,
    }
}