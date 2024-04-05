import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice'
import { persistReducer, persistStore } from 'redux-persist';

const rootReducers = combineReducers({ user: userReducer })

import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducers)



export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddlewaer) => getDefaultMiddlewaer({
        serializableCheck: false
    })
});


export const persistor = persistStore(store)