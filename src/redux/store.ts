import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSliceReducer from "./slice/auth.slice";

const reducers = combineReducers({
    auth: authSliceReducer
})

const persistConfiguration = {
    key: 'bh-root',
    storage,
    // version: 1,
};

const persistedReducer = persistReducer(persistConfiguration, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch