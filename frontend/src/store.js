import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userDetailsReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import { eventListReducer } from "./reducers/eventReducer";
import {
  statusListReducer,
  statusDetailsReducer,
  statusCreateReducer,
  statusUpdateReducer,
  statusDeleteReducer,
  statusCommentCreateReducer,
  statusListAccordingToOwnersReducer,
} from "./reducers/statusReducer";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? localStorage.getItem("userInfo")
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateReducer,
  eventList: eventListReducer,
  statusList: statusListReducer,
  statusDetails: statusDetailsReducer,
  statusCreate: statusCreateReducer,
  statusUpdate: statusUpdateReducer,
  statusDelete: statusDeleteReducer,
  statusCommentCreate: statusCommentCreateReducer,
  statusListAccordingToOwners: statusListAccordingToOwnersReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;

/*
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {userLoginReducer} from './reducers/userReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
*/
