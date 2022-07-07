import { createSlice } from "@reduxjs/toolkit";
import { shortNote } from "../types/notes.type";

interface ListLoad {
    payload: shortNote[];
}

interface DeleteNote {
    payload: string
}

interface addNote {
    payload: shortNote;
}

interface Intial {
    notes: shortNote[];
}

const initialState: Intial = {
    notes: []
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        loadAll: (state, action: ListLoad) => {
            state.notes = action.payload
        },

        addOne: (state, action: addNote) => {
            state.notes = [...state.notes, action.payload];
        },
        deleteOne: (state, action: DeleteNote) => {
            const newState = state.notes.filter(note => note.id !== action.payload);
            state.notes = [...newState];
        }
    }

});

export const { loadAll, addOne, deleteOne } = notesSlice.actions;