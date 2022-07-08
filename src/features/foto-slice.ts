import { createSlice } from "@reduxjs/toolkit";
import { fileEntity } from "../types/files.type";

interface DeleteFile {
    payload: string
}

interface LoadFiles {
    payload: fileEntity[]
}

interface Addfile {
    payload: fileEntity
}

interface Initial {
    fotos: fileEntity[];
}

const initialState: Initial = {
    fotos: []
}

export const fotoSlice = createSlice({
    name: 'foto',
    initialState,
    reducers: {
        loadFoto: (state, action: LoadFiles) => {
            state.fotos = action.payload;
        },

        addFoto: (state, action: Addfile) => {
            state.fotos = [...state.fotos, action.payload];
        },

        deletFoto: (state, action: DeleteFile) => {
            const newState = state.fotos.filter(foto => foto.id !== action.payload);
            state.fotos = [...newState];
        }
    }
})

export const { loadFoto, addFoto, deletFoto } = fotoSlice.actions;