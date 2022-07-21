import { configureStore } from '@reduxjs/toolkit';
import { userAuth } from './UserAuthReducer';
import { sidetabReducer } from './SideTabReducer';
import { alertReducer } from './AlertReducer';
import { modalReducer } from './ModalReducer';
import { loginCheckReducer } from './LoginCheckReducer';
import siteReducer from './SiteReducer';
import hostReducer from './HostReducer';
import idGeneratorReducer from './IdGeneratorReducer';

export const store = configureStore({
  reducer: {
    userAuth,
    loginCheckReducer,
    modalReducer,
    sidetabReducer,
    alertReducer,
    site: siteReducer,
    host: hostReducer,
    idGenerator: idGeneratorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
