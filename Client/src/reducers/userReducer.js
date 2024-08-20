import { UPDATE_USER_INFOBYID_FAIL, UPDATE_USER_INFOBYID_REQUEST, UPDATE_USER_INFOBYID_SUCCESS, USER_INFOBYID_FAIL, USER_INFOBYID_REQUEST, USER_INFOBYID_SUCCESS } from "../constants/userConstants";

export const userInfoByIDReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_INFOBYID_REQUEST:
        return { loading: true };
      case USER_INFOBYID_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_INFOBYID_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const updateUserInfoByIDReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_USER_INFOBYID_REQUEST:
        return { loading: true };
      case UPDATE_USER_INFOBYID_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case UPDATE_USER_INFOBYID_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
