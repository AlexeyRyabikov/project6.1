import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./UserSlice/UserSlice";
import { reducer as ArticlesReducer } from "./ArtclesSlice/ArticlesSlice";
import { reducer as GetOneArticleReducer } from "./FullArticleSlice/FullArticleSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import localStorage from "redux-persist/es/storage";

//import reportWebVitals from "./reportWebVitals";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  userInfo: reducer,
  Articles: ArticlesReducer,
  OneArticle: GetOneArticleReducer,
});
const PersistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: PersistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>,
  //    </React.StrictMode>
);
console.log(localStorage.getItem("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
