import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from '../features/login-slice';

export const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>