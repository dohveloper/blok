import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userAuth } from './UserAuthReducer';
import { sidetabReducer } from './SideTabReducer';
import { alertReducer } from './AlertReducer';
import { modalReducer } from './ModalReducer';
import { loginCheckReducer } from './LoginCheckReducer';
import siteReducer from './SiteReducer';
import hostReducer from './HostReducer';

import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginCheckReducer'],
};

export const rootReducer = combineReducers({
  userAuth,
  loginCheckReducer,
  modalReducer,
  sidetabReducer,
  alertReducer,
  site: siteReducer,
  host: hostReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
