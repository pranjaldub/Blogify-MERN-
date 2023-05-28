import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  user: userReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

//export default store;
export const persistor = persistStore(store);
