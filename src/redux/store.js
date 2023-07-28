import { combineReducers, applyMiddleware, legacy_createStore } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import thunk from "redux-thunk";
import userReducer from "./reducers";
import { persistReducer, persistStore } from "redux-persist";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["userReducer"],
};
const rootReducer = combineReducers({ userReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const Store = legacy_createStore(persistedReducer, applyMiddleware(thunk));

  const persistedStore = persistStore(Store);
  return { Store, persistedStore };
};
