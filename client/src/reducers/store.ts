<<<<<<< client/src/reducers/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { userAuth } from "./UserAuthReducer";
import { sidetabReducer } from "./SideTabReducer";
import { alertReducer } from "./AlertReducer";
import { modalReducer } from "./ModalReducer";
import { loginCheckReducer } from "./LoginCheckReducer";
import siteReducer from './SiteReducer';

export const store = configureStore({
  reducer: {
    userAuth,
    loginCheckReducer,
    modalReducer,
    sidetabReducer,
    alertReducer,
    site: siteReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
