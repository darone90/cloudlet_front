import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from '../features/login-slice';
import { notesSlice } from '../features/notes-slice';

export const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        notes: notesSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>