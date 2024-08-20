import { GET_BY_EMAIL_PAYMENT_FAIL, GET_BY_EMAIL_PAYMENT_REQUEST, GET_BY_EMAIL_PAYMENT_SUCCESS } from "../constants/paymentConstant";

export const paymentInfoByEmailReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_BY_EMAIL_PAYMENT_REQUEST:
        return { loading_: true };
      case GET_BY_EMAIL_PAYMENT_SUCCESS:
        return { loading: false, paymentInfo: action.payload };
      case GET_BY_EMAIL_PAYMENT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };