import { CANCEL_SUBSCRIPTION_FAIL, CANCEL_SUBSCRIPTION_REQUEST, CANCEL_SUBSCRIPTION_SUCCESS, GET_BY_ID_SUBSCRIPTION_FAIL, GET_BY_ID_SUBSCRIPTION_REQUEST, GET_BY_ID_SUBSCRIPTION_SUCCESS, INSERT_INTO_SUBSCRIPTION_FAIL, INSERT_INTO_SUBSCRIPTION_REQUEST, INSERT_INTO_SUBSCRIPTION_SUCCESS } from "../constants/subscriptionConstant";

export const insertSubscriptionReducer = (state = [], action) => {
    switch (action.type) {
      case INSERT_INTO_SUBSCRIPTION_REQUEST:
        return { loading: true };
      case INSERT_INTO_SUBSCRIPTION_SUCCESS:
        return { loading: false, packages: action.payload };
      case INSERT_INTO_SUBSCRIPTION_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const getSubscriptionByIDReducer = (state = [], action) => {
    switch (action.type) {
      case GET_BY_ID_SUBSCRIPTION_REQUEST:
        return { loading: true };
      case GET_BY_ID_SUBSCRIPTION_SUCCESS:
        return { loading: false, infos: action.payload };
      case GET_BY_ID_SUBSCRIPTION_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const cancelSubscriptionReducer = (state = [], action) => {
    switch (action.type) {
      case CANCEL_SUBSCRIPTION_REQUEST:
        return { loading: true };
      case CANCEL_SUBSCRIPTION_SUCCESS:
        return { loading: false, infos: action.payload };
      case CANCEL_SUBSCRIPTION_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  


