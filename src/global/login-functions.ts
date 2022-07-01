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
    sessionStorage.setItem('user', userState)
}

export const getSession = (): Login => {
    const tokenState = sessionStorage.getItem('token');
    const loginState = sessionStorage.getItem('loginStatus') === 'true' ? true : false;
    const token = tokenState === undefined ? null : tokenState;
    const user = sessionStorage.getItem('user');

    return {
        login: loginState,
        token,
        user
    }
}

export const connection = async (obj: unknown, path: string, method: string): Promise<Income> => {
    try {
        const income = (await fetch(`http://localhost:${backendConf.port}/${path}`, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })) as unknown as Income;
        return income
    } catch (err) {
        return ({
            status: false,
            info: 'response faild'
        })
    }
}