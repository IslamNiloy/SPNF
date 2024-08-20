import { BackendAPI } from "../api/server";
import { UPDATE_USER_INFOBYID_FAIL, UPDATE_USER_INFOBYID_REQUEST, UPDATE_USER_INFOBYID_SUCCESS, USER_INFOBYID_FAIL, USER_INFOBYID_REQUEST, USER_INFOBYID_SUCCESS } from "../constants/userConstants";
import Axios from 'axios';

export const userInfoByID = (portalID) => async (dispatch) => {
    dispatch({ type: USER_INFOBYID_REQUEST, payload: { portalID } });
    try {
      const { data } = await Axios.get(`${BackendAPI}/user/profile/${portalID}`);
  
      dispatch({ type: USER_INFOBYID_SUCCESS, payload: data });
     
    } catch (error) {
      dispatch({
        type: USER_INFOBYID_FAIL ,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const updateUserInfoByID = (portalID,email,name,companyName, phoneNumber,countryCode) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_INFOBYID_REQUEST, payload: { portalID,email,name,companyName, phoneNumber,countryCode } });
    try {
      const { data } = await Axios.put(`${BackendAPI}/user/update`,{portalID,email,name,companyName, phoneNumber,countryCode});
      dispatch({ type: UPDATE_USER_INFOBYID_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_INFOBYID_FAIL ,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };