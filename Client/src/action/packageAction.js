import { BackendAPI } from "../api/server";
import Axios from 'axios';
import { ALL_PACKAGE_FAIL, ALL_PACKAGE_REQUEST, ALL_PACKAGE_SUCCESS } from "../constants/packageConstant";

export const allPackages = () => async (dispatch) => {
    dispatch({ type: ALL_PACKAGE_REQUEST });
    try {
      const { data } = await Axios.get(`${BackendAPI}/package/all`);
      dispatch({ type: ALL_PACKAGE_SUCCESS, payload: data });
      localStorage.setItem('lSYs~K@jx}DS1YG>/57Kuj', JSON.stringify(data).toString());
    } catch (error) {
      dispatch({
        type: ALL_PACKAGE_FAIL ,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };