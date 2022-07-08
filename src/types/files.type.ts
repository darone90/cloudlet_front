export interface fileEntity {
    id: string;
    name: string;
    type: string;
    size: string;
}

export interface downloadFileList {
    files: fileEntity[];
    fotos: fileEntity[];
}

export interface freeSpace {
    fileSpace: number;
    fotoSpace: number;
}