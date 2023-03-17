import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducerAuth from './reducer-auth';
import reducerGeneral from './reducer-general';
import reducerRequest from './reducer-request';

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  auth: reducerAuth,
  general: reducerGeneral,
  request: reducerRequest,
})

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware,
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)