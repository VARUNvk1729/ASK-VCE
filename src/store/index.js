import { applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
