import { Dispatch, SetStateAction } from "react";
import { Note, shortNote } from "../../../../types/notes.type";


export const addNoteValidation = (color: Dispatch<SetStateAction<string>>, info: Dispatch<SetStateAction<string>>, noteData: Note): boolean => {
    if (noteData.title === '' || noteData.description === '') {
        info('Nie podano wymaganych informacji (tytuł, opis)');
        color('red');
        return false;
    }

    if (noteData.title.length > 50) {
        info('Tytuł jest za długi (max 50 znaków)');
        color('red');
        return false;
    }

    if (noteData.description.length > 5000) {
        info('Za długi opis (max 5000 znaków)');
        color('red');
        return false;
    }

    return true
}

export const createShortNote = (noteData: Note, id: string): shortNote => {
    const note = {
        id,
        title: noteData.title,
        createdAt: noteData.create,
        validTo: noteData.endDate,
        eventStart: noteData.startDate
    }
    return note
}