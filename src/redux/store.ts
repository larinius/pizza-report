import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import type { AppState } from "../redux/features/app/appSlice";
import appReducer from "../redux/features/app/appSlice";
import reportReducer from "../redux/features/report/reportSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["app", "report"],
};

const persistedAppReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  reducer: {
    app: persistedAppReducer,
    report: reportReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState> & AppState;

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
