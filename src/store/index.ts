import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from '../features/login-slice';
import { notesSlice } from '../features/notes-slice';
import { filesSlice } from '../features/files-slice';
import { fotoSlice } from '../features/foto-slice';

export const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        notes: notesSlice.reducer,
        files: filesSlice.reducer,
        fotos: fotoSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>