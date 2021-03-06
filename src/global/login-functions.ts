import { Login } from '../types/login.types';
import { backendConf } from '../connection.config'
import { Income } from '../types/connection.type';

export const setSession = (obj: Login): void => {

    const { login, token, user } = obj

    const loginState = login ? 'true' : 'false';
    const tokenState = token ? token : '';
    const userState = user ? user : 'null'
    sessionStorage.setItem('token', tokenState);
    sessionStorage.setItem('loginStatus', loginState);
    sessionStorage.setItem('user', encodeURIComponent(userState))
}

export const getSession = (): Login => {
    const tokenState = sessionStorage.getItem('token');
    const loginState = sessionStorage.getItem('loginStatus') === 'true' ? true : false;
    const token = tokenState === undefined ? null : tokenState;
    const user = decodeURIComponent(sessionStorage.getItem('user') as string);

    return {
        login: loginState,
        token,
        user
    }
}

export const connection = async (obj: unknown, path: string, method: string): Promise<Income> => {
    try {
        const income = (await fetch(`${backendConf.address}/${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Token': String(getSession().token),
                'Name': encodeURIComponent(String(getSession().user))
            },
            body: JSON.stringify(obj)
        })) as any
        const data = (await income.json()) as Income;
        return data
    } catch (err) {
        console.log(err)
        return ({
            status: false,
            info: 'Wystąpił problem z połączeniem... sprawdź czy masz internet :)'
        })
    }
}

export const loginFunction = async (obj: unknown): Promise<Login> => {
    try {
        const income = (await fetch(`${backendConf.address}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })) as any
        const data = (await income.json()) as Login;
        return data
    } catch (err) {
        return ({
            login: false,
            token: null,
            user: null
        })
    }
}

export const getconnection = async (code: string, path: string): Promise<Income> => {
    const income = await fetch(`${backendConf.address}/${path}/${code}`, {
        method: "GET",
        headers: {
            'Token': String(getSession().token),
            'Name': encodeURIComponent(String(getSession().user))
        }
    }) as any;
    const data = await income.json() as Income
    return data
}