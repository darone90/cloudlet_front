export interface Login {
    login: boolean;
    token: string | null;
    user: string | null;
}

export interface User {
    email: string;
    login: string;
    password: string;
    confirm: string;
}

export interface UserChange {
    type: string;
    change: string;
    confirm: string;
    password: string;
}