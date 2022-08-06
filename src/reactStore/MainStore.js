// import { createStore, applyMiddleware, compose } from "redux";
// import MainReducer from "../reducer/MainReducer";
// import thunk from "redux-thunk";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const MainStore = createStore(
//   MainReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );

// export default MainStore;

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import storageSession from 'redux-persist/lib/storage/session';

import MainReducer from './reducer/MainReducer';
const persistConfig = {
  key: 'User',
  storage: storage,
  whitelist: ['User', 'Geo'], // which reducer want to store
};
const pReducer = persistReducer(persistConfig, MainReducer);
const middleware = applyMiddleware(thunk, logger);
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);
export { persistor, store };
