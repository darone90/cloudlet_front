export interface Note {
    id?: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    delete: boolean;
    email: string;
    create: string;
}

export interface shortNote {
    id: string;
    title: string;
    createdAt: string;
    validTo?: string;
    eventStart?: string;
}