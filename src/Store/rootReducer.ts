import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice";
// import cartReducer from "../slices/CartSlice";
// import productReducer from "../slices/ProductSlice";

const reducerList = {
  user: authReducer,
//   cart: cartReducer,
//   product: productReducer,
};

const rootReducer = combineReducers(reducerList);

export default rootReducer;
