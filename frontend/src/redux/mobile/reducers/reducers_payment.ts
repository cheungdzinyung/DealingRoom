import {
    PaymentActions,
    SET_PAYMENT_TARGET_ID,
    PAY_WITH_STRIPE_SUCCESS,
    PAY_WITH_STRIPE_FAIL,
    RESET_PAYMENT_RESULT,
} from "../actions/actions_payment";

export interface IPaymentState {
    paymentTargetId: number,
    totalAmount: number,
    paymentResult: {
        order_id: number,
        status: string,         // OrderStatus <= not working dont know y
        isPaid: boolean,
    },
}

const initialState = {
    paymentTargetId: 0,
    totalAmount: 0,
    paymentResult: {
        order_id: 0,
        status: "confirmed",
        isPaid: false,
    },
}

export const paymentReducer = (state: IPaymentState = initialState, action: PaymentActions): IPaymentState => {
    switch(action.type) {
        case SET_PAYMENT_TARGET_ID: {
            return { ...state, paymentTargetId: action.paymentTargetId, totalAmount: action.totalAmount };
        }
        case PAY_WITH_STRIPE_SUCCESS: {
            return { ...state, paymentTargetId: 0, totalAmount: 0, paymentResult: action.paymentResult[0] };
        }
        case PAY_WITH_STRIPE_FAIL: {
            return { ...state, paymentResult: action.paymentResult };
        }
        case RESET_PAYMENT_RESULT: {
            const initial = { order_id: 0, status: "confirmed", isPaid: false };
            return { ...state, paymentResult: initial };
        }
        default: {
            return state;
        }
    }
}