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
    files: fileEntity[];
}

const initialState: Initial = {
    files: []
}

export const filesSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        loadFiles: (state, action: LoadFiles) => {
            state.files = action.payload;
        },

        addFile: (state, action: Addfile) => {
            state.files = [...state.files, action.payload];
        },

        deleteFile: (state, action: DeleteFile) => {
            const newState = state.files.filter(file => file.id !== action.payload);
            state.files = [...newState];
        }
    }
})

export const { loadFiles, addFile, deleteFile } = filesSlice.actions;