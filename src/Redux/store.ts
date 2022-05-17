import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { persistReducer, 
  PURGE, REGISTER, REHYDRATE, FLUSH, PAUSE, PERSIST,
} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { api } from './api';
import rootReducer from './reducers';

// Using redux-persist to save state to sessionStorage
const persistConfig = {
  key: 'root', 
  storage: storageSession,
  whitelist: ['auth', 'stockInfo'], // auth and stockInfo will be persisted
};

export const setupStore: any = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: 
      (getDefaultMiddleware) => getDefaultMiddleware({ 
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
    preloadedState: preloadedState,
  });
};

export const store = setupStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;