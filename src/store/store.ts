import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice';
import adminReducer from './adminSlice';

export const userStore = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
    },
});

export type RootState = ReturnType<typeof userStore.getState>;
export type AppDispatch = typeof userStore.dispatch;