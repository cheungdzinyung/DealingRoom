import {
    PaymentActions,
    SET_PAYMENT_TARGET_ID,
} from "../actions/actions_payment";

// import { IUserProfile } from "../../../modules";

export interface IPaymentState {
    paymentTargetId: number,
    totalAmount: number,
}

const initialState = {
    paymentTargetId: 0,
    totalAmount: 0,
}

export const paymentReducer = (state: IPaymentState = initialState, action: PaymentActions): IPaymentState => {
    switch(action.type) {
        case SET_PAYMENT_TARGET_ID: {
            return { ...state, paymentTargetId: action.paymentTargetId, totalAmount: action.totalAmount };
        }
        default: {
            return state;
        }
    }
}