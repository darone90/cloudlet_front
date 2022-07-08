import { shortNote } from "../types/notes.type";
import { backendConf } from "../connection.config";
import { Income } from "../types/connection.type";
import { Note } from "../types/notes.type";

export const listConnection = async (path: string): Promise<shortNote[]> => {
    const income = await fetch(`http://localhost:${backendConf.port}/${path}`, {
        method: "GET"
    }) as any;
    const data = await income.json() as shortNote[];

    return data
}

export const getOneNote = async (path: string, id: string): Promise<Note> => {
    const income = await fetch(`http://localhost:${backendConf.port}/${path}/${id}`, {
        method: "GET"
    }) as any;
    const data = await income.json() as Note;
    return data
}

export const listDeleter = async (path: string, id: string): Promise<Income> => {
    const income = await fetch(`http://localhost:${backendConf.port}/${path}/${id}`, {
        method: "DELETE"
    }) as any;
    const data = await income.json() as Income;
    return data
}