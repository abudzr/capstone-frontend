import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {reducerAuth} from './reducer-auth'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['me']
}

const reducers = combineReducers({
  auth: reducerAuth,
})

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)