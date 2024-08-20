import { GET_BY_EMAIL_PAYMENT_FAIL, GET_BY_EMAIL_PAYMENT_REQUEST, GET_BY_EMAIL_PAYMENT_SUCCESS } from "../constants/paymentConstant";
import { BackendAPI } from "../api/server";
import Axios from 'axios';

export const paymentInfoByEmail = (email) => async (dispatch) => {
    dispatch({ type: GET_BY_EMAIL_PAYMENT_REQUEST, payload: { email } });
    try {
      const { data } = await Axios.get(`${BackendAPI}/charge/get/info/${email}`);
  
      dispatch({ type: GET_BY_EMAIL_PAYMENT_SUCCESS, payload: data });
     
    } catch (error) {
      dispatch({
        type: GET_BY_EMAIL_PAYMENT_FAIL ,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };