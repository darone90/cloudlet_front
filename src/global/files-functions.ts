import { Income } from "../types/connection.type";
import { backendConf } from "../connection.config";
import { fileEntity, downloadFileList, freeSpace } from "../types/files.type";


export const sendFile = async (path: string, file: FormData): Promise<Income> => {
    const income = await fetch(`http://localhost:${backendConf.port}/${path}`, {
        method: "POST",
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
    const income = await fetch(`http://localhost:${backendConf.port}/${path}`, {
        method: "GET",
    }) as any;

    const data = await income.json() as downloadFileList;

    return data
}

export const getFreeSpace = async (): Promise<freeSpace> => {
    const income = await fetch(`http://localhost:${backendConf.port}/files/free`, {
        method: "GET",
    }) as any;

    const data = await income.json() as freeSpace;
    return data
}

export const deleteFileFromDatabase = async (id: string): Promise<Income> => {
    const income = await fetch(`http://localhost:${backendConf.port}/files/delete/${id}`, {
        method: "DELETE",
    }) as any;

    const data = await income.json() as Income;
    return data
}