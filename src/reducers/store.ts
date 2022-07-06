import { configureStore } from '@reduxjs/toolkit';
import { userAuth } from './UserAuthReducer';

export const store = configureStore({ reducer: { userAuth } });

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
