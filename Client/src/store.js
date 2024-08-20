// src/store.js
import { legacy_createStore as createStore } from 'redux';
import {  applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from "@redux-devtools/extension";
import {thunk} from 'redux-thunk';
import { updateUserInfoByIDReducer, userInfoByIDReducer } from './reducers/userReducer';
import { getAllPackageReducer } from './reducers/packageReducer';
import { cancelSubscriptionReducer, getSubscriptionByIDReducer, insertSubscriptionReducer } from './reducers/subscriptionReducer';
import { paymentInfoByEmailReducer } from './reducers/paymentReducer';


const initialState = {
  userInfoByID: {
      userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    },
};


const rootReducer = combineReducers({
  // Add other reducers here
  userInfo: userInfoByIDReducer,
  getAllPackage: getAllPackageReducer,
  insertSubscription: insertSubscriptionReducer,
  getSubscriptionByID: getSubscriptionByIDReducer,
  updateUserInfoByID: updateUserInfoByIDReducer,
  cancelSubscription:cancelSubscriptionReducer,
  paymentInfoByEmail:paymentInfoByEmailReducer
});

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
