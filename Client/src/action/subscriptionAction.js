import { BackendAPI } from "../api/server";
import Axios from 'axios';
import { CANCEL_SUBSCRIPTION_FAIL, CANCEL_SUBSCRIPTION_REQUEST, CANCEL_SUBSCRIPTION_SUCCESS, GET_BY_ID_SUBSCRIPTION_FAIL, GET_BY_ID_SUBSCRIPTION_REQUEST, GET_BY_ID_SUBSCRIPTION_SUCCESS, INSERT_INTO_SUBSCRIPTION_FAIL, INSERT_INTO_SUBSCRIPTION_REQUEST, INSERT_INTO_SUBSCRIPTION_SUCCESS } from "../constants/subscriptionConstant";
import { paymentInfoByEmail } from "./paymentAction";

export const insertIntoSubscriptionCollection = (portalID,packageID) => async (dispatch) => {
    dispatch({ type: INSERT_INTO_SUBSCRIPTION_REQUEST });
    try {
      const { data } = await Axios.post(`${BackendAPI}/subscribe/user`,{portalID,packageID});
      dispatch({ type: INSERT_INTO_SUBSCRIPTION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: INSERT_INTO_SUBSCRIPTION_FAIL ,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  //ACTION FOR GETTING SUBSCRIPTION BY ID
  export const subscriptionInfoByID = (portalID) => async (dispatch) => {
    dispatch({ type: GET_BY_ID_SUBSCRIPTION_REQUEST, payload: { portalID } });
    try {
      console.log("subscriptionInfoByID------------" + portalID);
  
      // Include portalID in the query string
      const { data } = await Axios.get(`${BackendAPI}/subscribe/getSubscription`, {
        params: { portalID }
      });
  
      dispatch({ type: GET_BY_ID_SUBSCRIPTION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_BY_ID_SUBSCRIPTION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  

    //ACTION FOR GETTING SUBSCRIPTION BY ID
    export const cancelSubscription = (portalID) => async (dispatch) => {
      dispatch({ type: CANCEL_SUBSCRIPTION_REQUEST, payload: { portalID } });
      try {
        // Include portalID in the query string
        const { data } = await Axios.get(`${BackendAPI}/charge/cancel/${portalID}`);
        dispatch(paymentInfoByEmail(portalID));
        dispatch({ type: CANCEL_SUBSCRIPTION_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: CANCEL_SUBSCRIPTION_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
    