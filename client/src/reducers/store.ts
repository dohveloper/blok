import { configureStore } from '@reduxjs/toolkit';
import { userAuth } from './UserAuthReducer';
import { sidetabReducer } from './SideTabReducer';
import { alertReducer } from './AlertReducer';
import { modalReducer } from './ModalReducer';
import { loginCheckReducer } from './LoginCheckReducer';
import siteReducer from './SiteReducer';
import hostReducer from './HostReducer';

export const store = configureStore({
  reducer: {
    userAuth,
    loginCheckReducer,
    modalReducer,
    sidetabReducer,
    alertReducer,
    site: siteReducer,
    host: hostReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
