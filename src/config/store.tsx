import { configureStore } from '@reduxjs/toolkit';
import persistedReducer from '../features';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { createLogger } from 'redux-logger';
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';

export const createStore = () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] = [];
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  middlewares.push(logger);

  const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(...middlewares),
  });

  return { store };
};
