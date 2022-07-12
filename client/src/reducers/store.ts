import { configureStore } from "@reduxjs/toolkit";
import { userAuth } from "./UserAuthReducer";
import { modalReducer } from "./ModalReducer";

export const store = configureStore({ reducer: { userAuth, modalReducer } });

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
