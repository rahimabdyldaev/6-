import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import userReducer from "./slice/UserSlices";
import userReducer from "./slices/UserSlices";

const rootReducer = combineReducers({
    users: userReducer,

});

const store = configureStore({
    reducer: rootReducer
});

export default store;