import { shortNote } from "../types/notes.type";
import { backendConf } from "../connection.config";
import { Income } from "../types/connection.type";
import { Note } from "../types/notes.type";
import { getSession } from "./login-functions";

export const listConnection = async (path: string): Promise<shortNote[]> => {
    const income = await fetch(`${backendConf.address}/${path}`, {
        method: "GET",
        headers: {
            'Token': String(getSession().token),
            'Name': encodeURIComponent(String(getSession().user))
        },
    }) as any;
    const data = await income.json() as shortNote[];

    return data
}

export const getOneNote = async (path: string, id: string): Promise<Note> => {
    const income = await fetch(`${backendConf.address}/${path}/${id}`, {
        method: "GET",
        headers: {
            'Token': String(getSession().token),
            'Name': encodeURIComponent(String(getSession().user))
        },
    }) as any;
    const data = await income.json() as Note;
    return data
}

export const listDeleter = async (path: string, id: string): Promise<Income> => {
    const income = await fetch(`${backendConf.address}/${path}/${id}`, {
        method: "DELETE",
        headers: {
            'Token': String(getSession().token),
            'Name': encodeURIComponent(String(getSession().user))
        },
    }) as any;
    const data = await income.json() as Income;
    return data
}