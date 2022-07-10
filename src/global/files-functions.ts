import { Income } from "../types/connection.type";
import { backendConf } from "../connection.config";
import { fileEntity, downloadFileList, freeSpace } from "../types/files.type";
import { getSession } from "./login-functions";


export const sendFile = async (path: string, file: FormData): Promise<Income> => {
    const income = await fetch(`${backendConf.address}/${path}`, {
        method: "POST",
        headers: {
            'Token': String(getSession().token),
            'Name': encodeURIComponent(String(getSession().user))
        },
        body: file,
    }) as any;

    const data = await income.json() as Income;
    return data
}

export const formatChange = (file: File, id: string): fileEntity => {
    const data = {
        id,
        name: file.name,
        type: file.type,
        size: String(file.size)
    }
    return data
}

export const getFilesList = async (path: string): Promise<downloadFileList> => {
    const income = await fetch(`${backendConf.address}/${path}`, {
        method: "GET",
        headers: {
            'Token': String(getSession().token),
            'Name': encodeURIComponent(String(getSession().user))
        },
    }) as any;

    const data = await income.json() as downloadFileList;

    return data
}

export const getFreeSpace = async (): Promise<freeSpace> => {
    const income = await fetch(`${backendConf.address}/files/free`, {
        method: "GET",
        headers: {
            'Token': String(getSession().token),
            'Name': encodeURIComponent(String(getSession().user))
        },
    }) as any;

    const data = await income.json() as freeSpace;
    return data
}

export const deleteFileFromDatabase = async (id: string): Promise<Income> => {
    const income = await fetch(`${backendConf.address}/files/delete/${id}`, {
        method: "DELETE",
        headers: {
            'Token': String(getSession().token),
            'Name': encodeURIComponent(String(getSession().user))
        },
    }) as any;

    const data = await income.json() as Income;
    return data
}